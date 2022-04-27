import React from "react";
import { NavLink } from "react-router-dom";

const DemoHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3" to="/">
          Bug Tracker
        </NavLink>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="/about-us">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="/services">
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="/company">
                Company
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="button-wrapper">
            <NavLink className="btn btn-primary me-3" to="/login">
              Sign In
            </NavLink>
            <NavLink className="btn btn-outline-primary" to="/register">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DemoHeader;
