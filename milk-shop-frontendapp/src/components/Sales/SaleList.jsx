import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('token');

  const fetchSales = async () => {
    const res = await axios.get(`${API_URL}/sales`, { headers: { Authorization: `Bearer ${token}` }});
    if (res.data.success) setSales(res.data.data);
  };

  useEffect(() => { fetchSales(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Sale record delete karein?")) return;
    try {
      await axios.delete(`${API_URL}/sales/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      setSales(sales.filter(s => s._id !== id));
    } catch (err) { alert("Error deleting sale"); }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">💸 Sales Records</h2>
      <div className="space-y-4">
        {sales.map(sale => (
          <div key={sale._id} className="bg-white p-6 rounded-[2rem] border shadow-sm flex justify-between items-center hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(sale.date).toLocaleString()}</p>
              <h4 className="font-black text-slate-800">TOTAL: {sale.totalAmount} PKR</h4>
              <p className="text-sm text-slate-500">{sale.items.map(i => i.itemId?.name).join(', ')}</p>
            </div>
            <button onClick={() => handleDelete(sale._id)} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SaleList;