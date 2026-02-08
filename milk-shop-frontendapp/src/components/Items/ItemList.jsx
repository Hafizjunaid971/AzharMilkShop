

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Items from Backend
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/items`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 2. Delete Item Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(item => item._id !== id));
      alert("Item Deleted! 🗑️");
    } catch (err) {
      alert("Delete failed!");
    }
  };

  if (loading) return <div className="text-center mt-20 font-bold animate-bounce text-blue-600">LOADING YOUR INVENTORY... 🚀</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter">OUR PRODUCTS <span className="text-blue-600">.</span></h2>
        <span className="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest">Total: {items.length} Items</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-slate-50 rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No products found in database</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item._id} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-50 border-b-4 border-b-blue-500">
              
              {/* Product Image */}
              <div className="h-64 overflow-hidden relative bg-slate-100">
                <img 
                  src={item.imageUrl || "https://via.placeholder.com/300"} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-600 shadow-sm">
                  {item.unit}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-800 uppercase truncate">{item.name}</h3>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</p>
                    <p className="text-2xl font-black text-slate-900">{item.price} <span className="text-sm font-medium">PKR</span></p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;