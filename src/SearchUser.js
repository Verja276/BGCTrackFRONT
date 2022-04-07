import React from "react"; //STORE DATA
import "./App.css";
import es6 from "es6-promise";
import "isomorphic-fetch";
import { Navigate } from 'react-router-dom';
import Pro from "./Admin/SearchUserPro";
import axios from 'axios';
import {useState, useEffect} from 'react';
es6.polyfill();

//
//import SearchEquip from "./SearchEquip";
function SearchUser() {

    return (
        (sessionStorage.getItem("user_status") == "a") ? ((<Pro />) 
        ) : (<Navigate to="/" replace={true} />)
    );
}

export default SearchUser;