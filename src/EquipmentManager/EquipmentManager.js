import React from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Admin() {
    const [user, setUser] = useState(null);


    React.useEffect(() => {
        const refToken = localStorage.getItem("refresh-token"); //get localstorage
        const accToken = localStorage.getItem("access-token"); //get localstorage
        if (refToken, accToken) {
            console.log("json data: " + JSON.stringify(refToken,accToken));
          setUser(JSON.parse(refToken,accToken));
        }
    }, []);
     


    // const handleLogout = async (e) => {
    //     console.log("hello");
    //     try {
    //         console.log("hello");
    //       e.preventDefault();
    //       window.localStorage.clear();
    //       if(localStorage.length == 0){
    //           console.log("hello");
    //       }
    //       window.location.reload();
    //   } catch (err) {
    //         window.alert("logout failure!")
    //     }
    // };
    const handleLogout = async (e) => {
        try {
          e.preventDefault();
          sessionStorage.clear();
          window.location.reload();
      } catch (err) {
        window.alert("logout failure!")
        }
    };




    document.body.style.backgroundColor = "#23272A";
    return (
        <div className="container" >

            <button className="submitButton"> Register Equipment </button>                
            <br></br>                 
            <br></br>
            <button className="submitButton"> Search Equipment </button>                
            <br></br>                
            <br></br>
            <form onSubmit={handleLogout}>
                <br></br>
                <button type="submit" className="submitButton">
                Logout</button>
            </form>

        </div>

    );
}


export default Admin;