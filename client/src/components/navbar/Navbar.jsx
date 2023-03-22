import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const logout = (e) => {
  e.preventDefault();

  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "https://orange-booking-kenli.surge.sh/"; //redirect to home page
};

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">OrangeBooking</span>
        </Link>
        {user ? (
          <div>
            Welcome, {user.username}
            <Link to="/booking">
              <button className="navButton">My Booking</button>
            </Link>
            <button className="navButton" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
