import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import '../SignUp/signup.scss';
import ImgDesign from '../../assets/rafiki.png';
import { AuthContext } from '../../contexts/auth';


export default function SignIn() {
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const {signIn, loadingAuth} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn(email, password)
        }
    }

    return(
        <div className="container-signUp">
            <div className="card">
                <div>
                    <h1>login</h1>
                    <div className="design">
                        <img src={ImgDesign} alt="design" />
                    </div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="E-mail" value={email} onChange={ (e) => setEmail(e.target.value)} />
                            <input className="password" type="password" placeholder="******" value={password} onChange={ (e) => setPassword(e.target.value) } />
                            <button type="submit">{loadingAuth ? 'Loading...' : 'Login'}</button>
                        </form>
                        <Link to="/register">Create an Account</Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
};