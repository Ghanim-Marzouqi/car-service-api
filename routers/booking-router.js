const express = require("express");
const controller = require("../controllers/booking-controller");

const router = express.Router();

router.post("/booking", controller.createBooking);
router.put("/booking/:id", controller.updateBooking);
router.delete("/booking/:id", controller.deleteBooking);
router.get("/booking/:id", controller.getBookingById);
router.post("/bookings", controller.getAllBookings);

module.exports = router;