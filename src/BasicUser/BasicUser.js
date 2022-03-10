import React from "react";
import "../App.css";
const handleLogout = async (e) => {
    try {
      e.preventDefault();
      sessionStorage.clear();
      window.location.reload();
  } catch (err) {
    window.alert("logout failure!")
    }
};
function BasicUser () {
    return (
        <ul>
            <button className="submitButton"> Search Equipment </button>     
            <form onSubmit={handleLogout}>
                <br></br>
                <button type="submit" className="submitButton">Logout</button>
            </form>
        </ul>
    );
}

export default BasicUser;