import React, { useState, useEffect } from "react"; //STORE DATA
import "./App.css";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
import Basic from "./BasicUser/YourEquipBasic";
import axios from 'axios';

es6.polyfill();
//
function YourEquip() {

    return (
        (sessionStorage.getItem("user_status") != "") ? (
            <Basic />
        ) : (<Navigate to="/" replace={true} />)
    );
}

export default YourEquip;