import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/GameAdd.css';
import { addGame } from "../api/api";
import { Navigate } from "react-router";

const GameAdd = ({ isLoggedIn }) => {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        genre: '',
        coop: false,
        developer: '',
        publisher: '',
        director: '',
        writer: '',
        composer: '',
        indie: false,
        platform: [],
        description: '',
        info: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
            setFormData((prevData) => {
                const updatedArray = checked
                    ? [...prevData[name], value]
                    : prevData[name].filter((item) => item !== value);
                return {
                    ...prevData,
                    [name]: updatedArray,
                };
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
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
        const gameData = {
            gameName: formData.title,
            gameRelease: formData.year,
            gameGenre: formData.genre,
            gameDeveloper: formData.developer,
            gamePublisher: formData.publisher,
            gameDirector: formData.director,
            gameWriter: formData.writer,
            gameComposer: formData.composer,
            gameCoop: formData.coop,   // boolean value
            gameIndie: formData.indie, // boolean value
            gamePlatform: formData.platform,
            gameDescription: formData.description,
            gameInfo: formData.info
        };    
        const response = await addGame(gameData).catch((e) => console.log(e.message))
    };
    
    return (
        <div>
            
            <main>
                <div className="gameAddWrapper">
                    <div className="gameAddTitle">
                        <h2>Add New Game Wiki</h2>
                    </div>
                    <div className="addGameForm">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}></input><br/>
                            <label htmlFor="year">Year of Release: </label>
                            <input type="number" id="year" name="year" value={formData.year} onChange={handleChange}></input><br/>
                            <p>Genre</p>
                            <label className="AddGameRadioContainer">FPS
                                <input type="radio" name="genre" value="FPS" checked={formData.genre === "FPS"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">RPG
                                <input type="radio" name="genre" value="RPG" checked={formData.genre === "RPG"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Action
                                <input type="radio" name="genre" value="Action" checked={formData.genre === "Action"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Racing & Sports
                                <input type="radio" name="genre" value="Sports" checked={formData.genre === "Sports"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Platformer
                                <input type="radio" name="genre" value="Platformer" checked={formData.genre === "Platformer"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Strategy
                                <input type="radio" name="genre" value="Strategy" checked={formData.genre === "Strategy"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Adventure
                                <input type="radio" name="genre" value="Adventure" checked={formData.genre === "Adventure"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Simulator
                                <input type="radio" name="genre" value="Simulator" checked={formData.genre === "Simulator"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">Horror
                                <input type="radio" name="genre" value="Horror" checked={formData.genre === "Horror"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label><br/>
                            <p>Co-op</p>
                            <label className="AddGameRadioContainer">Yes
                                <input type="radio" name="coop" value={true} checked={formData.coop === true} onChange={() => setFormData({ ...formData, coop: true })}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">No
                                <input type="radio" name="coop" value={false} checked={formData.coop === false} onChange={() => setFormData({ ...formData, coop: false })}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label><br/>
                            <label htmlFor="developer">Developer:</label>
                            <input type="text" id="developer" name="developer" value={formData.developer} onChange={handleChange}></input><br/>
                            <label htmlFor="publisher">Publisher: </label>
                            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange}></input><br/>
                            <label htmlFor="director">Director: </label>
                            <input type="text" id="director" name="director" value={formData.director} onChange={handleChange}></input><br/>
                            <label htmlFor="writer">Writer: </label>
                            <input type="text" id="writer" name="writer" value={formData.writer} onChange={handleChange}></input><br/>
                            <label htmlFor="composer">Composer: </label>
                            <input type="text" id="composer" name="composer" value={formData.composer} onChange={handleChange}></input><br/>
                            <p>Indie</p>
                            <label className="AddGameRadioContainer">Yes
                                <input type="radio" name="indie" value={true} checked={formData.indie === true} onChange={() => setFormData({ ...formData, indie: true })}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">No
                                <input type="radio" name="indie" value={false} checked={formData.indie === false} onChange={() => setFormData({ ...formData, indie: false })}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label><br/>
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
                            <section>
                                <p>Game Description</p>
                                <label htmlFor="description"></label>
                                <textarea id="description" name="description" rows="4" cols="50" value={formData.description} onChange={handleChange} placeholder="Type description here..."></textarea><br/>
                            </section>
                            <section>
                                <p>Game Extra Detail</p>
                                <label htmlFor="info"></label>
                                <textarea id="info" name="info" rows="4" cols="50" value={formData.info} onChange={handleChange} placeholder="Type Extra game detail here..."></textarea><br/>
                            </section>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default GameAdd;