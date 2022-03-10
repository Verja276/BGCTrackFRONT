import React from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import Signup from "../Signup";

function AdminHome() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            console.log("json data: " + JSON.stringify(refToken,accToken));
          setUser(JSON.parse(refToken,accToken));
          console.log(refToken);
          console.log(accToken);
        }
    }, []);
     





    // const handleSignUP = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post("https://bgctrack.herokuapp.com/signup", {name, email, password, status});
    //         setUser(res.data);
    //         window.alert("user added!");
    //     } catch (err) {
    //         window.alert("Fill all the form");
    //         console.log(err)
    //     }
    // }



    const handleLogout = async (e) => {

        try {

          e.preventDefault();
          window.sessionStorage.clear();

          window.location.reload();
      } catch (err) {
            window.alert("logout failure!")
        }
    };


    function handleGoToSignUp() {
        console.log("ffc");
        
    };
//     <form onSubmit={handleSignUP}>
//     <input
//         type="text"
//         placeholder="name"
//         onChange={(e) => setName(e.target.value)}
//     />    
//     <input
//         type="text"
//         placeholder="email"
//         onChange={(e) => setEmail(e.target.value)}
//     />
//     <input
//         type="password"
//         placeholder="password"
//         onChange={(e) => setPassword(e.target.value)}
//     />
//     <div>
//         <input
//             type="radio"
//             id="admin"
//             name="role"
//             value="a"
//             onChange={(e) => {setStatus(e.target.value)}}
//         /><label for="admin">Administrator</label>
//         <input
//             type="radio"
//             id="equipment-manager"
//             name="role"
//             value="e"
//             onChange={(e) => {setStatus(e.target.value)}}
//         /><label for="equipment-manager">Equipment Manager</label>
//         <input
//             type="radio"
//             id="basic"
//             name="role"
//             value="b"
//             onChange={(e) => {setStatus(e.target.value)}}
//         /><label for="basic">Basic User</label>
//     </div>
//         <button type="submit" className="submitButton">Sign up</button> 
//     <br>
//     </br>
//     <form onSubmit={handleLogout}>
//         <br></br>
//         <button type="submit" className="submitButton">
//         Logout</button>
//     </form>
// </form>

    document.body.style.backgroundColor = "#23272A";    

    return (
        <div className="container" >

            <button className="submitButton"> Register Equipment </button>                
            <br></br>                 
            <br></br>
            <button className="submitButton"> Search Equipment </button>                
            <br></br>                
            <br></br>
                <br></br>
            <Link to="/Signup" className="submitButton" >Sign up </Link>            
            <br></br>                
            <br></br>
            <form onSubmit={handleLogout}>
                <br></br>
                <button type="submit" className="submitButton">Logout</button>
            </form>
            <br></br>                
            <br></br>

        </div>

    );
}

export default AdminHome;