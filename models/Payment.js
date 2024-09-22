const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "Order ID is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
  },
  method: {
    type: String,
    enum: ["credit_card", "debit_card", "paypal", "cash", "bank_transfer"],
    required: [true, "Payment method is required"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
    unique: true,
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
paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
