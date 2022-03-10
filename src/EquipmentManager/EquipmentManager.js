import React from "react";
import "../App.css";
import { useState } from "react";
import  background from "../background5.jpg";


function Admin() {
    const [user, setUser] = useState(null);


    React.useEffect(() => {
        const refToken = localStorage.getItem("refresh-token"); //get localstorage
        const accToken = localStorage.getItem("access-token"); //get localstorage
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
        }
    }, []);

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
        <div className="background" style={{ backgroundImage: `url(${background})`,  backgroundSize: 'cover'}}>
            <div className="form1" >
                <button className="submitButton"> Register Equipment </button>                
                <br></br>                 
                <br></br>
                <br></br>

                <button className="submitButton"> Search Equipment </button>                
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>                
                <button type="submit" className="submitButton">Logout</button>


            </div>
        </div> 

    );
}


export default Admin;