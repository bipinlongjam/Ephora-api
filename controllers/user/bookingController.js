const db = require("../../config/db");

// CREATE BOOKING
exports.createBooking = (req, res) => {
  const { user_id, lab_id, tests } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const total = tests.reduce((sum, t) => sum + t.price, 0);

  db.query(
    "INSERT INTO bookings (user_id, lab_id, otp, total_amount) VALUES (?,?,?,?)",
    [user_id, lab_id, otp, total],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const bookingId = result.insertId;

      const values = tests.map(t => [bookingId, t.test_id, t.price]);

      db.query(
        "INSERT INTO booking_tests (booking_id, test_id, price) VALUES ?",
        [values],
        () => {
          res.json({ bookingId, otp });
        }
      );
    }
  );
};

// GET BOOKINGS
exports.getBookings = (req, res) => {
  db.query(`
    SELECT b.id, b.status, b.total_amount,
           t.name, bt.price
    FROM bookings b
    JOIN booking_tests bt ON b.id = bt.booking_id
    JOIN tests t ON bt.test_id = t.id
  `, (err, result) => {
    res.json(result);
  });
};