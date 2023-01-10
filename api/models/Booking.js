import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  hotel_address: {
    type: String,
    required: true,
  },
  hotel_price: {
    type: String,
    required: false,
  },
  room_title: {
    type: String,
    required: false,
  },
  room_number: {
    type: String,
    required: true,
  },
  booking_start_date: {
    type: String,
    required: false,
  },
  booking_end_date: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Booking", BookingSchema);
