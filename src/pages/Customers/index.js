import { useState } from 'react/cjs/react.development';
import Header from '../../components/Header';
import Title from '../../components/Title';

import "./customers.scss" ;

export default function Customers() {
    const [ companyName, setCompanyName ] = useState('');
    const [ cnpj, setCnpj ] = useState('');
    const [ address, setAddress ] = useState('');

    function handleAdd(e) {
        e.preventDefault();
        alert('teste')
    }

    return (
        <div>
            <Header />
            <div className="content">
                    <Title name="My Profile"></Title>
            </div>
            <h1>Customers</h1>
            <div className="container">
                <div className='card'>
                    <form className='form-profile' onSubmit={handleAdd} >
                        <label>Company Name</label>
                        <input type="text" value={companyName} onChange={ (e) => setCompanyName(e.target.value)} />
                        <label>CNPJ</label>
                        <input type="text" value={cnpj} onchange={ (e) => setCnpj(e.target.value)} />
                        <label>Address</label>
                        <input type="text" value={address} onchange={ (e) => setAddress(e.target.value)} />
                        <button type="submit">Register</button>
                    </form>
                </div>   
            </div>
        </div>
    )
} 