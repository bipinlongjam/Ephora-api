const router = require("express").Router();
const {
  createBooking,
  getBookings
} = require("../controllers/user/bookingController");

router.post("/", createBooking);
router.get("/", getBookings);

module.exports = router;