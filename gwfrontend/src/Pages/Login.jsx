import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { loginUser } from '../api/api';
import Footer from '../Components/Footer';
import '../CSS/Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const res = await loginUser({ userName: username, password, rememberMe });
            setIsLoggedIn(true)
            localStorage.setItem('authToken', 'some-token');
            alert("Login successful"); // "Login successful"
            navigate('/'); // Redirect to the homepage
        } 
        catch (err) {
            alert('Login failed');
            console.error(err);
        }
    };

    return (
        <div>
            <main>
                <div className="LoginWrapper">
                    <div className="loginTitle">
                        <h2>Login</h2>
                    </div>
                    <div className="loginFormWrapper">
                        <form className="loginForm" onSubmit={handleSubmit}>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                            <label><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>Remember Me</label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;