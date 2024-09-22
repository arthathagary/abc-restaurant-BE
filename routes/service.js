const express = require("express");
const { createService, getServiceById, updateService, deleteService } = require("../controllers/Service");

const router = express.Router();

router.post("/services", createService);
router.get("/services/:id", getServiceById);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

module.exports = router;
