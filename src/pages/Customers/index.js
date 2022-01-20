import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

import "./customers.scss" ;

export default function Customers() {
    const [ companyName, setCompanyName ] = useState('');
    const [ cnpj, setCnpj ] = useState('');
    const [ address, setAddress ] = useState('');

    function handleAdd(e) {
        e.preventDefault();
        
        if(companyName !== '' && cnpj !== '' && address !== '') {
            firebase.firestore().collection('customers')
            .add({
                companyName: companyName,
                cnpj: cnpj,
                address: address
            })
            .then(() => {
                setCompanyName('');
                setCnpj('');
                setAddress('');
                toast.info('Saved with Sucess!');
            })
            .catch((error) => {
                console.log('error')
                toast.error('Sorry, Something went wrong!');
            }) 
        }else {
            toast.error('fill in all fields')
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Customers"></Title>
            </div>
            <div className="container">
                <div className='card'>
                    <form className='form-profile' onSubmit={handleAdd} >
                        <label>Company Name</label>
                        <input type="text" placeholder='Company Name' value={companyName} onChange={ (e) => setCompanyName(e.target.value)} />
                        <label>CNPJ</label>
                        <input type="text" placeholder='CNPJ' value={cnpj} onChange={ (e) => setCnpj(e.target.value)} />
                        <label>Address</label>
                        <input type="text" placeholder='your address' value={address} onChange={ (e) => setAddress(e.target.value)} />
                        <button type="submit">Register</button>
                    </form>
                </div>   
            </div>
            <Footer />
        </div>
    )
} 