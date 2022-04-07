import React from "react";
import "../App.css";
import background from "../background5.jpg";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
//
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
    const [user, setUser] = useState(null);
    const currentTime = new Date().getMinutes();
        const loginTime = sessionStorage.getItem("session-start");
        const sessionLimit = 20;
        if (currentTime && loginTime) {
            if ((currentTime - loginTime) > sessionLimit) {
                const res = axios.post("https://bgctrack.herokuapp.com/api/logout")
                setUser(res.data);
                sessionStorage.clear();
                window.location.reload();
            }
        }
    return (
        <div>
            <div className="form3" >
                <Link to="/SearchEquip" class="btn btn-primary btn-lg col-12 mb-4">Search equipment</Link>
                <Link to="/RequestEquip" class="btn btn-warning btn-lg col-12 mb-4">Request equipment</Link>
                <Link to="/YourEquip" class="btn btn-dark btn-lg col-12 mb-4">Your Equipments</Link>
                <form className="mb-2" onSubmit={handleLogout}>
                    <button type="submit" class="btn btn-danger btn-lg col-12 ">Logout</button>
                </form>
            </div>
        </div>

    );
}

export default BasicUser;