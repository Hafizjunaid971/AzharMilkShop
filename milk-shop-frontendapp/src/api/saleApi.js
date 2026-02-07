const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAllSales = async (token) => {
  const res = await fetch(`${API_URL}/sales`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
export const getSaleById = async (saleId, token) => {
  const res = await fetch(`${API_URL}/sales/${saleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
export const createSale = async (saleData, token) => {
  const res = await fetch(`${API_URL}/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(saleData),
  });
  return res.json();
};