import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import '../CSS/Search.css';
import { getAllGames, searchGames } from "../api/api";
import { Link, useParams } from "react-router";

const Search = () => {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        genre: [],
        coop: [],
        developer: '',
        publisher: '',
        indie: [],
        platform: []
    });

    //const { gameId } = useParams();

    const [results, setResults] = useState([]);

    /*useEffect(() => {
        getAllGames().then(res => setResults(res.data)).catch((e) => console.error("Error fetching games:", e));
    }, []);*/

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckChange = (e) => {
        const { name, value, checked } = e.target;
        
        setFormData(prev => {
            const categories = checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value);
            return { ...prev, [name]: categories };
        });
    };

    const handlePlatformChange = (e) => {
        const { value, checked } = e.target;
        
        setFormData(prev => {
            const platforms = checked
                ? [...prev.platform, value]  // Add selected platform
                : prev.platform.filter(item => item !== value); // Remove if unchecked
            return { ...prev, platform: platforms };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const searchParams  = {
            gameName: formData.title.trim(),
            gameRelease: formData.year,
            gameGenre: formData.genre.join(','),
            gameCoop: formData.coop.includes("coopYes"),
            gameDeveloper: formData.developer.trim(),
            gamePublisher: formData.publisher.trim(),
            gameIndie: formData.indie.includes("indieYes"),
            gamePlatform: formData.platform.join(',')
        };
        
        try {
            const response = await searchGames({
              params: searchParams,
              paramsSerializer: (p) => {
                const urlParams = new URLSearchParams();
                Object.entries(p).forEach(([key, value]) => {
                  if (Array.isArray(value)) {
                    value.forEach((v) => urlParams.append(key, v));
                  } else if (value !== '' && value !== null && value !== undefined) {
                    urlParams.append(key, value);
                  }
                });
                console.log("Serialized search:", urlParams.toString());
                return urlParams.toString();
              }
            });
          
            setResults(response.data);
          } catch (err) {
            console.error("Search failed:", err);
          }
    };    

    const resetForm = () => {
        setFormData({
            title: '',
            year: '',
            genre: [],
            coop: [],
            developer: '',
            publisher: '',
            indie: [],
            platform: []
        });
    };

    return (
        <div className="searchMain">
            
            <main>
                <div className="searchFormWrapper">
                    <div className="searchFormTitle">
                        <h2>Search</h2>
                    </div>
                    <div className="searchForm">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title: </label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}></input><br/>
                            <label htmlFor="year">Year of Release: </label>
                            <input type="number" id="year" name="year" value={formData.year} onChange={handleChange}></input><br/>

                            <p>Genre</p>
                            <div className="checkbox-group">
                                {["FPS", "RPG", "Action", "Sports", "Platformer", "Strategy", "Adventure", "Simulator", "Horror"].map((genre) => (
                                    <label key={genre} className="container">
                                        {genre}
                                        <input
                                        type="checkbox"
                                        name="genre"
                                        value={genre}
                                        checked={formData.genre.includes(genre)}
                                        onChange={handleCheckChange}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                ))}
                            </div>

                            <p>Co-op</p>
                            <label className="container">Yes
                                <input type="checkbox" id="coopYes" name="coop" value="coopYes" checked={formData.coop.includes('coopYes')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">No
                                <input type="checkbox" id="coopNo" name="coop" value="coopNo" checked={formData.coop.includes('coopNo')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label><br/>

                            <label htmlFor="developer">Developer: </label>
                            <input type="text" id="developer" name="developer" value={formData.developer} onChange={handleChange}></input><br/>
                            <label htmlFor="publisher">Publisher: </label>
                            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange}></input><br/>

                            <p>Indie</p>
                            <label className="container">Yes
                                <input type="checkbox" id="indieYes" name="indie" value="indieYes" checked={formData.indie.includes('indieYes')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">No
                                <input type="checkbox" id="indieNo" name="indie" value="indieNo" checked={formData.indie.includes('indieNo')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            
                            <p>Platform</p>
                            <section className="platformWrapper">
                                <label className="addGameContainer">PC
                                    <input type="checkbox" name="platform" value="PC" checked={formData.platform.includes("PC")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                            </section>
                            <section className="platformWrapper">
                                <label className="addGameContainer">PS5
                                    <input type="checkbox" name="platform" value="PS5" checked={formData.platform.includes("PS5")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS4
                                    <input type="checkbox" name="platform" value="PS4" checked={formData.platform.includes("PS4")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS3
                                    <input type="checkbox" name="platform" value="PS3" checked={formData.platform.includes("PS3")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS2
                                    <input type="checkbox" name="platform" value="PS2" checked={formData.platform.includes("PS2")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS1
                                    <input type="checkbox" name="platform" value="PS1" checked={formData.platform.includes("PS1")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                            </section>
                            <section className="platformWrapper">
                                <label className="addGameContainer">Xbox Series S/X
                                    <input type="checkbox" name="platform" value="Xbox Series S/X" checked={formData.platform.includes("Xbox Series S/X")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">Xbox One
                                    <input type="checkbox" name="platform" value="Xbox One" checked={formData.platform.includes("Xbox One")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">Xbox 360
                                    <input type="checkbox" name="platform" value="Xbox 360" checked={formData.platform.includes("Xbox 360")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">Xbox
                                    <input type="checkbox" name="platform" value="Xbox" checked={formData.platform.includes("Xbox")} onChange={handlePlatformChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                            </section><br/>

                            <input type="submit" value="Search"></input>
                            <button type="button" onClick={resetForm}>Reset</button>
                        </form>
                    </div>
                    <div>
                        <h2>Search Results</h2>
                        {results.length === 0 ? (
                            <p>No games found.</p>
                        ) : (
                            results.map((game) => (
                                <div key={game.gameId}>
                                    <Link to={`/gamewiki/${game.gameId}`}>
                                        <h3>{game.gameName}</h3>
                                    </Link>
                                    <p>Released: {game.gameRelease}</p>
                                    <p>Developer: {game.gameDeveloper}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

/*
<ul>
    {results.map((p) => (
        <li key={p.id}>{p.name} - ${p.price} ({p.category})</li>
    ))}
</ul>

<ul>
    {results.map(Game => (
        <li key={Game.GameId}>{Game.GameName}</li>
        ))}
</ul>
*/

export default Search;