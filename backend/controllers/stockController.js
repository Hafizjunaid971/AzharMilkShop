const Stock = require('../models/stock');
const Sale = require('../models/sale');
const Item = require('../models/items');

// Add daily stock
exports.addStock = async (req, res) => {
  try {
    const { itemId, quantity, date, notes } = req.body;

    // Validate required fields
    if (!itemId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide itemId and quantity',
      });
    }

    // Verify item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Create new stock record
    const stock = new Stock({
      itemId,
      quantity,
      date: date || new Date(),
      notes,
    });

    await stock.save();

    res.status(201).json({
      success: true,
      message: 'Stock added successfully',
      data: stock,
    });
  } catch (error) {
    console.error('Error adding stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding stock',
      error: error.message,
    });
  }
};

// Calculate remaining stock for an item
exports.getRemainingStock = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Verify item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Get total stock received
    const stockReceived = await Stock.aggregate([
      { $match: { itemId: require('mongoose').Types.ObjectId(itemId) } },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const totalReceived = stockReceived[0]?.total || 0;

    // Get total stock sold
    const stockSold = await Sale.aggregate([
      {
        $unwind: '$items',
      },
      {
        $match: { 'items.itemId': require('mongoose').Types.ObjectId(itemId) },
      },
      {
        $group: { _id: null, total: { $sum: '$items.quantity' } },
      },
    ]);

    const totalSold = stockSold[0]?.total || 0;

    const remainingStock = totalReceived - totalSold;

    res.status(200).json({
      success: true,
      message: 'Stock calculation successful',
      data: {
        itemId,
        itemName: item.name,
        totalReceived,
        totalSold,
        remainingStock,
      },
    });
  } catch (error) {
    console.error('Error calculating stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating remaining stock',
      error: error.message,
    });
  }
};

// Get all stock records
exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find()
      .populate('itemId', 'name price unit')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: 'Stock records fetched successfully',
      data: stock,
    });
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stock records',
      error: error.message,
    });
  }
};

// Get stock records for specific item
exports.getStockByItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Verify item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    const stock = await Stock.find({ itemId })
      .populate('itemId', 'name price unit')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: 'Stock records fetched successfully',
      data: stock,
    });
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stock records',
      error: error.message,
    });
  }
};

// Get stock for date range
exports.getStockByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide startDate and endDate',
      });
    }

    const stock = await Stock.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate('itemId', 'name price unit')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: 'Stock records fetched successfully',
      data: stock,
    });
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stock records',
      error: error.message,
    });
  }
};

// Delete stock record
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByIdAndDelete(id);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: 'Stock record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stock record deleted successfully',
      data: stock,
    });
  } catch (error) {
    console.error('Error deleting stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting stock record',
      error: error.message,
    });
  }
};
