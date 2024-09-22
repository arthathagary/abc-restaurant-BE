const express = require("express");
const { createReport, getReportById, updateReport, deleteReport } = require("../controllers/Report");

const router = express.Router();

router.post("/reports", createReport);
router.get("/reports/:id", getReportById);
router.put("/reports/:id", updateReport);
router.delete("/reports/:id", deleteReport);

module.exports = router;
