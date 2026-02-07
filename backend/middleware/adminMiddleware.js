const User = require('../models/user');

const adminMiddleware = async (req, res, next) => {
  try {
    // Check if user ID is attached to request (from authMiddleware)
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login first.',
      });
    }

    // Fetch user from database
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }

    // Attach user object to request for use in controllers
    req.user = user;

    next();
  } catch (error) {
    console.error('Error in admin middleware:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization check failed',
      error: error.message,
    });
  }
};

module.exports = adminMiddleware;
