// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Component imports
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword"; 
import Dashboard from "./components/Dashboard";
import CommentList from "./components/CommentList";
import CommentDetail from "./components/CommentDetail";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/comments" element={<CommentList />} />
          <Route path="/comments/:id" element={<CommentDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
