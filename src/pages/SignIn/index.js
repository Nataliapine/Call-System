import { useState } from'react';
import { Link } from'react-router-dom';
import './signin.scss';
import ImgDesign from'../../assets/rafiki.png';


export default function SignIn() {
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        alert('CLICOU!')
    }

    return(
        <div className="container">
            <div className="card">
                <div className="design">
                    <img src={ImgDesign} alt="design" />
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="name@mail.com" value={email} onChange={ (e) => setEmail(e.target.value)} />
                        <input className="password" type="password" placeholder="******" value={password} onChange={ (e) => setPassword(e.target.value) } />
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/register">Create an Account</Link>
                </div>
            </div>
            
        </div>
    );
};