// models/Menu.js

const mongoose = require('mongoose');

// Define the schema for menu items
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

// Export the Menu model
module.exports = mongoose.model('Menu', menuSchema);
