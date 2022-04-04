import React from "react";
import "../App.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import background from "../background5.jpg";
import { Helmet } from "react-helmet";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Form from 'react-bootstrap/Form';
function AdminHome() {
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const refToken = sessionStorage.getItem("refresh-token"); //get sessionStorage
        const accToken = sessionStorage.getItem("access-token"); //get sessionStorage
        if (refToken, accToken) {
            setUser(JSON.parse(refToken, accToken));
        }
    }, []);


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
        <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} >
            <Helmet><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" ></meta></Helmet>
            <div className="form1" >
                <Link to="/SearchEquip" class="btn btn-primary btn-lg col-12 mb-4">Search equipment</Link>
                <Link to="/SearchUser" class="btn btn-dark btn-lg col-12 mb-4">Search Users</Link>
                <Link to="/Signup"  class="btn btn-success btn-lg col-12  mb-4">Add Users</Link>
                <Link to="/BarcodeScan"  class="btn btn-warning btn-lg col-12  mb-4" >Add equipment</Link>
                <form className="mb-2" onSubmit={handleLogout}>
                    <button type="submit" class="btn btn-danger btn-lg col-12 ">Logout</button>
                </form>
            </div>
        </div>

    );
}

export default AdminHome;