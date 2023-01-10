import { Link } from "react-router-dom";
import "./searchItem.css";
import useFetch from "../../hooks/useFetch";

const SearchItem = ({ item, hotelId }) => {
  const { data } = useFetch(`/hotels/${hotelId}`);
  async function handleClick(e) {
    console.log("it's working");
    // e.preventDefault();

    // localStorage.setItem("hotel_name", data);
    // console.log("hotel_name");
    // localStorage.setItem("room_title", data[0].title);
    // localStorage.setItem("room_number", JSON.stringify(formData));

    // const room_title = localStorage.getItem("room_title");
    // const room_number = localStorage.getItem("room_number");
  }

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <Link
          onChange={handleClick}
          style={{ textDecoration: "none" }}
          to={`/hotels/${item._id}`}
        >
          <h1 className="siTitle">{item.name}</h1>
        </Link>
        <span className="siDistance">{item.distance} miles from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button onChange={handleClick} className="siCheckButton">
              See Availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
