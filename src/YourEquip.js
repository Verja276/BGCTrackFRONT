import React, { useState, useEffect } from "react"; //STORE DATA
import "./App.css";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
import Basic from "./BasicUser/YourEquipBasic";

es6.polyfill();
//
function YourEquip() {
    React.useEffect(() => {
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
    })
    return (
        (sessionStorage.getItem("user_status") != "") ? (
            <Basic />
        ) : (<Navigate to="/" replace={true} />) 
    );
}

export default YourEquip;