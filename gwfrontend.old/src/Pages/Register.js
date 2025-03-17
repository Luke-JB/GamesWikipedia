import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";

const Register = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Registration</h2>
                <form className="registerForm">
                    <label for="name">Name: </label>
                    <input type="text" id="name" name="name"></input>
                    <label for="userName">Username: </label>
                    <input type="text" id="userName" name="userName"></input>
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="email"></input>
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password"></input>
                    <label for="confirmPassword">Confirm Password: </label>
                    <input type="password" id="confirmPassword" name="confirmPassword"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Register;