import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./booking.css";
import BookingCard from "./BookingCard.js";
// import "./propertyList.css";

const BookingList = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(`/booking/${user.username}`);

  return (
    <div className="login">
      <div className="lContainer">
        {data.length > 0 ? (
          <div>
            <h2>{data[0].username}'s booking:</h2>
            {data.map((b) => (
              <BookingCard
                id={b._id}
                username={b.username}
                hotel={b.hotel_name}
                address={b.hotel_address}
                room={b.room_title}
                room_num={b.room_number}
                start_date={b.booking_start_date}
                end_date={b.booking_end_date}
                price={b.hotel_price}
              />
            ))}
          </div>
        ) : (
          data.length
        )}

        {/* {data.length > 0 ? (
          <div>
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
          </div>
        ) : (
          data.length
        )}
        
        <button>Update My Booking</button>
        <button>Delete My Booking</button> */}

        <Link to={`/`}>
          <button>Back to homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default BookingList;
