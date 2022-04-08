import React from 'react';
import "./App.css";
import axios from "axios";
// import { useState } from "react";
import jwt_decode from "jwt-decode";
import Admin from "./Admin/AdminHome";
import BasicUser from "./BasicUser/BasicUser";
import EquipmentManager from "./EquipmentManager/EquipmentManager";
import background from "./background5.jpg";
import { Helmet } from "react-helmet";
import photo from "./BGCLogo-_Hex_004B91.svg";
import { useState, useEffect } from 'react';


//function setStat (param)

function LoginHome() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    React.useEffect(() => {
        //date_create = ;
        const currentTime = new Date().getMinutes();
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        const loginTime = sessionStorage.getItem("session-start");
        checkForOverdueEquipment();
        const sessionLimit = 20;
        if (currentTime && loginTime) {
            if ((currentTime - loginTime) > sessionLimit) {
                const res = axios.post("https://bgctrack.herokuapp.com/api/logout")
                setUser(res.data);
                sessionStorage.clear();
                window.location.reload();
            }
        }
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
        }
    }, []);

    const checkForOverdueEquipment = async (e) => {
        const current_date = new Date();
        try {
            axios.post("https://bgctrack.herokuapp.com/api/CheckForOverdueEquipment", { current_date });
        }
        catch (err) {
            console.log(err);
        }

    }

    const refreshToken = async () => {
        try {
            const res = await axios.post("https://bgctrack.herokuapp.com/api/refresh", { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const axiosJWT = axios.create() //works w a refresh token so u wont logged out

    axiosJWT.interceptors.request.use(
        //do this after any request
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let loginDate = new Date().getMinutes();
            const res = await axios.post("https://bgctrack.herokuapp.com/api/login", { email, password });
            sessionStorage.setItem("refresh-token", JSON.stringify(res.data.refreshToken)); //set sessionStorage
            sessionStorage.setItem("access-token", JSON.stringify(res.data.accessToken)); //set sessionStorage
            sessionStorage.setItem("user_status", jwt_decode(sessionStorage.getItem("access-token")).status); //set sessionStorage
            sessionStorage.setItem("user_email", jwt_decode(sessionStorage.getItem("access-token")).email)
            console.log(sessionStorage.getItem("user_email"))
            sessionStorage.setItem("session-start", JSON.stringify(loginDate));
            setUser(res.data);
        } catch (err) {
            window.alert("wrong email or password!");
        }
    };


    //The Login Home element
    return (

        <div className="container">
            {user ? (  //does user exist? if yes this page if not the other
                sessionStorage.getItem("user_status") == null ? ((((user.status === "a" ? (<Admin />) : (user.status === "b" ? (<BasicUser />) : <EquipmentManager />)
                ))))
                    : ((sessionStorage.getItem("user_status") === "a" ? (<Admin />) : (sessionStorage.getItem("user_status") === "b" ? (<BasicUser />) : <EquipmentManager />)
                    ))
            ) : (
                <div class="align-items-center">
                    <div class="mt-5 form-control">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-primary mb-4"><strong>{<div> <img src={photo} height="85" width="85" alt="LOGO" /> </div>}</strong></h1>
                            <input
                                type="text"
                                placeholder="email"
                                class="form-control mb-4"
                                onChange={(e) => setEmail(e.target.value)} />
                            <input
                                type="password"
                                placeholder="password"
                                class="form-control mb-4"
                                onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" class="btn btn-success btn-lg col-12  mb-4">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );

}

export default LoginHome;