// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Component imports
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword"; 
import EConsultationDashboard from "./components/EConsultationDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/* Home Page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/eConsultationDashboard" element={<EConsultationDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
