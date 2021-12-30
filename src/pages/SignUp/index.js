import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import './signup.scss';
import ImgDesign from'../../assets/rafiki.png';

export default function SignUp() {
    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        if(name !== '' && email !== '' && password !== ''){
            signUp(email, password,name)
        }
    }

    return(
        <div className="container-signUp">
            <div className="card">
            <div> 
                <h1>Create Account</h1>
                <div className="design">
                        <img src={ImgDesign} alt="design" />
                    </div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <input className="name" type="text" placeholder="Natália Santos" value={name} onChange={(e) => setName(e.target.value)}  />
                            <input type="text" placeholder="name@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="password" type="password" placeholder="******"  value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">{loadingAuth ? 'Loading...' : 'Register'}</button>
                        </form>
                        <Link to="/">Already have an account</Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
};