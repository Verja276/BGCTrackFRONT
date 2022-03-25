import React from "react";
import "../App.css";
import background from "../background5.jpg";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
const handleLogout = async (e) => {
    try {
        e.preventDefault();
        sessionStorage.clear();
        window.location.reload();
    } catch (err) {
        window.alert("logout failure!")
    }
};
function BasicUser() {
    return (
        <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            
            <Helmet><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" ></meta></Helmet>
            <div className="background" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} >
            <Helmet><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" ></meta></Helmet>
            <div className="form1" >
                <Link to="/SearchEquip" class="btn btn-primary btn-lg col-12 mb-4">Search equipment</Link>
                <form className="mb-2" onSubmit={handleLogout}>
                    <button type="submit" class="btn btn-danger btn-lg col-12 ">Logout</button>
                </form>
            </div>
        </div>

        </div>
    );
}

export default BasicUser;