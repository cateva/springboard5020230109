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
    // console.log(`req.params.id:`);
    // console.log(JSON.stringify(req.params.id));

    // const booking = await Booking.findById(req.params.id);

    const booking = await Booking.find({ username: req.params.id }); //working

    // console.log(`await DB booking: ${booking}`);
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const searchBooking = async (req, res, next) => {
  try {
    // console.log(`req.params.id:`);
    // console.log(JSON.stringify(req.params.id));

    // const booking = await Booking.findById(req.params.id);

    const booking = await Booking.find({ _id: req.params.id }); //working

    console.log(`await DB booking: ${booking}`);
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

// const booking = await Booking.deleteOne({ _id: req.body.id });

export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    console.log(`req.params.id:${req.params.id}`);
    console.log(`req.body: `);
    console.log(JSON.stringify(req.body));

    // User.findByIdAndUpdate(user_id, { name: 'Gourav' }
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};
