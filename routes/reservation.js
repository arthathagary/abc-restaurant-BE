// reservation.js
const express = require("express");
const {
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getAllReservation
} = require("../controllers/Reservation");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

router.post("/reservations", createReservation);
router.get("/reservations/:id", getReservationById);
router.get("/reservations", getAllReservation);

router.put("/reservations/:id", updateReservation);
router.delete("/reservations/:id", authenticateJWT, deleteReservation);

module.exports = router;
