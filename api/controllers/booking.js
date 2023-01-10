import Booking from "../models/Booking.js";

export const createBooking = async (req, res, next) => {
  const newBooking = new Booking(req.body);
  console.log(newBooking);
  try {
    const savedBooking = await newBooking.save();
    // console.log("success after controllers");
    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    console.log(`req.params.id:`);
    console.log(JSON.stringify(req.params.id));
    // const booking = await Booking.findById(req.params.id);

    const booking = await Booking.find(); //working

    console.log(`await DB booking: ${booking}`);
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};
