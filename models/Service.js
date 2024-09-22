const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
    maxlength: [100, "Service name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Service description is required"],
    maxlength: [500, "Service description cannot exceed 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Service price is required"],
  },
  duration: {
    type: Number, // in minutes
    required: [true, "Service duration is required"],
  },
  category: {
    type: String,
    required: [true, "Service category is required"],
    enum: ["dine-in", "delivery", "catering", "event"],
  },
  availability: {
    type: Boolean,
    default: true,
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
serviceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
