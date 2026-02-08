import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StockList = () => {
  
  const [stocks, setStocks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchStocks = async () => {
    const res = await axios.get(`${API_URL}/stock`, { headers: { Authorization: `Bearer ${token}` }});
    if (res.data.success) setStocks(res.data.data);
  };

  useEffect(() => { fetchStocks(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Stock record delete karein?")) return;
    try {
      await axios.delete(`${API_URL}/stock/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      setStocks(stocks.filter(s => s._id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📥 Stock History</h2>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Item</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(s => (
              <tr key={s._id} className="border-b">
                <td className="p-4 font-bold">{s.itemId?.name}</td>
                <td className="p-4 text-green-600">+{s.quantity}</td>
                <td className="p-4 text-sm text-slate-500">{new Date(s.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:scale-110 transition-all">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StockList;