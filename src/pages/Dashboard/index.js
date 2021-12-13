import { useState, useEffect } from 'react';
import "./dashboard.scss";

import Header from '../../components/Header';
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';


const listRef = firebase.firestore().collection('calls').orderBy('created', 'desc');

export default function Dashboard() {

    const [ calls, setCalls ] = useState([1]); 
    const [ loading, setLoading ] = useState(true);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ isEmpty, setIsEmpty ] = useState(false);
    const [ lastDocs, setLastDocs] = useState();

    useEffect(() => {
        loadCalls();
        return () => {

        }
    }, []);
    async function loadCalls() {
        await listRef.limit(5)
        .get()
        .then((snapshot)=> {})
        .catch((err) => {
            console.log('Something went wrong', err);
            setLoadingMore(false)

        })
        setLoading(false);
    }

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
                    createdFormated: format(doc.data().created.toDate(), 'dd/mm/yyyy'),
                    status: doc.data().status,
                    comment: doc.data().comment

                })
            })
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setCalls(calls => [...calls, ...lista]);
            setLastDocs(lastDoc);

        }
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Dashboard"></Title>
            </div>
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
                <div className='container'>
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
                            <tr>
                                <td data-label="Customer">Maria Santos</td>
                                <td data-label="Request">Suport</td>
                                <td data-label="Status">
                                    <span className="badge" style={{backgroundColor:'#5cb85c', padding:'6px'}}>Open</span>
                                </td>
                                <td data-label="Date">12/08/21</td>
                                <td data-label="#">
                                    <button className="action" >
                                        <FiSearch  color="#40B0DF"/>
                                    </button>
                                    <button className="action" >
                                        <FiEdit2  color="#40B0DF"/>
                                    </button>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            )}
            
        </div>
    )
}