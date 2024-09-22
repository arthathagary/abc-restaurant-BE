const express = require("express");
const { createPayment, getPaymentById, updatePayment, deletePayment } = require("../controllers/Payment");

const router = express.Router();

router.post("/payments", createPayment);
router.get("/payments/:id", getPaymentById);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);

module.exports = router;
