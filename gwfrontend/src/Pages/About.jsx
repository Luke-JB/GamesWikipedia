import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/About.css';

const About = ({ setIsLoggedIn }) => {
    return (
        <div>
            
            <main>
                <div className="aboutWrapper">
                    <div className="aboutTitle">
                        <h2>About</h2>
                    </div>
                    <div>
                        <h3>Online Video Game Encyclopedia</h3>
                        <p>Online Video Game Encyclopedia is a website created by Luke Bradfield in 2025 as part of a university development project at Sheffield Hallam University.</p>
                        <p>The aim of the website is to allow users to create accounts, to add game wikis, comments on each wiki and add wikis to their profile. This site follows rules and guideline which will be subject to moderation. Please the the rules page for more info.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default About;