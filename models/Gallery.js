const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  category: {
    type: String,
    enum: ["food", "ambience", "events", "staff"],
    required: [true, "Category is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update 'updatedAt' field before saving
gallerySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
