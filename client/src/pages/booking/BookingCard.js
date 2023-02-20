import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import HomeApi from "../api/api";

/**
 *  showing simple info about a company on the list
 */

function BookingCard({
  id,
  username,
  hotel,
  address,
  room,
  room_num,
  start_date,
  end_date,
  price,
}) {
  const navigate = useNavigate();

  // remove saved booking from db
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { id } = evt.target;

    try {
      //const res = await axios.post("/auth/login", credentials);
      //frontend call backend function using this
      const res = await axios.delete(
        `http://localhost:8800/api/booking/${id}`,
        id
      );
      // console.log(`success: ${res}`);

      navigate("/");
    } catch (errors) {
      // console.log(`failed`);
      // debugger;

      return;
    }
    <Link to={`/`}>
      <button>Back to homepage</button>
    </Link>;
  }

  async function handleEdit(evt) {
    evt.preventDefault();
    const { id } = evt.target;

    try {
      const res = await axios.get(
        `http://localhost:8800/api/booking/search/${id}`
      );
      console.log(JSON.stringify(res.data));
      const editRoom = res.data[0].room_number.slice(-5, -2);
      const editStart = res.data[0].booking_start_date;
      const editEnd = res.data[0].booking_end_date;

      // console.log(editData);
      localStorage.setItem("currentRoom", editRoom);
      localStorage.setItem("currentStart", editStart);
      localStorage.setItem("currentEnd", editEnd);

      navigate(`/booking/${id}`);
    } catch (errors) {
      console.log(`failed`);

      return;
    }
  }

  return (
    // renders HTML with each company info
    <div className="JobCard card">
      <div id={id} className="card-body">
        <hr></hr>
        {/* <h2>Booking ID: {id}</h2> */}
        {/* <h2>User Name: {username}</h2> */}
        <p>Hotel Name: {hotel}</p>
        <p>Hotel Address: {address}</p>
        <p>Room Description : {room}</p>
        <p>Room Number : {room_num}</p>
        <p>
          Booking Date: From {start_date} to {end_date}{" "}
        </p>
        <p>Total Price: ${price}</p>

        <p>
          <button
            id={id}
            className="btn danger right"
            onClick={handleSubmit}
            text-align="right"
          >
            {" "}
            DELETE{" "}
          </button>

          <button
            id={id}
            className="btn danger right"
            onClick={handleEdit}
            text-align="right"
          >
            {" "}
            EDIT{" "}
          </button>

          {/* <Link to={`/booking/${id}`}>
            <button>Edit</button>
          </Link> */}
        </p>
      </div>
    </div>
  );
}

export default BookingCard;
