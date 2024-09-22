const Query = require("../models/Query");

// Create a new query
const createQuery = async (req, res, next) => {
  try {
    const { userId, subject, message } = req.body;

    // Check if all required fields are provided
    if (!(userId && subject && message)) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    console.log("userId", userId)
    console.log("subject", subject)
    console.log("message", message)

    // Create the query in the database
    const query = await Query.create({
      userId,
      subject,
      message,
    });

    console.log("query", query)

    // Return the created query
    res.status(201).json(query);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a query by ID
const getQueryById = async (req, res, next) => {
  console.log("getQueryById")
  try {
    const { id } = req.params;
  console.log("id",id)
    const query = await Query.find({userId:id})
      .populate("userId", "name email");

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.status(200).json(query);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all queries
const getAllQueries = async (req, res, next) => {
  console.log("getAllQueries")
  try {
    const queries = await Query.find()
      .populate({
        path: 'userId',
        select: 'email'
      });

      const transformedQueries = queries.map(query => {
        const userEmail = query.userId ? query.userId.email : null;
        const userId = query.userId ? query.userId._id : null;
  
        return {
          ...query.toObject(),
          userEmail,
          userId
        };
      });

    res.status(200).json(transformedQueries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update a query by ID
const updateQuery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const query = await Query.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.status(200).json(query);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a query by ID
const deleteQuery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = await Query.findByIdAndDelete(id);

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Respond to a query by ID
const respondToQuery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const query = await Query.findById(id);

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    query.response = response;
    query.status = "resolved";
    await query.save();

    res.status(200).json(query);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createQuery,
  getQueryById,
  updateQuery,
  deleteQuery,
  respondToQuery,
  getAllQueries
};
