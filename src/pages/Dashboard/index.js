import { useState, useEffect } from 'react';
import "./dashboard.scss";

import Header from '../../components/Header';
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';


const listRef = firebase.firestore().collection('calls').orderBy('created', 'desc');

export default function Dashboard() {

    const [ calls, setCalls ] = useState([]); 
    const [ loading, setLoading ] = useState(true);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ isEmpty, setIsEmpty ] = useState(false);
    const [ lastDocs, setLastDocs] = useState();

    const [ showPostModal, setShowPostModal ] = useState(false);
    const [ detail, setDetail ] = useState();

    useEffect(() => {
        async function loadCalls() {
            await listRef.limit(5)
            .get()
            .then((snapshot)=> {
                updateState(snapshot)
            })
            .catch((err) => {
                console.log('Something went wrong', err);
                setLoadingMore(false)
    
            })
            setLoading(false);
        }

        loadCalls();
        return () => {

        }
    }, []);

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc)=> {
                lista.push({
                    id:doc.id,
                    subject:doc.data().subject,
                    client: doc.data().client,
                    clientId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    comment: doc.data().comment

                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setCalls(calls => [...calls, ...lista]);
            setLastDocs(lastDoc);

        }else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
        
    }

    function toglePostModal(item) {
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    if( loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="My Calls"></Title>
                    <div className='container dashboard'>
                        <span>Looking for Calls</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Dashboard"></Title>
            
                {calls.length === 0 ? (
                    <div className='container'>
                        <div className='card'>
                            <p>no calls registered...</p>
                            <Link className="new" to="/new" >
                                Add New Call
                                <FiPlus size={20} color='#4B4848' />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='container dashboard'>
                        <Link className="new-table" to="/new" >
                            Add New Call
                            <FiPlus size={20} color='#4B4848' />
                        </Link>
                        <div className='card'> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Request</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {calls.map((item, index)=> {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Customer">{item.client}</td>
                                            <td data-label="Request">{item.subject}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{backgroundColor: item.status === 'open' ? '#5cb85c' : '#999', padding:'6px'}}>{item.status}</span>
                                            </td>
                                            <td data-label="Date">{item.createdFormated}</td>
                                            <td data-label="#">
                                                <button className="action" onClick={() => toglePostModal(item)} >
                                                    <FiSearch  color="#40B0DF"/>
                                                </button>
                                                <Link className="action" to={`/new/${item.id}`} >
                                                    <FiEdit2  color="#40B0DF"/>
                                                </Link>
                                            </td>
                                            
                                        </tr> 
                                    )
                                })}
                                    
                                </tbody>
                            </table>
                            { loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Searching data...</h3>}
                            { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Load More</button>}
                        </div>
                    </div>
                )}
            </div>

            {showPostModal && (
                <Modal 
                    conteudo={detail}  
                    close={toglePostModal} 

                />
            )}
            
        </div>
    )
}