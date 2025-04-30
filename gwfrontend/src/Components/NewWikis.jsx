import React, { useEffect, useState } from "react";
import '../CSS/NewWikis.css';
import NewWikiArticle from './NewWikiArticle'
import axios from 'axios';

const NewWikis = () => {
    /*
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:52188").then(response => {
            setArticles(response.data);
        })
        .catch(error => {
            console.error('error fetching data:', error);
        });
    }, []);
    
                    {articles.length > 0 ? (articles.map(article => (
                    <article
                    key={NewWikiArticle.GameId}
                    image={NewWikiArticle.GameImage}
                    title={NewWikiArticle.GameName}
                    />
                ))) : (
                    <p>Loading articles...</p>
                  )}
    */

    return (
        <div className="newWikisWrapper">
            <div className="newWikisTitle">
                <h3>New Game Wikis</h3>
            </div>
            <div className="newWikis">
            </div>
        </div>
    );
}

export default NewWikis;