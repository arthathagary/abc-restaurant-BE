// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'Admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
