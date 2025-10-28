// src/components/Contact.js
import React, { useState, useEffect } from "react";
import "../assets/css/style-starter.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  // Load Google Fonts dynamically
  useEffect(() => {
    const fonts = [
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap",
    ];
    fonts.forEach((href) => {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div id="contact" className={darkMode ? "dark-mode" : ""}>

     {/* Theme + Button + Footer Styles */}
      <style>
        {`
          :root[data-theme='light'] {
            --bg-color: #ffffff;
            --text-color: #000000;
            --navbar-bg: #ffffff;
          }
          :root[data-theme='dark'] {
            --bg-color: #121212;
            --text-color: #f0f0f0;
            --navbar-bg: #1f1f1f;
          }

          body, .landing-container {
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.4s, color 0.4s;
          }

          header.navbar-section {
            background-color: var(--navbar-bg) !important;
          }

          .nav-link, .navbar-brand {
            color: var(--text-color) !important;
            transition: color 0.3s ease;
          }

          .nav-link:hover {
            color: #00bfff !important;
          }

          .nav-link.active-link {
            color: #00bfff !important;
            font-weight: 600;
            border-bottom: 2px solid #00bfff;
          }

          /* Buttons */
          .btn-style {
            background-color: #FE01B1 !important;
            border-color: #FE01B1 !important;
            color: #fff !important;
            font-weight: 500;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease-in-out;
          }
          .btn-style:hover {
            background-color: #00bfff !important;
            border-color: #00bfff !important;
            color: #fff !important;
            box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
            transform: translateY(-2px);
          }

          /* Footer styles */
          footer, .footer-29, .w3l-footer-29-main {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
          }
          .footer-29 h2, .footer-29 h6, .footer-29 p, .footer-29 a {
            color: #fff !important;
          }
          .footer-29 a:hover {
            color: #ff6b81 !important;
          }

          /* Social icons with brand logos */
          .main-social-footer-29 a {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            margin-right: 10px;
            color: #fff;
            font-size: 18px;
            transition: all 0.3s ease;
          }
          .main-social-footer-29 a.facebook { background-color: #3b5998; }
          .main-social-footer-29 a.twitter { background-color: #1da1f2; }
          .main-social-footer-29 a.instagram { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); }
          .main-social-footer-29 a.google-plus { background-color: #db4437; }
          .main-social-footer-29 a.linkedin { background-color: #0077b5; }
          .main-social-footer-29 a:hover {
            transform: translateY(-3px);
            opacity: 0.9;
          }
        `}
      </style>

      {/* Navbar Section */}
      <header className="navbar-section white-navbar" id="site-header" style={{ minHeight: "65px" }}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark stroke" style={{ padding: "0.6rem 0.8rem" }}>
            <h1 className="navbar-brand" style={{ fontSize: "1.8rem", marginRight: "1.5rem" }}>
              <span className="fa fa-book"></span> SentimentAI
            </h1>

            <button
              className="navbar-toggler collapsed bg-gradient"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
              <span className="navbar-toggler-icon fa icon-close fa-times"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto" style={{ gap: "1.3rem", fontSize: "1.1rem" }}>
                {["Home", "Login", "Dashboard", "Comments"].map((item, index) => (
                  <li key={index} className="nav-item">
                    <a
                      className="nav-link"
                      href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                      onClick={(e) => {
                        document.querySelectorAll(".nav-link").forEach((link) =>
                          link.classList.remove("active-link")
                        );
                        e.target.classList.add("active-link");
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="nav-item mr-2">
                  <a href="/contact" className="btn btn-primary register d-lg-block btn-style">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="mobile-position" style={{ marginLeft: "20px" }}>
              <label className="theme-selector" style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  id="themeToggle"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <i className="gg-sun"></i>
                <i className="gg-moon"></i>
              </label>
            </div>
          </nav>
        </div>
      </header>

      {/* ===== Contact Info & Form Section ===== */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Details */}
            <div className="contact-details">
              <h3>Get in Touch</h3>
              <p>Consectetur adipisicing elit. Lorem ipsum dolor sit amet.</p>

              <div className="contact-item">
                <h6>Address:</h6>
                <p>
                  Ministry of Corporate Affairs, <br />
                  Delhi, India.
                </p>
              </div>

              <div className="contact-item">
                <h6>Contact:</h6>
                <p>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </p>
                <p>
                  <a href="tel:+919856543212">+91 98565 43212</a>
                </p>
              </div>

              <div className="contact-item">
                <h6>Email:</h6>
                <p>
                  <a href="mailto:support@sentimentai.gov.in">
                    support@sentimentai.gov.in
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                ></textarea>
                <button type="submit" className="btn-contact">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-iframe">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.276373081174!2d77.206882!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3ef74a37f3d%3A0x18dc8c30e2a58f8a!2sMinistry%20of%20Corporate%20Affairs%2C%20Delhi!5e0!3m2!1sen!2sin!4v1698048888888!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, pointerEvents: "none" }}
              allowFullScreen
              loading="lazy"
              title="Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ===== Footer Section ===== */}
      <section className="w3l-footer-29-main">
        <div className="footer-29 py-5">
          <div className="container">
            <div className="grid-col-4 footer-top-29">
              <div className="footer-list-29 footer-1">
                <h2 className="footer-title-29">About Us</h2>
                <p className="para">
                  SentimentAI enables ministries and organizations to process
                  public opinions efficiently, applying AI-based sentiment and
                  summarization to improve governance and decision-making.
                </p>
                <div className="main-social-footer-29">
                  <a href="#facebook" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#twitter" className="twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#instagram" className="instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#google-plus" className="google-plus">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#linkedin" className="linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>

              <div className="footer-list-29 footer-2">
                <ul>
                  <h6 className="footer-title-29">Latest News</h6>
                  <li>
                    <a href="#pages">AI Sentiment Engine Deployed</a>
                    <h5><a href="#pages">by Admin</a></h5>
                  </li>
                  <li>
                    <a href="#pages">New Dashboard Launched</a>
                    <h5><a href="#pages">by Admin</a></h5>
                  </li>
                  <li>
                    <a href="#pages">Policy Impact Insights</a>
                    <h5><a href="#pages">by Admin</a></h5>
                  </li>
                </ul>
              </div>

              <div className="footer-list-29 footer-3">
                <div className="properties">
                  <h6 className="footer-title-29">Contact Us</h6>
                  <ul>
                    <li>
                      <p>
                        <span className="fa fa-map-marker"></span> Ministry of
                        Corporate Affairs, <br />
                        Delhi, India.
                      </p>
                    </li>
                    <li>
                      <a href="tel:+91-9876543210">
                        <span className="fa fa-phone"></span> +(91)-98765 43210
                      </a>
                    </li>
                    <li>
                      <a href="mailto:support@sentimentai.gov.in" className="mail">
                        <span className="fa fa-envelope-open-o"></span>{" "}
                        support@sentimentai.gov.in
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-list-29 footer-4">
                <ul>
                  <h6 className="footer-title-29">Useful Links</h6>
                  <li><a href="#url">Dashboard</a></li>
                  <li><a href="#url">Reports</a></li>
                  <li><a href="#url">AI Models</a></li>
                  <li><a href="#url">Privacy Policy</a></li>
                  <li><a href="#url">Help Center</a></li>
                </ul>
              </div>
            </div>

            <div className="bottom-copies row">
              <p className="copy-footer-29 col-lg-8">
                © 2025 SentimentAI. All rights reserved | Designed by Team PraGyan
              </p>
              <ul className="list-btm-29 col-lg-4">
                <li><a href="#link">Privacy policy</a></li>
                <li><a href="#link">Terms of service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
