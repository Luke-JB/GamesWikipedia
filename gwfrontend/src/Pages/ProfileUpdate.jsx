import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/Profile.css';
import '../CSS/ProfileUpdate.css';
import { fetchProfile, updateProfile } from "../api/api";

const ProfileUpdate = () => {
    const [formData, setFormData] = useState({
        uName: "",
        userName: "",
        userEmail: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile()
        .then(res => {
            setFormData({
                uName: res.data.uName,
                userName: res.data.useName,
                userEmail: res.data.userEmail
            });
        })
        .catch((err) => setError("Failed to load profile data"))
        .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        updateProfile(formData)
        .then(() => {
            alert("Profile updated successfully!");
        })
        .catch((err) => {
            console.error(err);
            alert("failed to update profile");
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            
            <main>
                <div className="profileWrapper">
                    <div className="profileTitle">
                        <h2>Profile Update</h2>
                    </div>
                    <div className="profileUpdate">
                        <form className="profileUpdateForm" onSubmit={handleSubmit}>
                            
                            <label htmlFor="uName">Name: </label>
                            <input type="text" id="uName" name="uName" value={formData.uName} onChange={handleChange}/><br/>

                            <label htmlFor="userName">User Name: </label>
                            <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange}/><br/>

                            <label htmlFor="passwordUpdate">Password: </label>
                            <input type="text" id="passwordUpdate" name="passwordUpdate"/><br/>

                            <label htmlFor="userEmail">Email: </label>
                            <input type="text" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleChange}/><br/>
                            
                            <label htmlFor="newPassword">New Password: </label>
                            <input type="text" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange}/><br/>
                            
                            <label htmlFor="confirmPassword">Consirm Password: </label>
                            <input type="text" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/><br/>

                            <input type="submit" value="Update Details"/>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProfileUpdate;