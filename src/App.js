import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginHome from "./LoginHome";
import Signup from "./Signup";
import BarcodeScan from "./BarcodeScan.js";
import SearchEquip from "./SearchEquip";


function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<LoginHome />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/BarcodeScan" element={<BarcodeScan />} />
            <Route path="/SearchEquip" element={<SearchEquip />} />
          </Routes>
        </Router>
      </>
  );

}

export default App;