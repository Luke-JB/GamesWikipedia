import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import '../CSS/Header.css';
import logo from "../Images/LogoDraft1.png";
import { logoutUser } from "../api/api";

const Header = ({ setActiveComponent, isLoggedIn, setIsLoggedIn }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    /*const handleLogout = async () => {
        try {
            await logoutUser({}, { withCredentials: true });//.then(res => {location.reload();}).catch((e) => console.log(e.message))
            setActiveComponent("welcome");
            setMenuOpen(false);
            setIsLoggedIn(false);
            localStorage.removeItem('authToken');
        } catch (err) {
            console.log("Logout Error: ", err.message);
        }
    };*/

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

    //const isAuthenticated = !!localStorage.getItem("authToken");

    /*function UserRoles() {
        const [userRoles, setUserRoles] = useState([]);

        useEffect(() => {
            const fetchUserRoles = async () => {
                try {
                    const authToken = localStorage.getItem("authToken");
                    const response = await axios.get("https://localhost:55318/api/User/UserInfo", {
                        headers: {
                            Authorization: 'Bearer ${authtoken}',
                        },
                    });
                    setUserRoles(response.data.roles);
                } catch (error) {
                    console.error("Error fetching user roles: ", error);
                }
            };

            fetchUserRoles();
        }, []);
    }

    useEffect(() => {
        fetch("https://localhost:52188/gwBackend/api/userinfo", {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
        .then(response => response.json())
        .then(data => setUserRoles(data.roles));
    }, []); 
    
    {userRoles.includes("User") && <li><Link to="/" onClick={() => { setActiveComponent("welcome"); setMenuOpen(false); }}>Sign Out</Link></li>}
    
    */

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