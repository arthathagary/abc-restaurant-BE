const Gallery = require("../models/Gallery");

// Create a new gallery item
const createGalleryItem = async (req, res, next) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    // Check if all required fields are provided
    if (!(title && imageUrl && category)) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create the gallery item in the database
    const galleryItem = await Gallery.create({
      title,
      description,
      imageUrl,
      category,
    });

    // Return the created gallery item
    res.status(201).json(galleryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a gallery item by ID
const getGalleryItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.status(200).json(galleryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a gallery item by ID
const updateGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const galleryItem = await Gallery.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!galleryItem) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.status(200).json(galleryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a gallery item by ID
const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const galleryItem = await Gallery.findByIdAndDelete(id);

    if (!galleryItem) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all gallery items
const getAllGalleryItems = async (req, res, next) => {
  console.log("getAllGalleryItems")
  try {
    const galleryItems = await Gallery.find();
    console.log(galleryItems);
    res.status(200).json(galleryItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createGalleryItem,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems
};
