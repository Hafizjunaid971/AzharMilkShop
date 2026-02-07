const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authMiddleware = require('../middleware/authMiddleware');

// All sale routes require authentication
router.use(authMiddleware);

// Create sale
router.post('/', saleController.createSale);

// Get all sales
router.get('/', saleController.getAllSales);

// Get daily sales total
router.get('/daily-total', saleController.getDailySalesTotal);

// Get sales by date range
router.get('/range', saleController.getSalesByDateRange);

// Get single sale by ID
router.get('/:id', saleController.getSaleById);

// Delete sale
router.delete('/:id', saleController.deleteSale);

module.exports = router;
