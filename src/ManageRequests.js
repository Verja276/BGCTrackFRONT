import React from "react";
import "./App.css";
import { Navigate } from 'react-router-dom';
import Pro from "./notBasic/ManageRequestsPro";
//import Signup from "./Signup";
import axios from 'axios';
import { useState, useEffect } from 'react';
//
function ManageRequests() {

    return (
        (sessionStorage.getItem("user_status") == "a") ? (
            <Pro />
        ) : ((sessionStorage.getItem("user_status") == "e") ? (<Pro />) :
            (<Navigate to="/" replace={true} />))

    );
}





export default ManageRequests;