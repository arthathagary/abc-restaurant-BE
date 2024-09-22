const express = require("express");
const { createOrder, getOrderById, updateOrder, deleteOrder ,getAllOrders} = require("../controllers/Order");

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router;
