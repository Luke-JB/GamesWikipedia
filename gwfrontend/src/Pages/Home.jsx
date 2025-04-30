import React from "react";
import Header from '../Components/Header.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import NewWikis from '../Components/NewWikis.jsx';
import '../CSS/Home.css';
import Footer from "../Components/Footer.jsx";
import logo from "../Images/LogoDraft1.png";
import { Link } from "react-router";

const Home = ({ isLoggedIn }) => {
    return (
        <div>
            
            <main>
                <div className="homeWrapper">
                    <div className="homeAbout">
                        <div className="homeLogo">
                            <img src={logo} id="logo" alt="logo"></img>
                        </div>
                        <h2>GameFo</h2>
                        <p>Welcome to GameFo, an online video games encyclopedia created in 2025 as a university project. GameFo aims to be a community contributed website allowing members to add game wikis to the site.</p>
                    </div>
                    <div className="homeSearch">
                        <SearchBar />
                    </div>
                    <div className="homeNewWikis">
                        <NewWikis />
                    </div>
                    <div className="homeAddWiki">
                        <h3>Add New Game Wikis</h3>
                        {isLoggedIn && (
                            <section className="homeAddWikiButton">
                                <Link to="/GameAdd" className="button">Add Game Wiki</Link>
                            </section>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;