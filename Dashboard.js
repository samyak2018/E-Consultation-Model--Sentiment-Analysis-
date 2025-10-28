// src/components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div id="Dashboard">
       {/* Navbar Section */}
      <header className="navbar-section white-navbar">
        <nav className="navbar">
          <h1 className="navbar-brand">
            <span className="fa fa-book"></span> SentimentAI
          </h1>

          <ul className="nav-links right-side">
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/comments">Comments</a></li>
            <li><a href="/contact" className="btn-pink">Contact</a></li>
          </ul>
        </nav>
      </header>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>

      <h2>Dashboard</h2>
      <p>Welcome to the Sentiment Analysis Dashboard</p>

      <div className="dashboard-links">
        <button onClick={() => navigate("/comments")}>View Comments</button>
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
