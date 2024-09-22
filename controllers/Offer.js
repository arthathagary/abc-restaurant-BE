const Offer = require("../models/Offer");

// Create a new offer
const createOffer = async (req, res, next) => {
  try {
    const { title, description, discountPercentage, validFrom, validUntil } = req.body;

    // Check if all required fields are provided
    if (!(title && discountPercentage && validFrom && validUntil)) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create the offer in the database
    const offer = await Offer.create({
      title,
      description,
      discountPercentage,
      validFrom,
      validUntil,
    });

    // Return the created offer
    res.status(201).json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get an offer by ID
const getOfferById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an offer by ID
const updateOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const offer = await Offer.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an offer by ID
const deleteOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOffer,
  getOfferById,
  updateOffer,
  deleteOffer,
};
