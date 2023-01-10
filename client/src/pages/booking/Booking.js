import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./booking.css";
// import "./propertyList.css";

const BookingList = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(`/booking/${user.username}`);

  //   console.log(`client side data: ${data}`);
  //   console.log(JSON.stringify(data));

  return (
    <div className="login">
      <div className="lContainer">
        <h2>User Name: {data[0].username}</h2>
        <h2>Hotel Name: {data[0].hotel_name}</h2>
        <h2>Hotel Address: {data[0].hotel_address}</h2>
        <h2>Room Description : {data[0].room_title}</h2>
        <h2>Room Number : {data[0].room_number.slice(15, 18)}</h2>
        <h2>
          Booking Date: from {data[0].booking_start_date} to{" "}
          {data[0].booking_end_date}
        </h2>
        <h2>Total Price: {data[0].hotel_price}</h2>
        <Link to={`/`}>
          <button>Back to homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default BookingList;
