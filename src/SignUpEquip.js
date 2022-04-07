import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "./background5.jpg";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Navigate } from 'react-router-dom';
import Pro from "./notBasic/SignUpEquipPro";
import {useState, useEffect} from 'react';
//import Signup from "./Signup";
//
function SignUpEquip() {
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





export default SignUpEquip;