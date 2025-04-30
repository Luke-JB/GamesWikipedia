import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import NewWikiArticle from "../Components/NewWikiArticle.jsx";
import '../CSS/Profile.css';

const ProfileGames = () => {
    return (
        <div>
            
            <main>
                <div className="profileWrapper">
                    <div className="profileTitle">
                        <h2>My Library</h2>
                    </div>
                    <div className="profileGames">
                        <div className="myGames">
                            <h3>My Games</h3>
                        </div>
                        <div className="myFavorites">
                            <h3>My Favorites</h3>
                        </div>
                        <div className="myWishlist">
                            <h3>My Wishlist</h3>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProfileGames;