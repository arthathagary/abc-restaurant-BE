// controllers/menuController.js

const Menu = require('../models/Menu');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new menu item (Admin only)
exports.createMenuItem = async (req, res) => {
  try {
    const newMenuItem = new Menu(req.body);
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing menu item (Admin only)
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a menu item (Admin only)
exports.deleteMenuItem = async (req, res) => {
  console.log('deleteMenuItem');
  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
