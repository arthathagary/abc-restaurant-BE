const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res, next) => {
  try {
    const { userId, items ,totalAmount } = req.body;

    // Check if all required fields are provided
    if (!(userId && items && totalAmount)) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Create the order in the database
    const order = await Order.create({
      userId,
      items,
      totalAmount,
    });

    // Return the created order
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get an order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("userId",id)

    const order = await Order.find({userId:id})

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an order by ID
const updateOrder = async (req, res, next) => {
  console.log("updateOrder")
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("updates",updates)
    console.log("id",id)
    const order = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: 'userId',
      select: 'email address'
    });

    const transformedOrders = orders.map(order => {
      const userEmail = order.userId ? order.userId.email : null;
      const userId = order.userId ? order.userId._id : null;
      const userAddress = order.userId ? order.userId.address : null;


      return {
        ...order.toObject(),
        userEmail,
        userId,
        userAddress
      };
    });


    res.status(200).json(transformedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAllOrders
};
