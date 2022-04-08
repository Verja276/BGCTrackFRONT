import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "./background5.jpg";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Navigate } from 'react-router-dom';
import Pro from "./notBasic/SignUpEquipPro";
import { useState, useEffect } from 'react';
//import Signup from "./Signup";
//
function SignUpEquip() {

    return (
        (sessionStorage.getItem("user_status") == "a") ? (
            <Pro />
        ) : ((sessionStorage.getItem("user_status") == "e") ? (<Pro />) :
            (<Navigate to="/" replace={true} />))

    );
}





export default SignUpEquip;