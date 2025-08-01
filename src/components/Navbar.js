import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.js';
import './Navbar.css';
import { Link } from 'react-router-dom';
import SearchPopup from './SearchPopup.js';

const Navbar = () => {
    const { auth, logout } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };



    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">ChampWeb</Link>
                <input type="text" placeholder="Search classrooms" className="search-input" />
                <svg 
                    onClick={togglePopup}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                {showPopup && <SearchPopup onClose={togglePopup}/>}
            </div>
            <div className="navbar-right">
                {
                    auth.user ?
                        (
                            <>
                                <Link to="/profile" className="profile-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </Link>
                                <button className="logout-btn" onClick={logout}>Logout</button>
                            </>
                        )
                        :
                        (
                            <Link to="/login" className="login-btn">Login</Link>
                        )
                }
            </div>
        </nav>
    )
}

export default Navbar