import React from "react";
import Header from '../Components/Header.js';
import SearchBar from '../Components/SearchBar.js';
import NewWikis from '../Components/NewWikis.js';
import '../CSS/Home.css';
import Footer from "../Components/Footer.js";
import logo from "../Images/LogoDraft1.png";

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="homeAbout">
                    <img src={logo} id="logo" alt="logo"></img>
                    <h2>GameFo</h2>
                    <p>Welcome to GameFo, an online video games encyclopedia.</p>
                </div>
                <div className="homeSearch">
                    <SearchBar />
                </div>
                <div className="homeNewWikis">
                    <NewWikis />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;