// routes/menuRoutes.js

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/Menu');
const { isAdmin, isAuthenticated } = require('../middleware/authMiddleware');

// Get all menu items
router.get('/menu', menuController.getAllMenuItems);

// Get menu item by ID
router.get('/:id', menuController.getMenuItemById);

// Create a new menu item (Admin only)
// router.post('/', isAuthenticated, isAdmin, menuController.createMenuItem);
router.post('/menu', menuController.createMenuItem);


// Update a menu item (Admin only)
router.put('/:id', isAuthenticated, isAdmin, menuController.updateMenuItem);

// Delete a menu item (Admin only)
// router.delete('/:id', isAuthenticated, isAdmin, menuController.deleteMenuItem);
router.delete('/menu/:id', menuController.deleteMenuItem);


module.exports = router;
