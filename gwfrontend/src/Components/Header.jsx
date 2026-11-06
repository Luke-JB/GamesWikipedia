import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router";
import '../CSS/Header.css';
import logo from "../Images/LogoDraft1.png";
import { logoutUser } from "../api/api";

const Header = ({ setActiveComponent, isLoggedIn, setIsLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogout = async () => {
        try {
            const res = await logoutUser({}, { withCredentials: true });
            console.log("Logout response: ", res);
            setIsLoggedIn(false);
            localStorage.removeItem('authToken');
            window.location.href = "/";
        } catch (err) {
            console.log("Logout Error: ", err.message);
        }
    };

    useEffect(() => {
        const tokenExists = localStorage.getItem("authToken");
        if (tokenExists && !isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleNavClick = () => {
        setActiveComponent("welcome");
        setMenuOpen(false);
    };

    return (
        <header className="HeaderClass">
            <div className="headerWrapper">
                <div className="headerLogo">
                    <Link to="/">
                        <img src={logo} id="logo" alt="logo" width="200px" height="200px"/>
                        <h1>GameFo</h1>
                    </Link>
                </div>
                <div className="headerNavWrapper">
                    <nav className="headerNav">
                        <button className="burger" onClick={toggleMenu}>
                            &#9776;
                        </button>
                        <menu className={menuOpen ? 'active' : ''}>
                            {isLoggedIn ? (
                                <>
                                    <li><button onClick={async () => {await handleLogout(); window.location.href = "/";}} className="logoutButton">Logout</button></li>
                                    <li><Link to="/Search" onClick={handleNavClick}>Search</Link></li>
                                    <li><Link to="/" onClick={handleNavClick}>My Library</Link></li>
                                    <li><Link to="/Profile" onClick={handleNavClick}>Profile</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/Search" onClick={handleNavClick}>Search</Link></li>
                                    <li><Link to="/Login" onClick={handleNavClick}>Login</Link></li>
                                    <li><Link to="/Register" onClick={handleNavClick}>Register</Link></li>
                                </>
                            )}
                        </menu>
                    </nav>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default Header;