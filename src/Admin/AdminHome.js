import React from "react";
import "../App.css";
import { useState } from "react";
import {Link} from 'react-router-dom';
import  background from "../background5.jpg";

function AdminHome() {
    const [user, setUser] = useState(null);

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
        <div  className="background" style={{ backgroundImage: `url(${background})`,  backgroundSize: 'cover'}} >
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
                <Link to="/Signup" className="link"  >Sign up </Link>            
                <form onSubmit={handleLogout}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                
                <button type="submit" className="submitButton">Logout</button>
                </form>

            </div>

        </div> 

    );
}

export default AdminHome;