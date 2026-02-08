import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AddStock = () => {
  // --- YE LINE ADD KI HAI (FIX) ---
  const [items, setItems] = useState([
    { _id: '1', name: 'Sample Item', unit: 'liter' } // Dummy initial data crash se bachane ke liye
  ]);
  
  const [formData, setFormData] = useState({ 
    itemId: '', 
    quantity: '', 
    notes: '', 
    date: new Date().toISOString().split('T')[0] 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/items`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data.success && res.data.data.length > 0) {
          setItems(res.data.data); // Asli data yahan save hoga
        }
      } catch (err) {
        console.log("Error fetching items, showing fallback data.");
      }
    };
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Pehle Login Karein!");
        return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/stock`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        alert("Stock added successfully! ✅");
        setFormData({ itemId: '', quantity: '', notes: '', date: new Date().toISOString().split('T')[0] });
      }
    } catch (err) {
      console.error("Submit Error:", err.response?.data);
      alert(err.response?.data?.message || "Error adding stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">ADD STOCK</h2>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Inventory Management</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Select Product</label>
            <select 
              className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700 cursor-pointer"
              value={formData.itemId}
              onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
              required
            >
              <option value="">-- Choose Item --</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name.toUpperCase()} ({item.unit})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Quantity</label>
              <input 
                type="number"
                className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold"
                placeholder="0.00"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Date</label>
              <input 
                type="date"
                className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Notes</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium h-24 resize-none"
              placeholder="e.g. Received from supplier X"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? "SAVING RECORD..." : "CONFIRM STOCK ENTRY 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStock;