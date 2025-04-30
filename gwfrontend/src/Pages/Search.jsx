import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/Search.css';
import axios from 'axios';
import { searchGames } from "../api/api";

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

    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTextChange = (e) => {
        setFormData(prev => ({...prev, searchText: e.target.value,
        }));
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
    
    /*const handleCheckChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const categories = checked
            ? [...prevData.categories, value]
            : prevData.categories.filter((cat) => cat !== value);
            return { ...prevData, categories };
        });
    }; 
        
    const handleSearch = async () => {
        const params = {};
        for (let key in filters) {
            if (filters[key]) params[key] = filters[key];
        } 
    }*/

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const params = {
            title: formData.title,
            year: formData.year,
            genre: formData.genre,
            coop: formData.coop,
            developer: formData.developer,
            publisher: formData.publisher,
            indie: formData.indie,
            platform: formData.platform
        };
        
        const response = await searchGames({ 
            params,
            paramsSerializer: (params) => {
                const searchParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v) => searchParams.append(key, v));
                    } else if (value !== '' && value !== null && value !== undefined) {
                        searchParams.append(key, value);
                    }
                });
                return searchParams.toString();
            }
        });
    
        setResults(response.data);
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
                            <label className="container">FPS
                                <input type="checkbox" name="genre" value="FPS" checked={formData.genre.includes('FPS')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">RPG
                                <input type="checkbox" name="genre" value="RPG" checked={formData.genre.includes('RPG')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Action
                                <input type="checkbox" name="genre" value="Action" checked={formData.genre.includes('Action')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Racing & Sports
                                <input type="checkbox" name="genre" value="Sports" checked={formData.genre.includes('Sports')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Platformer
                                <input type="checkbox" name="genre" value="Platformer" checked={formData.genre.includes('Platformer')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Strategy
                                <input type="checkbox" name="genre" value="Strategy" checked={formData.genre.includes('Strategy')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Adventure
                                <input type="checkbox" name="genre" value="Adventure" checked={formData.genre.includes('Adventure')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Simulator
                                <input type="checkbox" name="genre" value="Simulator" checked={formData.genre.includes('Simulator')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Horror
                                <input type="checkbox" name="genre" value="Horror" checked={formData.genre.includes('Horror')} onChange={handleCheckChange}></input>
                                <span className="checkmark"></span>
                            </label><br/>

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


                            <input type="submit" value="Submit"></input>
                        </form>

                        <ul>
                            {results.map(Game => (
                                <li key={Game.GameId}>{Game.GameName}</li>
                            ))}
                        </ul>
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
*/

export default Search;