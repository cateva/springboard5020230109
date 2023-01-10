import express from "express";
import Booking from "../models/Booking.js";
import { getBooking, createBooking } from "../controllers/booking.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
// router.post("/", verifyAdmin, createBooking);

router.post("/", createBooking);
router.get("/:id", getBooking);
export default router;
