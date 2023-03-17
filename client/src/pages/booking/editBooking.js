// edit room #, start & end date
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./editBooking.css";
import axios from "axios";
import { Form, useNavigate, useParams } from "react-router-dom";

export default () => {
  const { user } = useContext(AuthContext);
  //   localStorage.removeItem("currentEdit");
  const { data, loading, error } = useFetch(`/booking/${user.username}`);
  const currentRoom = localStorage.getItem("currentRoom");
  const currentStart = localStorage.getItem("currentStart");
  const currentEnd = localStorage.getItem("currentEnd");

  const [room, setRoom] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  let { id } = useParams();

  async function handleClick(e) {
    e.preventDefault();

    // let room_title = room;
    let room_number = room;
    let booking_start_date = JSON.stringify(dates[0].startDate).slice(1, 11);
    let booking_end_date = JSON.stringify(dates[0].endDate).slice(1, 11);

    let updateDb;
    let bookingData = {
      //   room_title: room_title,
      room_number: room_number,
      booking_start_date: booking_start_date,
      booking_end_date: booking_end_date,
    };
    console.log(bookingData);
    try {
      // updateDb = await HomeApi.createBooking(bookingData)
      await axios.put(
        `https://orangebooking2023.herokuapp.com/api/booking/${id}`,
        bookingData
      );
      console.log("success");
    } catch (errors) {
      console.log(errors);
    }
    navigate("/booking");
  }

  return (
    <div className="registerCss">
      <div className="lContainer">
        <form>
          <div className="headerSearchItem">
            Room Number:
            <span className="headerIcon"></span>
            <input
              type="string"
              onChange={(e) => setRoom(e.target.value)}
              className="lsOptionInput"
            />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            Date:
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          {/* <div className="mb-3">
            Start Date:
            <input
              type="text"
              className="form-control"
              placeholder={currentStart}
              // onChange={handleChange}
              id="booking_start_date"
            />
          </div>

          <div className="mb-3">
            End Date:
            <input
              type="text"
              className="form-control"
              placeholder={currentEnd}
              // onChange={handleChange}
              id="booking_end_date"
              // value="phone"
            />
          </div> */}

          <div className="d-grid">
            <Link to="/booking">
              <button className="btn-primary">Go Back</button>
            </Link>
          </div>
          <br></br>
          <div className="d-grid">
            {/* <Link to={`/booking`}> */}
            <button className="btn-primary" onClick={handleClick}>
              Save!
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};
