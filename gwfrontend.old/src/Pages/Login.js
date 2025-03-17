import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";

const Login = () => {
    return (
        <div>
            <Header />
            <main>
                <h2></h2>
                <form className="loginForm">
                    <label for="username">Username: </label>
                    <input type="text" id="username" name="username"></input>
                    <label for="password">Password: </label>
                    <input type="text" id="password" name="password"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Login;