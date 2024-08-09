const Reservation = require("../models/Reservation");

/**
 * Create a new reservation
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @return {Promise} Resolves when reservation is created and response is sent
 */
const createReservation = async (req, res, next) => {
  // Destructure the request body
  const { userId, serviceId, date, time, guests, specialRequests } = req.body;

  try {
    // Check if all required fields are provided in a single line
    if (!userId || !serviceId || !date || !time || !guests) {
      // Return an error response if any required field is missing
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Create the reservation in the database using create method that accepts an object
    const reservation = await Reservation.create({
      userId,
      serviceId,
      date,
      time,
      guests,
      specialRequests,
    });

    // Return the created reservation
    res.status(201).json(reservation);
  } catch (error) {
    // Log the error once and return a generic error message
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get a reservation by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} Resolves when reservation is retrieved and response is sent.
 */
const getReservationById = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters.
    const { id } = req.params;

    // Retrieve the reservation from the database, including the user and service details.
    const reservation = await Reservation.findById(id)
      .populate("userId", "name email") // Populate the 'userId' field with the 'name' and 'email' fields from the 'User' model.
      .populate("serviceId", "name description"); // Populate the 'serviceId' field with the 'name' and 'description' fields from the 'Service' model.

    // If the reservation is not found, return a 404 error.
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Return the retrieved reservation.
    res.status(200).json(reservation);
  } catch (error) {
    // Log the error and return a generic 500 error.
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Update a reservation by ID
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} Resolves when reservation is updated and response is sent.
 */
const updateReservation = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters.
    const { id } = req.params;

    // Extract the updates from the request body.
    const updates = req.body;

    // Find the reservation by ID and update it with the provided updates.
    // The 'new: true' option returns the updated reservation, rather than the original.
    // The 'runValidators: true' option runs any validation middleware defined in the reservation schema.
    const reservation = await Reservation.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // If the reservation is not found, return a 404 error.
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Return the updated reservation.
    res.status(200).json(reservation);
  } catch (error) {
    // Log the error and return a generic 500 error.
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Delete a reservation by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} Resolves when reservation is deleted and response is sent.
 */
const deleteReservation = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters.
    const { id } = req.params;

    // Find and delete the reservation by ID.
    const reservation = await Reservation.findByIdAndDelete(id);

    // If the reservation is not found, return a 404 error.
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Return a success message.
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    // Log the error and return a generic 500 error.
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
