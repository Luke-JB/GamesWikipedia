import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/Admin.css';

const Admin = () => {
    return (
        <div>
            
            <main>
                <div className="adminWrapper">
                    <div className="adminTitle">
                        <h2>Admin</h2>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Admin;