import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const { user } = useContext(AuthContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const [formData, setFormData] = useState([]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  //handle change . original
  // const handleSelect = (e) => {
  //   const checked = e.target.checked;
  //   const value = e.target.value;
  //   setSelectedRooms(
  //     checked
  //       ? [...selectedRooms, value]
  //       : selectedRooms.filter((item) => item !== value)
  //   );
  // };

  // to be saved
  // "hotelName":"",
  // "date":"",
  // "price":"",
  // "title":"",
  // "roomNumber":""
  //

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setFormData((l) => ({
      ...l,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  //handle submit . ori
  // const handleClick = async () => {
  //   console.log("after reserve, before try");
  //   try {
  //     const res = await Promise.all(
  //       selectedRooms.map((roomId) => {
  //         axios.put(`/rooms/availability/${roomId}`, {
  //           dates: alldates,
  //         });
  //       })
  //     );

  //     console.log(res);

  //     setOpen(false);
  //     navigate("/");
  //     console.log("got data after try");
  //     return res.data;
  //   } catch (err) {}
  // };

  async function handleClick(e) {
    e.preventDefault();

    let roomTitle = localStorage.setItem("roomTitle", data[0].title);
    let roomNumber = localStorage.setItem(
      "roomNumber",
      JSON.stringify(formData)
    );

    // const room_title = localStorage.getItem("room_title");
    // const room_number = localStorage.getItem("room_number");

    // save to database
    let hotel_name = localStorage.hotelName;
    let hotel_address = localStorage.hotelAddress;
    let hotel_price = localStorage.hotelPrice;
    let room_title = localStorage.roomTitle;
    let room_number = localStorage.roomNumber;
    let booking_start_date = localStorage.bookingStartDate.slice(4, 15);
    let booking_end_date = localStorage.bookingEndDate.slice(4, 15);

    let updateDb;
    let bookingData = {
      username: user.username,
      hotel_name: hotel_name,
      hotel_address: hotel_address,
      hotel_price: hotel_price,
      room_title: room_title,
      room_number: room_number,
      booking_start_date: booking_start_date,
      booking_end_date: booking_end_date,
    };
    // console.log(bookingData);
    try {
      // updateDb = await HomeApi.createBooking(bookingData)
      await axios.post(
        "https://orangebooking2023.herokuapp.com/api/booking",
        bookingData
      );
      // console.log("working");
    } catch (errors) {
      console.log(errors);
    }

    //DONT FORGET TO ADD SET OPEN/CLOSE
    navigate("/");
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div
            onChange={(e) => handleSelect(e)}
            className="rItem"
            key={item.number}
          >
            <div className="rItemInfo">
              {/* <div className="rTitle">{item.title}</div> */}

              <div
                value={item.title}
                name="roomTitle"
                onChange={handleSelect}
                className="rTitle"
              >
                {item.title}
              </div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              {/* <div className="rPrice">{item.price}</div> */}
            </div>
            <div
              // onChange={handleSelect}
              // value={formData.roomNumber}
              className="rSelectRooms"
            >
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber.number}
                    name="roomNumber"
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
