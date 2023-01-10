import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default () => {
  useEffect(() => {
    const editProfile = () => {};
  }, []);

  return (
    <div className="registerCss">
      <div className="lContainer">
        <form>
          <div className="d-grid">
            <Link to="/">
              <button className="btn-primary">Go Back</button>
            </Link>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="New Username"
              // onChange={}
              id="username"
              // value="username"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="New Country"
              // onChange={handleChange}
              id="country"
              // value="country"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="New City"
              // onChange={handleChange}
              id="city"
              // value="city"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="New Phone"
              // onChange={handleChange}
              id="phone"
              // value="phone"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              // onChange={handleChange}
              id="password"
              // value="password"
            />
          </div>

          <div className="d-grid">
            <button
              className="btn-primary"
              // onClick={handleClick}
            >
              Submit!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
