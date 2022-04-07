import React, { useState, useEffect } from "react"; //STORE DATA
import "./App.css";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
import Basic from "./BasicUser/SearchEquipBasic";
import Pro from "./notBasic/CheckInPro";
import axios from 'axios';
es6.polyfill();
//
function CheckIn() {
    useEffect(() => {
        const currentTime = new Date().getMinutes();
        const loginTime = sessionStorage.getItem("session-start");
        const [user, setUser] = useState(null);
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
        (sessionStorage.getItem("user_status") == "a") ? (
            <Pro />
        ) : ((sessionStorage.getItem("user_status") == "e") ? ( <Pro />) : 
        
        (((sessionStorage.getItem("user_status") != null) ? (<Basic />)
            : (<Navigate to="/" replace={true} />)
        )))
    );
}

export default CheckIn;