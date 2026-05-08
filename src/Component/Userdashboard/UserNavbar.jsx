import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Homescreen/Header";
import 'bootstrap-icons/font/bootstrap-icons.css';
export default function UserNavbar({ loggedInUser }) {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top shadow-sm">
        <div className="container-fluid">

          {/* Optional Brand */}
          

          {/* Hamburger Toggle for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-md-0 gap-3" style={{marginLeft:"100px"}}>
                
              <li className="nav-item">
    <a className="nav-link fw-bold d-flex align-items-center" href="/userorders">
      <i className="bi bi-clock-history me-1"></i> Order History
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link fw-bold d-flex align-items-center" href="/orders">
      <i className="bi bi-bag-fill me-1"></i> Orders
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link fw-bold d-flex align-items-center" href="/">
      <i className="bi bi-box-arrow-right me-1"></i> Logout
    </a>
  </li>
            </ul>
          </div>
        </div>

        {/* Optional Custom Hover */}
        <style>
          {`
            .navbar-nav .nav-link:hover {
              color: #ff6600 !important;
              transition: color 0.3s ease;
            }
          `}
        </style>
      </nav>

      <Header />
    </div>
  );
}