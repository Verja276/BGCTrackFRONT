import React from "react";
import "../App.css";
import background from "../background5.jpg";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
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
            
            <Helmet><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" ></meta></Helmet>
            <ul>
                <div className="form">
                <br></br>
                <br></br>
                <br></br>   
                <Link to="/SearchEquip" className="link" >Search equipment</Link>

                <br></br>
                <br></br>   

                <form className="logout" onSubmit={handleLogout}>
                    <button type="submit" className="submitButton">Logout</button>
                </form>
                </div>
            </ul>
        </div>
    );
}

export default BasicUser;