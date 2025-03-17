import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

const Register = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Registration</h2>
                <form className="registerForm">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name"></input>
                    <label htmlFor="userName">Username: </label>
                    <input type="text" id="userName" name="userName"></input>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email"></input>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password"></input>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" id="confirmPassword" name="confirmPassword"></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Register;