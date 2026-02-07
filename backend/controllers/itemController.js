const Item = require('../models/items');

// Create item with image upload
exports.createItem = async (req, res) => {
  try {
    const { name, price, unit } = req.body;
    
    // Cloudinary ka URL yahan se uthayen
    const imageUrl = req.file ? req.file.path : "https://via.placeholder.com/150";

    if (!name || !price || !unit) {
      return res.status(400).json({ success: false, message: 'Fields missing!' });
    }

    const item = new Item({ name, price, unit, imageUrl });
    await item.save();

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    if (items.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No items found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Items fetched successfully',
      data: items,
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message,
    });
  }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item fetched successfully',
      data: item,
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message,
    });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit } = req.body;
    const imageUrl = req.file?.path;

    const updateData = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (unit) updateData.unit = unit;
 if (imageUrl) updateData.imageUrl = imageUrl;

    const item = await Item.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: item,
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message,
    });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: item,
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message,
    });
  }
};
