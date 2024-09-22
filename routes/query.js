const express = require("express");
const { createQuery, getQueryById, updateQuery, deleteQuery, respondToQuery ,getAllQueries} = require("../controllers/Query");

const router = express.Router();

router.post("/queries", createQuery);
router.get("/queries", getAllQueries);
router.get("/queries/:id", getQueryById);
router.put("/queries/:id", updateQuery);
router.delete("/queries/:id", deleteQuery);
router.post("/queries/:id/respond", respondToQuery);

module.exports = router;
