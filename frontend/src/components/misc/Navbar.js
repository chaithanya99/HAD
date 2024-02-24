// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                {/* Add your navbar content here */}
                <div className="logo">Your Logo</div>
                <ul className="nav-links">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
