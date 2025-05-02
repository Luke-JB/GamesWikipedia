import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/GameEdit.css';
import axios from "axios";
import { addGame } from "../api/api";
import { Navigate } from "react-router";

const GameEdit = ({ isLoggedIn }) => {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        genre: '',
        coop: '',
        developer: '',
        publisher: '',
        indie: '',
        platform: []
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

    /*const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addGame(formData).catch((e) => console.log(e.message))
    };
    
    return (
        <div>
            
            <main>
                <div className="gameAddWrapper">
                    <div className="gameAddTitle">
                        <h2>Edit Game Wiki</h2>
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
                                <input type="radio" name="coop" value="coopYes" checked={formData.coop === "coopYes"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">No
                                <input type="radio" name="coop" value="coopNo" checked={formData.coop === "coopNo"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label><br/>
                            <label htmlFor="developer">Developer:</label>
                            <input type="text" id="developer" name="developer" value={formData.developer} onChange={handleChange}></input><br/>
                            <label htmlFor="publisher">Publisher: </label>
                            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange}></input><br/>
                            <p>Indie</p>
                            <label className="AddGameRadioContainer">Yes
                                <input type="radio" name="indie" value="indieYes" checked={formData.indie === "indieYes"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label>
                            <label className="AddGameRadioContainer">No
                                <input type="radio" name="indie" value="indieNo" checked={formData.indie === "indieNo"} onChange={handleChange}></input>
                                <span className="AddGameRadioCheckmark"></span>
                            </label><br/>
                            <p>Platform</p>
                            <section className="platformWrapper">
                                <label className="addGameContainer">PC
                                    <input type="checkbox" name="platform" value="PC" checked={formData.platform.includes("PC")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                            </section>
                            <section className="platformWrapper">
                                <label className="addGameContainer">PS5
                                    <input type="checkbox" name="platform" value="PS5" checked={formData.platform.includes("PS5")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS4
                                    <input type="checkbox" name="platform" value="PS4" checked={formData.platform.includes("PS4")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS3
                                    <input type="checkbox" name="platform" value="PS3" checked={formData.platform.includes("PS3")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS2
                                    <input type="checkbox" name="platform" value="PS2" checked={formData.platform.includes("PS2")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">PS1
                                    <input type="checkbox" name="platform" value="PS1" checked={formData.platform.includes("PS1")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                            </section>
                            <section className="platformWrapper">
                                <label className="addGameContainer">Xbox Series S/X
                                    <input type="checkbox" name="platform" value="Xbox Series S/X" checked={formData.platform.includes("Xbox Series S/X")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">Xbox One
                                    <input type="checkbox" name="platform" value="Xbox One" checked={formData.platform.includes("Xbox One")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">Xbox 360
                                    <input type="checkbox" name="platform" value="Xbox 360" checked={formData.platform.includes("Xbox 360")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                                <label className="addGameContainer">Xbox
                                    <input type="checkbox" name="platform" value="Xbox" checked={formData.platform.includes("Xbox")} onChange={handleChange}></input>
                                    <span className="GameAddcheckmark"></span>
                                </label>
                            </section>
                            <input type="submit" value="Submit"></input>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default GameEdit;