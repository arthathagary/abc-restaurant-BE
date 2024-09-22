const express = require("express");
const { createGalleryItem, getGalleryItemById, updateGalleryItem, deleteGalleryItem ,getAllGalleryItems} = require("../controllers/Gallery");

const router = express.Router();

router.post("/gallery", createGalleryItem);
router.get("/gallery", getAllGalleryItems);
router.get("/gallery/:id", getGalleryItemById);
router.put("/gallery/:id", updateGalleryItem);
router.delete("/gallery/:id", deleteGalleryItem);

module.exports = router;
