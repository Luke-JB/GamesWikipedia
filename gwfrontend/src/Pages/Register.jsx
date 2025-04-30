import React, { useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import '../CSS/Register.css';
import { registerUser } from "../api/api.jsx"; 
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.Password !== formData.ConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        registerUser(formData).then(res => console.log(res)).catch((e) => console.log(e.message))
        navigate('/'); // redirect back to homepage.
    };

    return (
        <div>
            
            <main>
                <div className="regWrapper">
                    <div className="regTitle">
                        <h2>Registration</h2>
                    </div>
                    <div className="regFormWrapper">
                        <form className="regForm" onSubmit={handleSubmit}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}/>
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Register;