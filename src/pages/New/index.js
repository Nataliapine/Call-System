import { useContext, useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';
import './new.scss';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { AuthContext } from '../../contexts/auth';

export default function New() {

    const { id } = useParams();
    const  history  = useHistory();

    const [ loadCustomers, setLoadCustomers ] = useState(true);
    const [ customers, setCustomers ] = useState([]);
    const [ customerSelected, setCustomerSelected ] = useState(0);

    const [ subject, setSubject ] = useState('Suport');
    const [ status, setStatus ] = useState('open');
    const [ comment, setComment ] = useState('');
    const [ idCustomer, setIdCustomer ] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id:doc.id,
                        companyName: doc.data().companyName
                    })
                })
                if(lista.length === 0 ) {
                    console.log('Company Not Found');
                    setCustomers([ { id:'1', companyName: 'Freelancer'} ]);
                    setLoadCustomers(false);
                    return;
                }
                setCustomers(lista);
                setLoadCustomers(false);

                if(id) {
                    loadId(lista);
                }
            })
            .catch((error)=> {
                console.log('Something went wrong!', error);
                setLoadCustomers(false);
                setCustomers([ { id:'1', companyName:''} ]);
            })
        }
        loadCustomers();
    },[id]);

    async function loadId(lista) {
        await firebase.firestore().collection('calls').doc(id)
        .get()
        .then((snapshot) => {
            setSubject(snapshot.data().subject);
            setStatus(snapshot.data().status);
            setComment(snapshot.data().comment)

            let index = lista.findIndex(item => item.id === snapshot.data().clientId);
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch((err) => {
            console.log('Id Error!', err);
            setIdCustomer(false);
        })
    }

    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('calls')
            .doc(id)
            .update({
                client: customers[customerSelected].companyName,
                clientId: customers[customerSelected].id,
                subject: subject,
                status: status,
                comment: comment,
                userId: user.uid
            })
            .then(() =>{
                toast.success('successfully edited!');
                setCustomerSelected(0);
                setComment('');
                history.push('/dashboard');
            })
            .catch((err) => {
                toast.error('error when registering, try later');
                console.log(err);
            })

            return;
        }
        
        await firebase.firestore().collection('calls')
        .add({
            created:new Date(),
            client: customers[customerSelected].companyName,
            clientId: customers[customerSelected].id,
            subject: subject,
            status: status,
            comment: comment,
            userId: user.uid
        })
        .then(()=> {
            toast.success('created with sucess!');
            setComment('');
            setCustomerSelected(0);
        })
        .catch((err)=> {
            toast.error('error to register, please try again later.')
            console.log('err')
        })
    }

    
    function handleChangeSelect(e) {
        setSubject(e.target.value);
    }

    function handleOption(e) {
        setStatus(e.target.value);
    }

    function handleChangeCustomers(e) {
        // console.log('INDEX DO CLIENTE SELECIONADO!', e.target.value);
        // console.log('selected customers', customers[e.target.value]);
        setCustomerSelected(e.target.value);
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="New Call"></Title>
            </div>
            <div className='container'>
                <div className='card'>
                    <form className='new-form' onSubmit={handleRegister} >
                        <label>Customers</label>
                        {loadCustomers ? (
                            <input type="text" value="loading client" disabled={true} />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index)=> {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.companyName}
                                        </option>
                                    )
                                })}
                            
                            </select>
                        )}
                        
                        <label>Subject</label>
                        <select>
                            <option value="Suport" >Suport</option>
                            <option value="technical visit" >technical visit</option>
                            <option value="Finance" >Finance</option>
                        </select>
                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name='radio' value="open" onChange={handleOption} checked={ status === 'open'} />
                            <span>Open</span>
                            <input type="radio" name='radio' value="In Progress" onChange={handleOption} checked={ status === 'In Progress'} />
                            <span>In Progress</span>
                        
                            <input type="radio" name='radio' value="Finished" onChange={handleOption} checked={ status === 'Finished'}  />
                            <span>Finished</span>
                        </div>
                        <textarea type='text' placeholder='Describe your problem...' onChange={ (e) => setComment(e.target.value)} />
                        <button className="save-btn" type='submit' >Register</button>
                        
                    </form>
                </div>
            </div>
            <Footer />
            
        </div>
    )
}