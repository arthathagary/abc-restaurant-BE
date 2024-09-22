const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ["daily", "monthly"],
    required: [true, "Report type is required"],
  },
  reportDate: {
    type: Date,
    required: [true, "Report date is required"],
  },
  totalRevenue: {
    type: Number,
    required: [true, "Total revenue is required"],
  },
  totalOrders: {
    type: Number,
    required: [true, "Total orders are required"],
  },
  totalCustomers: {
    type: Number,
    required: [true, "Total customers are required"],
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
reportSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
