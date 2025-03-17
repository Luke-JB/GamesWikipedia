import React from "react";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import '../CSS/Header.css';
import logo from "../Images/LogoDraft1.png";

const Header = ({ setActiveComponent }) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="HeaderClass">
            <div className="headerWrapper">
                <div className="headerLogo">
                    <img src={logo} id="logo" alt="logo" width="200px" height="200px"></img>
                    <h1>GameFo</h1>
                </div>
                <div className="headerNavWrapper">
                    <nav className="headerNav">
                        <button className="burger" onClick={toggleMenu}>
                            &#9776;
                        </button>
                        <menu className={menuOpen ? 'active' : ''}>
                            <li><Link to="/" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Games</Link></li>
                            <li><Link to="/Search" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Search</Link></li>
                            <li><Link to="/Login" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Login</Link></li>
                            <li><Link to="/Resister" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Register</Link></li>
                            <li><Link to="/" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Sign Out</Link></li>
                            <li><Link to="/" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>My Library</Link></li>
                            <li><Link to="/Profile" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Profile</Link></li>
                        </menu>
                    </nav>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
};

export default Header;