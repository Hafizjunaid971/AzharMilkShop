const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authMiddleware = require('../middleware/authMiddleware');

// All stock routes require authentication
router.use(authMiddleware);

// Add daily stock
router.post('/', stockController.addStock);

// Get all stock records
router.get('/', stockController.getAllStock);

// Get stock by date range
router.get('/range', stockController.getStockByDateRange);

// Get remaining stock for an item
router.get('/remaining/:itemId', stockController.getRemainingStock);

// Get stock records for specific item
router.get('/item/:itemId', stockController.getStockByItem);

// Delete stock record
router.delete('/:id', stockController.deleteStock);

module.exports = router;
