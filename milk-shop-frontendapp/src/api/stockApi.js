import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Add new stock
export const addStock = async (stockData) => {
  const response = await axios.post(`${API_URL}/stock`, stockData);
  return response.data;
};

// Get all stock records
export const getAllStock = async () => {
  const response = await axios.get(`${API_URL}/stock`);
  return response.data;
};

// Get stock for a specific item
export const getStockByItem = async (itemId) => {
  const response = await axios.get(`${API_URL}/stock/item/${itemId}`);
  return response.data;
};

// Get stock by date range
export const getStockByDateRange = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/stock`, {
    params: { startDate, endDate },
  });
  return response.data;
};

// Delete stock record
export const deleteStock = async (id) => {
  const response = await axios.delete(`${API_URL}/stock/${id}`);
  return response.data;
};
