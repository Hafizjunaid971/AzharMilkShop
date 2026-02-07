const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const stockRoutes = require('./routes/stockRoutes');
const saleRoutes = require('./routes/saleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to MERN Backend Server');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/sales', saleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('FULL ERROR OBJECT:', err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    success: false,
    message: err?.message || 'Unknown server error',
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
