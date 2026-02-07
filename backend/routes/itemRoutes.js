const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public route - Get all items
router.get('/', itemController.getAllItems);

// Public route - Get single item by ID
router.get('/:id', itemController.getItemById);

// Protected routes - Admin only
router.post('/', authMiddleware, adminMiddleware, upload.single('imageUrl'), itemController.createItem);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('imageUrl'), itemController.updateItem);
router.delete('/:id', authMiddleware, adminMiddleware, itemController.deleteItem);

module.exports = router;
