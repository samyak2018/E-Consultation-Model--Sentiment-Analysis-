import React, { useState } from "react";
import {
  FaUsers,
  FaDatabase,
  FaChartPie,
  FaBell,
  FaCog,
  FaTrash,
  FaEdit,
  FaUpload,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: "Ajay", email: "ajaychaudhari0559@gmail.com", role: "Admin" },
    { id: 2, name: "Rohit", email: "rohit45@gmail.com", role: "Analyst" },
  ]);
  const [datasets, setDatasets] = useState([
    {
      id: 1,
      name: "sentiment_dataset.csv",
      uploadedBy: "Rohit",
      date: "2025-11-02",
      status: "Approved",
    },
     {
      id: 2,
      name: "test.csv",
      uploadedBy: "Rohit",
      date: "2025-11-02",
      status: "Approved",
    },
  ]);
  const [newNotification, setNewNotification] = useState("");

  const handleDeleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const handleDeleteDataset = (id) =>
    setDatasets(datasets.filter((d) => d.id !== id));

  const handleAddNotification = () => {
    if (newNotification.trim() === "") return;
    setNotifications([
      ...notifications,
      { id: Date.now(), message: newNotification },
    ]);
    setNewNotification("");
  };

  return (
    <div className="admin-dashboard">
      {/* === Top Navbar === */}
      <header className="top-navbar">
        <div className="nav-left">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}></div>
        <div className="brand">MCA21 <small style={{ color: "white", opacity: 0.95 }}>e-Consultation</small></div>
          <nav className="nav-links">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={activeTab === "datasets" ? "active" : ""}
              onClick={() => setActiveTab("datasets")}
            >
              Datasets
            </button>
            <button
              className={activeTab === "notifications" ? "active" : ""}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="nav-right">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="profile">
            <FaUserCircle className="profile-icon" />
            <span>Admin</span>
          </div>
        </div>
      </header>

      {/* === Main Content === */}
      <main className="main-content">
        {activeTab === "overview" && (
          <section>
            <h1>System Overview</h1>
            <div className="cards-grid">
              <div className="card">
                <FaUsers className="icon users" />
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
              <div className="card">
                <FaDatabase className="icon datasets" />
                <h3>Datasets</h3>
                <p>{datasets.length}</p>
              </div>
              <div className="card">
                <FaChartPie className="icon analyses" />
                <h3>Analyses</h3>
                <p>4</p>
              </div>
              <div className="card">
                <FaBell className="icon notifications" />
                <h3>Notifications</h3>
                <p>{notifications.length}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "users" && (
          <section>
            <h1>User Management</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <FaEdit className="action edit" />
                      <FaTrash
                        className="action delete"
                        onClick={() => handleDeleteUser(u.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "datasets" && (
          <section>
            <h1>Dataset Management</h1>
            <div className="upload-box">
              <input type="file" accept=".csv" />
              <button>
                <FaUpload /> Upload Dataset
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>Uploaded By</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.uploadedBy}</td>
                    <td>{d.date}</td>
                    <td>{d.status}</td>
                    <td>
                      <FaCheck className="action approve" />
                      <FaTimes
                        className="action reject"
                        onClick={() => handleDeleteDataset(d.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "notifications" && (
          <section>
            <h1>Notifications</h1>
            <div className="notif-input">
              <input
                type="text"
                placeholder="Write a message..."
                value={newNotification}
                onChange={(e) => setNewNotification(e.target.value)}
              />
              <button onClick={handleAddNotification}>Send</button>
            </div>
            <div className="notif-list">
              {notifications.length === 0 ? (
                <p>No notifications yet.</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    {n.message}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section>
            <h1>Admin Settings</h1>
            <p>Manage your profile, password, and preferences here.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
