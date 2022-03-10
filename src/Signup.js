import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
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
                           <br></br>
                           <br></br>
                           <br></br>
                           <br></br>
                           <br></br>
                           <br></br>
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
                <select id="roles" name="role">                          
                <option onChange={(e) => setStatus(e.target.value)} value="b">Basic User</option> 
                <option onChange={(e) => setStatus(e.target.value)} value="e">Equipment Manager</option> 
                <option onChange={(e) => setStatus(e.target.value)} value="a">Admin</option>
                                     
                </select>                <br>
                </br>

                </div>
                <br></br>
                <br></br>
                <br></br>
                                           
                    <button type="submit" className="submitButton">Sign up</button> 
                <br>
                </br>
            </form>

            <br></br> <br></br>                           <br></br>
            <Link to="/" className="signup">Go back</Link>            



        </div>

    );
}

export default Signup;