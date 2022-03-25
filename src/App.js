import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginHome from "./LoginHome";
import Signup from "./Signup";
import BarcodeScan from "./SignUpEquip.js";
import SearchEquip from "./SearchEquip.js";
import SearchUser from "./SearchUser.js";

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
          </Routes>
        </Router>
      </>
  );
  
}

export default App;