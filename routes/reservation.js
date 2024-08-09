// reservation.js
const express = require("express");
const {
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/Reservation");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

router.post("/reservations", authenticateJWT, createReservation);
router.get("/reservations/:id", authenticateJWT, getReservationById);
router.put("/reservations/:id", authenticateJWT, updateReservation);
router.delete("/reservations/:id", authenticateJWT, deleteReservation);

module.exports = router;
