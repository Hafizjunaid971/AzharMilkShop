import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AddItem = () => {
  // State ko alag alag rakha hai taake file handle karna asan ho
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('liter');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Pehle product ki image select karein!");

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Pehle login karein!");

      // 1. FormData Object banana hai
      const data = new FormData();
      data.append('name', name);
      data.append('price', price);
      data.append('unit', unit);
      // 'imageUrl' wahi key honi chahiye jo backend ke upload.single('imageUrl') mein hai
      data.append('imageUrl', imageFile); 

      // 2. Axios call (Content-Type ko multipart/form-data rakha hai)
      const res = await axios.post(`${API_URL}/items`, data, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });

      if (res.data.success) {
        alert("Zabardast! Item image ke sath add ho gaya. 🔥");
        // Form reset
        setName('');
        setPrice('');
        setImageFile(null);
        e.target.reset(); // File input reset karne ke liye
      }
    } catch (err) {
      console.error("Error details:", err.response?.data);
      alert(err.response?.data?.message || "Image upload ya item save nahi ho saka");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">✨ Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Product Name</label>
            <input 
              className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold"
              placeholder="e.g. Fresh Milk"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Price (PKR)</label>
            <input 
              type="number"
              className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold"
              placeholder="e.g. 210"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Unit Select */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Unit</label>
            <select 
              className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold cursor-pointer"
              value={unit}
              onChange={e => setUnit(e.target.value)}
            >
              <option value="liter">Liter</option>
              <option value="kg">KG</option>
              <option value="piece">Piece</option>
            </select>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Product Image</label>
            <div className="mt-2 flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm text-slate-500 font-medium">
                    {imageFile ? `✅ ${imageFile.name}` : "Click to upload image"}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={e => setImageFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black shadow-lg hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "UPLOADING TO CLOUDINARY..." : "SAVE PRODUCT 🔥"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;