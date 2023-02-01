import express from "express";
import Booking from "../models/Booking.js";
import {
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  searchBooking,
} from "../controllers/booking.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
// router.post("/", verifyAdmin, createBooking);

router.post("/", createBooking);
router.get("/:id", getBooking);
router.get("/search/:id", searchBooking);
router.delete("/:id", deleteBooking);
router.put("/:id", updateBooking);
export default router;
