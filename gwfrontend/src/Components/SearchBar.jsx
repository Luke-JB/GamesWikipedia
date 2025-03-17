import React from 'react'
import '../CSS/SearchBar.css';

const SearchBar = () => {
    return (
        <div className="searchBarWrappper">
            <form>
                <label for="searchBar"></label>
                <input type="text" id="searchBar" name="searchBar" placeholder="Search.."></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default SearchBar;