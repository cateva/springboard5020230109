import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
// const handleLogin = () => {
//   navigate("/hotels", { state: { destination, dates, options } });
// };

const logout = (e) => {
  e.preventDefault();

  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
};

// const editUser = (e) => {
//   e.preventDefault();

//   localStorage.clear();
//   sessionStorage.clear();
//   window.location.reload();
// };
// const checkBookingStatus = (e) => {
//   e.preventDefault();

//   localStorage.clear();
//   sessionStorage.clear();
//   window.location.reload();
// };

const Navbar = () => {
  // const [editMode, setEditMode] = useState(false);
  const { user } = useContext(AuthContext);

  // const changeToFalse = () => {
  //   setEditMode(false);
  // };

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
            {/* <Link
              // changeToFalse={changeToFalse}
              to="/editProfile"
            >
              <button className="navButton">Edit Info</button>
            </Link> */}
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
