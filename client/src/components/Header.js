import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Revenue Metrics</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li>
                        <Link to="/metrics" className="nav-link">Metrics</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;