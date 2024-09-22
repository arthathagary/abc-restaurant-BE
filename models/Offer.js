const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  discountPercentage: {
    type: Number,
    required: [true, "Discount percentage is required"],
    min: [0, "Discount percentage cannot be less than 0"],
    max: [100, "Discount percentage cannot be more than 100"],
  },
  validFrom: {
    type: Date,
    required: [true, "Valid from date is required"],
  },
  validUntil: {
    type: Date,
    required: [true, "Valid until date is required"],
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
offerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
