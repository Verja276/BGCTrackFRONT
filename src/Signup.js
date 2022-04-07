import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import background from "./background5.jpg";
import { Helmet } from "react-helmet";
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';
import Navbar from "./components/NavBarPro";

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
            setUser(JSON.parse(refToken, accToken));
        }
        
            const currentTime = new Date().getMinutes();
            const loginTime = sessionStorage.getItem("session-start");
            const sessionLimit = 20;
            if (currentTime && loginTime) {
                if ((currentTime - loginTime) > sessionLimit) {
                    const res = axios.post("https://bgctrack.herokuapp.com/api/logout")
                    setUser(res.data);
                    sessionStorage.clear();
                    window.location.reload();
                }
            }
    }, []);



    //here


    const handleSignUP = async (e) => {
        e.preventDefault();
        try {
            if (name === "" || email === "" || password === "" || status === "") {
                window.alert("fill out all fields before signing up.")
            } else {
                const res = await axios.post("https://bgctrack.herokuapp.com/api/signup", { name, email, password, status });
                setUser(res.data);
                window.alert("user added!");
            }
        } catch (err) {
            window.alert("user already there")
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




    return (
        
        (sessionStorage.getItem("user_status") == "a") ? (
            <div className="container" >
                <Helmet><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" ></meta></Helmet>
                <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} >
                <Navbar />
                    <Form class="align-items-center" onSubmit={handleSignUP}>
                        <Form.Group class="form-control" >
                            <Form.Label>Name</Form.Label>
                            <input
                                type="text"
                                placeholder="name"
                                onChange={(e) => setName(e.target.value)}
                                class="form-control"
                            />
                            <Form.Label>Email</Form.Label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Label>Password</Form.Label>
                            <input
                                class="form-control"
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                            <Form.Label>Location</Form.Label>
                            <select id="sel1" multiple name="role" class="form-control" onChange={(e) => setStatus(e.target.value)}>
                                <option value="a">Admin</option>
                                <option value="b">Basic</option>
                                <option value="e">Equipment manager</option>
                            </select>
                            <div class="mb-1 mt-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <button type="submit" class="btn btn-outline-success btn-lg btn-block">Add User</button>
                                </div>
                            </div>
                            <div class="mb-3 mt-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <div class="row">
                                        <Link to="/" class="btn btn-outline-danger btn-lg btn-block"> Go back </Link>
                                    </div>
                                </div>
                            </div>

                        </Form.Group>
                    </Form>
                </div>
            </div>
        ) : (<Navigate to="/" replace={true} />)
    );
}


export default Signup;