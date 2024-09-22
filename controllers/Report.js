const Report = require("../models/Report");

// Create a new report
const createReport = async (req, res, next) => {
  try {
    const { reportType, reportDate, totalRevenue, totalOrders, totalCustomers } = req.body;

    // Check if all required fields are provided
    if (!(reportType && reportDate && totalRevenue && totalOrders && totalCustomers)) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create the report in the database
    const report = await Report.create({
      reportType,
      reportDate,
      totalRevenue,
      totalOrders,
      totalCustomers,
    });

    // Return the created report
    res.status(201).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a report by ID
const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a report by ID
const updateReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const report = await Report.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a report by ID
const deleteReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
};
