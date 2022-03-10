import React from "react";
import "../App.css";
import background from "../background5.jpg";
const handleLogout = async (e) => {
    try {
        e.preventDefault();
        sessionStorage.clear();
        window.location.reload();
    } catch (err) {
        window.alert("logout failure!")
    }
};
function BasicUser() {
    return (
        <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <ul>
                <div className="form">
                    <button className="submitButton"> Search Equipment </button>

                    <form className="logout" onSubmit={handleLogout}>
                        <button type="submit" className="submitButton">Logout</button>
                    </form>
                </div>
            </ul>
        </div>
    );
}

export default BasicUser;