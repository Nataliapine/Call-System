import { useState } from'react';
import { Link } from'react-router-dom';
import './signup.scss';
import ImgDesign from'../../assets/rafiki.png';


export default function SignIn() {
    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    return(
        <div className="container">
            <div className="card">
                <div className="design">
                    <img src={ImgDesign} alt="design" />
                </div>
                <div className="form">
                    <form>
                        <input className="name" type="text" placeholder="Natália Santos" value={name} onChange={(e) => setName(e.target.value)}  />
                        <input type="text" placeholder="name@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="password" type="password" placeholder="******"  value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Create an Account</button>
                    </form>
                    <Link to="/">Already have an account</Link>
                </div>
            </div>
            
        </div>
    );
};