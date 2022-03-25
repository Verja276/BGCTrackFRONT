import React from "react";
import "../App.css";
import { useState } from "react";
import background from "../background5.jpg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


function Admin() {
    const [user, setUser] = useState(null);


    React.useEffect(() => {
        const refToken = localStorage.getItem("refresh-token"); //get localstorage
        const accToken = localStorage.getItem("access-token"); //get localstorage
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
        }
    }, []);

    //change this later
    const handleLogout = async (e) => {
        try {
            e.preventDefault();
            sessionStorage.clear();
            window.location.reload();
        } catch (err) {
            window.alert("logout failure!")
        }
    };




    return (
        <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <Helmet><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" ></meta></Helmet>
            <div className="form1" >
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <Link to="/barcodeScan" className="link" >add equipment</Link>
                <br></br>
                <br></br>
                <br></br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <Link to="/SearchEquip" className="link" >Search equipment</Link>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br>
                </br>
                <br>
                </br>
                <form className="logout" onSubmit={handleLogout}>
                    <button type="submit" className="submitButton">Logout</button>
                </form>


            </div>
        </div>

    );
}


export default Admin;