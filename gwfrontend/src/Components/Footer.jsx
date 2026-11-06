import React from "react";
import '../CSS/Footer.css';
import logo from "../Images/LogoDraft1.png";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer>
            <div className="footerClass">
                <div className="footerLogo">
                    <img src={logo} id="logo" alt="logo"/>
                </div>
                <div className="footerLinks">
                    <ul>
                        <li>About</li>
                        <li>Games</li>
                        <li>Terms</li>
                        <li>Rules</li>
                    </ul>
                </div>
                <div className="footerSocial">
                    <p>Follow Us: </p>
                </div>
            </div>
            <div className="footerCopy">
                <span id="copywright">Copyright &copy {new Date().getFullYear()} Luke Bradfield.</span>
            </div>
        </footer>
    );
}

export default Footer;