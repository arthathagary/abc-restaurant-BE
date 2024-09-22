const Payment = require("../models/Payment");

// Create a new payment
const createPayment = async (req, res, next) => {
  try {
    const { orderId, userId, amount, method, transactionId } = req.body;

    // Check if all required fields are provided
    if (!(orderId && userId && amount && method && transactionId)) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Create the payment in the database
    const payment = await Payment.create({
      orderId,
      userId,
      amount,
      method,
      transactionId,
    });

    // Return the created payment
    res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Transaction ID already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get a payment by ID
const getPaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id)
      .populate("orderId", "totalAmount orderStatus")
      .populate("userId", "name email");

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a payment by ID
const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const payment = await Payment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
