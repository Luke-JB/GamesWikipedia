import React, { useEffect, useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import NewWikiArticle from "../Components/NewWikiArticle.jsx";
import '../CSS/Profile.css';
import { getFavorites } from "../api/api";

const ProfileGames = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites().then(res => {setFavorites(res.data)}).catch(err => {console.error("Failed to load favorites:", err)})
    }, []);

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
                            {favorites.length === 0 ? (
                                <p>No favorite games yet.</p>
                            ) : (
                                favorites.map(game => (
                                    <article key={game.gameId} className="favoriteGame">
                                        <h4>{game.gameName}</h4>
                                        <p>Genre: {game.gameGenre}</p>
                                    </article>
                                ))
                            )}
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