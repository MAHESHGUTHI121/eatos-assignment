import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    Eatos<span className="logo-accent">Admin</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Menu</Link>
                    <Link to="/orders" className={`nav-link ${isActive('/orders')}`}>Orders</Link>
                </div>
            </div>
        </nav>
    );
}
