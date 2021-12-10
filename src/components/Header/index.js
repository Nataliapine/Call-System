import { useContext } from 'react';
import './header.scss';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/profile-empty.png';


import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";


export default function Header() {
    const {signOut} = useContext(AuthContext)

    const {user} = useContext(AuthContext);
    return(
        <div className="sidebar"> 
            <div>
                <img src={user.avataurl === null ? avatar : user.avataurl} alt="profile" />
            </div>

            <Link to="/dashboard">
                <FiHome />
                Chamadas
            </Link>
            <Link to="/customers">
                <FiUser />
                Users
            </Link>
            <Link to="/profile">
                <FiSettings />
                Settings
            </Link>
            <button onClick={ () => signOut()}>LogOut <FiLogOut /></button>
            
        </div>
    )
}