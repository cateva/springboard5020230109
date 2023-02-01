import React, { Component } from "react";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      // console.log("before axios");
      // console.log(`credentials: ${credentials}`);
      // console.log(JSON.stringify(credentials));
      // console.log(`${credentials.hash}`);

      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        credentials
      );

      //
      // console.log(res);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      // console.log("yes");
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      // console.log("no");
    }
  };

  // const handleClick = async (e) => {
  //   let copy = [...this.state.tasks];
  //   copy.splice(id,1);
  //   this.

  // }

  return (
    <div className="registerCss">
      <div className="lContainer">
        <form>
          <h3>Sign Up</h3>
          <div className="mb-3">
            {/* <label>Username</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              id="username"
            />
          </div>
          <div className="mb-3">
            {/* <label>Email address</label> */}
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              id="email"
            />
          </div>
          <div className="mb-3">
            {/* <label>Password</label> */}
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              id="password"
            />
          </div>
          <div className="mb-3">
            {/* <label>Country</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              onChange={handleChange}
              id="country"
            />
          </div>
          <div className="mb-3">
            {/* <label>City</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="City"
              onChange={handleChange}
              id="city"
            />
          </div>
          <div className="mb-3">
            {/* <label>Phone</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              onChange={handleChange}
              id="phone"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn-primary" onClick={handleClick}>
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
