import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginHome from "./LoginHome";
import Signup from "./Signup";
import BarcodeScan from "./SignUpEquip.js";
import SearchEquip from "./SearchEquip.js";
import SearchUser from "./SearchUser.js";
import RequestEquip from "./RequestEquip.js";
import ManageRequests from "./ManageRequests.js";
import CheckIn from "./CheckIn";
import YourEquip from "./YourEquip";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginHome />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/BarcodeScan" element={<BarcodeScan />} />
          <Route path="/SearchEquip" element={<SearchEquip />} />
          <Route path="/SearchUser" element={<SearchUser />} />
          <Route path="/RequestEquip" element={<RequestEquip />} />
          <Route path="/manageRequests" element={<ManageRequests />} />
          <Route path="/CheckIn" element={<CheckIn />} />
          <Route path="/YourEquip" element={<YourEquip />} />
        </Routes>
      </Router>
    </>
  );

}

export default App;