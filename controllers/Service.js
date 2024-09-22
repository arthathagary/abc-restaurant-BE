const Service = require("../models/Service");

// Create a new service
const createService = async (req, res, next) => {
  try {
    const { name, description, price, duration, category, availability } = req.body;

    // Check if all required fields are provided
    if (!(name && description && price && duration && category)) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Create the service in the database
    const service = await Service.create({
      name,
      description,
      price,
      duration,
      category,
      availability,
    });

    // Return the created service
    res.status(201).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a service by ID
const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a service by ID
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const service = await Service.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a service by ID
const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createService,
  getServiceById,
  updateService,
  deleteService,
};
