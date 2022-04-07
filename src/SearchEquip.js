import React from "react"; //STORE DATA
import "./App.css";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
import Basic from "./BasicUser/SearchEquipBasic";
import Pro from "./notBasic/SearchEquipPro";
import axios from 'axios';
import {useState, useEffect} from 'react';
es6.polyfill();
//
function SearchEquip() {
  
    return (
        (sessionStorage.getItem("user_status") == "a") ? (
            <Pro />
        ) : ((sessionStorage.getItem("user_status") == "e") ? ( <Pro />) : 
        
        (((sessionStorage.getItem("user_status") != null) ? (<Basic />)
            : (<Navigate to="/" replace={true} />)
        )))
    );
}

export default SearchEquip;