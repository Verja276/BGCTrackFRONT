import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginHome from "./LoginHome";
import Signup from "./Signup";


function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<LoginHome />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </Router>
      </>
  );
  
}

export default App;