const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    maxlength: [150, "Subject cannot exceed 150 characters"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    maxlength: [1000, "Message cannot exceed 1000 characters"],
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved", "closed"],
    default: "open",
  },
  response: {
    type: String,
    maxlength: [1000, "Response cannot exceed 1000 characters"],
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
querySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
