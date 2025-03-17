import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Search = () => {
    return (
        <div className="searchMain">
            <Header />
            <main>
                <h2>Search</h2>
                <div className="searchForm">
                    <form>
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title"></input><br></br>
                        <label for="year">Year of Release</label>
                        <input type="text" id="year" name="year"></input><br></br>

                        <p>Genre</p>
                        <input type="checkbox" id="fps" name="fps" value="fps"></input>
                        <label for="fps"> FPS</label>
                        <input type="checkbox" id="rpg" name="rpg" value="rpg"></input>
                        <label for="rpg"> RPG</label>
                        <input type="checkbox" id="action" name="action" value="action"></input>
                        <label for="action"> Action</label>
                        <input type="checkbox" id="sports" name="sports" value="sports"></input>
                        <label for="sports"> Racing & Sports</label>
                        <input type="checkbox" id="platformer" name="platformer" value="platformer"></input>
                        <label for="platformer"> Platformer</label>
                        <input type="checkbox" id="strategy" name="strategy" value="strategy"></input>
                        <label for="strategy"> Strategy</label>
                        <input type="checkbox" id="adventure" name="adventure" value="adventure"></input>
                        <label for="adventure"> Adventure</label>
                        <input type="checkbox" id="simulator" name="simulator" value="simulator"></input>
                        <label for="simulator"> Simulator</label>
                        <input type="checkbox" id="horror" name="horror" value="horror"></input>
                        <label for="horror"> Horror</label>

                        <p>Co-op</p>
                        <input type="checkbox" id="coopYes" name="coopYes" value="coopYes"></input>
                        <label for="coopYes"> Yes</label>
                        <input type="checkbox" id="coopNo" name="coopNo" value="coopNo"></input>
                        <label for="coopNo"> No</label>

                        <label for="developer">Developer</label>
                        <input type="text" id="developer" name="developer"></input><br></br>
                        <label for="publisher">Publisher</label>
                        <input type="text" id="publisher" name="publisher"></input><br></br>

                        <p>Indie</p>
                        <input type="checkbox" id="indieYes" name="indieYes" value="indieYes"></input>
                        <label for="indieYes"> Yes</label>
                        <input type="checkbox" id="indieNo" name="indieNo" value="indieNo"></input>
                        <label for="indieNo"> No</label>
                        
                        <p>Platform</p>


                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Search;