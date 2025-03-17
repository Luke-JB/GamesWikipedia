import React from "react";
import '../CSS/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footerClass">

            </div>
            <div className="footerCopy">
                <span id="">Copyright &copy {new Date().getFullYear()} Luke Bradfield.</span>
            </div>
        </footer>
    );
}

export default Footer;