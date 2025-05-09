import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProfileImg from "../Images/ProfilePicDefault.jpg";
import { Link } from "react-router-dom";
import '../CSS/Profile.css';
import { fetchProfile } from "../api/api";

const Profile = ({ setIsLoggedIn }) => {

    const [userData, setUserData] = useState({
        uName: "",
        userName: "",
        userEmail: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile()
        .then(response => {
            setUserData(response.data);
            setError(null);
        })
        .catch((e) => {
            console.errir("Error fetching profile", e);
            setError("Failed to load profile. Please try again later.");
        })
        .finally(() => setLoading(false))
    },[]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return (
        <div>
            
            <main>
                <div className="errorMessage"></div>
            </main>
            <Footer/>
        </div>
    );

    const handleLogout = () => {
        // Clear the login state
        setIsLoggedIn(false);
    };

    return (
        <div>
            
            <main>
                <div className="profileWrapper">
                    <div className="profileTitle">
                        <h2>Profile Details</h2>
                    </div>
                    <div className="profileDetails">
                        <img src={ProfileImg} id="profileImg" alt="Profile Picture" width="128px" height="128px"></img>
                        <div className="profileText">
                            <p>Name: {userData.uName}</p>
                            <p>User Name: {userData.userName}</p>
                            <p>Email: {userData.userEmail}</p>
                        </div>
                    </div>
                    <div className="profileButtons">
                        <Link to="/ProfileUpdate" className="button">Update Details</Link>
                        <Link to="/ProfileGames" className="button">View Games Library</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;