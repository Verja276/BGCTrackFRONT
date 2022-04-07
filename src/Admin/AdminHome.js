import React from "react";
import "../App.css";//
import { useState } from "react";
import { Link } from 'react-router-dom';
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
        <div className="body" >
            <div className="form3" >
                <Link to="/SearchEquip" class="btn btn-primary btn-lg col-12 mb-4">Search equipment</Link>
                <Link to="/SearchUser" class="btn btn-primary btn-lg col-12 mb-4">Search Users</Link>
                <Link to="/BarcodeScan"  class="btn btn-success btn-lg col-12  mb-4" >Add equipment</Link>
                <Link to="/Signup"  class="btn btn-success btn-lg col-12  mb-4">Add Users</Link>
                <Link to="/RequestEquip" class="btn btn-dark btn-lg col-12 mb-4">Request equipment</Link>
                <Link to="/manageRequests"  class="btn btn-dark btn-lg col-12  mb-4" >Check Out</Link>
                <Link to="/CheckIn" class="btn btn-dark btn-lg col-12 mb-4">Check In</Link>
                <Link to="/YourEquip" class="btn btn-dark btn-lg col-12 mb-4">Your Equipments</Link>
                <form className="mb-2" onSubmit={handleLogout}>
                    <button type="submit" class="btn btn-danger btn-lg col-12 ">Logout</button>
                </form>
            </div>
        </div>

    );
}

export default AdminHome;