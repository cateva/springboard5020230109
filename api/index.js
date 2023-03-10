import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingRoute from "./routes/booking.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import Hotel from "./models/Hotel.js";
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://orange-booking-kenli.surge.sh",
};
app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();

// Define the API URL
const apiUrl = "https://orangebooking2023.herokuapp.com/api";

// Make a GET request to the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Handle the API response
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });

const connect = async () => {
  //initial connection
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB is disconnected");
});

// app.get("/", (req,res)=>{ self test
//     res.send("hihi")
// });

//middlewares
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/booking", bookingRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("connected to backend ${process.env.PORT}, GREAT JOB!!! ");
});
