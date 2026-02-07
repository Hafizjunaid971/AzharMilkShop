const Sale = require('../models/sale');
const Stock = require('../models/stock');
const Item = require('../models/items');
const mongoose = require('mongoose');

// Helper function to calculate remaining stock
// Helper function ko aise update karein
const calculateRemainingStock = async (itemId) => {
  // Convert String ID to MongoDB ObjectId
  const objId = new mongoose.Types.ObjectId(itemId);

  const stockReceived = await Stock.aggregate([
    { $match: { itemId: objId } },
    { $group: { _id: null, total: { $sum: '$quantity' } } },
  ]);

  const stockSold = await Sale.aggregate([
    { $unwind: '$items' },
    { $match: { 'items.itemId': objId } },
    { $group: { _id: null, total: { $sum: '$items.quantity' } } },
  ]);

  const totalReceived = stockReceived[0]?.total || 0;
  const totalSold = stockSold[0]?.total || 0;
  
  return totalReceived - totalSold;
};

// Create sale and update stock
exports.createSale = async (req, res) => {
  try {
    const { items, notes, date } = req.body;

    // 1. Basic Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide at least one item' });
    }

    let totalAmount = 0;
    const validatedItems = [];

    // 2. Loop through items
    for (const item of items) {
      if (!item.itemId || !item.quantity || !item.price) {
        return res.status(400).json({ success: false, message: 'Missing fields in items' });
      }

      const itemExists = await Item.findById(item.itemId);
      if (!itemExists) {
        return res.status(404).json({ success: false, message: `Item ${item.itemId} not found` });
      }

      // 3. Stock Check
      const remainingStock = await calculateRemainingStock(item.itemId);
      if (remainingStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${itemExists.name}. Available: ${remainingStock}`
        });
      }

      validatedItems.push({
        itemId: item.itemId,
        quantity: item.quantity,
        price: item.price,
      });

      totalAmount += item.quantity * item.price;
    }

    // 4. Save Sale Record
    const sale = new Sale({
      items: validatedItems,
      totalAmount,
      date: date || new Date(),
      notes,
    });

    await sale.save();

    res.status(201).json({
      success: true,
      message: 'Sale created successfully! 🔥',
      data: sale,
    });

  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating sale',
      error: error.message,
    });
  }
};
// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('items.itemId', 'name price unit')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: 'Sales fetched successfully',
      data: sales,
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales',
      error: error.message,
    });
  }
};

// Get single sale
exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findById(id).populate('items.itemId', 'name price unit');

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sale fetched successfully',
      data: sale,
    });
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sale',
      error: error.message,
    });
  }
};

// Get sales by date range
exports.getSalesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide startDate and endDate',
      });
    }

    const sales = await Sale.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate('items.itemId', 'name price unit')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: 'Sales fetched successfully',
      data: sales,
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales',
      error: error.message,
    });
  }
};

// Get daily sales total
exports.getDailySalesTotal = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide date',
      });
    }

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const sales = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalAmount' },
          numberOfTransactions: { $sum: 1 },
          totalQuantity: { $sum: { $sum: '$items.quantity' } },
        },
      },
    ]);

    const result = sales[0] || {
      totalSales: 0,
      numberOfTransactions: 0,
      totalQuantity: 0,
    };

    res.status(200).json({
      success: true,
      message: 'Daily sales total calculated successfully',
      date,
      data: result,
    });
  } catch (error) {
    console.error('Error calculating daily sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating daily sales total',
      error: error.message,
    });
  }
};

// Delete sale
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findByIdAndDelete(id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sale deleted successfully',
      data: sale,
    });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting sale',
      error: error.message,
    });
  }
};
