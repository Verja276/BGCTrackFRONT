import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import  background from "./background5.jpg";
//import Signup from "./Signup";
function Signup() {
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
     


//here


    const handleSignUP = async (e) => {
        e.preventDefault();
        try {
            if (name === "" || email === "" || password === "" || status === "") {
                window.alert("fill out all fields before signing up.")
            } else {
            const res = await axios.post("https://bgctrack.herokuapp.com/api/signup", {name, email, password, status});
            setUser(res.data);
            window.alert("user added!");
            }
        } catch (err) {
            console.log(err)
        }
    }



    const handleLogout = async (e) => {

        try {

          e.preventDefault();
          window.sessionStorage.clear();

          window.location.reload();
      } catch (err) {
            window.alert("logout failure!")
        }
    };


    const handleGoToSignUp = async (e) => {
        <signup />
    };

    document.body.style.backgroundColor = "#23272A";

    return (
        <div className="container" >
        <div  className="background" style={{ backgroundImage: url($,{background}),  backgroundSize: 'cover'}} >
        <div  className="form1">

            <span className="formTitle" >SIGN UP USERS</span>
            <br></br>
            <br></br>
            <form onSubmit={handleSignUP}>
            <input
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <label for="role"></label>
                <br>
                </br> 
                <select id="roles" name="role" onChange={(e) => setStatus(e.target.value)}>
                    <option  value="b">Basic User</option> 
                    <option  value="e">Equipment Manager</option> 
                    <option  value="a">Admin</option>
                </select>
                <br></br>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button type="submit" className="submitButton" >Sign up</button> 
            <br>
            </br>
            </form>
            <br></br>
            <br></br>

            <Link to="/" className="link">Go back</Link>


            <br></br>
            <br></br>
            <br></br>
            </div>
        </div>





        </div>

    );
}


export default Signup;