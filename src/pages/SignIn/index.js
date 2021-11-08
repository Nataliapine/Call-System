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
        <div>
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

        <div className="container">
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    );
};