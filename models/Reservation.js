const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  date: {
    type: Date,
    required: [true, "Reservation date is required"],
  },
  time: {
    type: String,
    required: [true, "Reservation time is required"],
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
  guests: {
    type: Number,
    required: [true, "Number of guests is required"],
  },
  specialRequests: {
    type: String,
    maxlength: [500, "Special requests cannot exceed 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update 'updatedAt' field before saving
reservationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
