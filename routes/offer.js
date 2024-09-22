const express = require("express");
const { createOffer, getOfferById, updateOffer, deleteOffer } = require("../controllers/Offer");

const router = express.Router();

router.post("/offers", createOffer);
router.get("/offers/:id", getOfferById);
router.put("/offers/:id", updateOffer);
router.delete("/offers/:id", deleteOffer);

module.exports = router;
