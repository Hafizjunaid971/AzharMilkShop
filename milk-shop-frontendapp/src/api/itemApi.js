

import axios from 'axios';

// Ensure the correct API URL is configured in your .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};


export const createItem = async (itemData) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  
  // Append all fields
  formData.append('name', itemData.name);
  formData.append('price', itemData.price);
  formData.append('unit', itemData.unit);
  
  // 'imageUrl' wahi hona chahiye jo backend ke upload.single('imageUrl') mein hai
  if (itemData.imageFile) {
    formData.append('imageUrl', itemData.imageFile); 
  }

  const response = await axios.post(`${API_URL}/items`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Image ke liye ye bohat zaroori hai
    },
  });
  return response.data;
};

// Get all items API (also authenticated)
export const getAllItems = async () => {
  const token = getAuthToken();  // Get token from localStorage

  try {
    const response = await axios.get(`${API_URL}/items`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Send token in Authorization header
      },
    });
    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error fetching items:', error.response ? error.response.data : error.message);
    throw error;
  }
};
