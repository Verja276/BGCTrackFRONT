import React from "react";
import "./App.css";
import { Navigate } from 'react-router-dom';
import Pro from "./notBasic/ManageRequestsPro";
//import Signup from "./Signup";
import axios from 'axios';
import {useState, useEffect} from 'react';
//
function ManageRequests() {
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
        (sessionStorage.getItem("user_status") == "a") ? (
            <Pro />
        ) : ((sessionStorage.getItem("user_status") == "e") ? (<Pro />) : 
        (<Navigate to="/" replace={true} />))

    );
}





export default ManageRequests;