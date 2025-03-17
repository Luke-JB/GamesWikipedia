import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Header.css';
import logo from "../Images/LogoDraft1.png";

const Header = () => {
    return (
        <header className="HeaderClass">
            <div className="headerWrapper">
                <div className="headerLogo">
                    <img src={logo} id="logo" alt="logo"></img>
                    <a ref=""></a>
                    <h1>GameFo</h1>
                </div>
                <div className="headerNav">
                    <nav>
                        <Link to="/">Games</Link>
                        <Link to="/">Search</Link>
                        <Link to="/">Login</Link>
                        <Link to="/">Register</Link>
                        <Link to="/">Sign Out</Link>
                        <Link to="/">My Library</Link>
                        <Link to="/">Profile</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;