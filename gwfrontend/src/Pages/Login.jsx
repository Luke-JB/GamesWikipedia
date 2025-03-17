import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

const Login = () => {
    return (
        <div>
            <Header />
            <main>
                <h2></h2>
                <form className="loginForm">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username"></input>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" name="password"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Login;