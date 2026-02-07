// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { getAllItems } from '../../api/itemApi';
// import { addStock } from '../../api/stockApi';

// const AddStock = ({ onSuccess }) => {
//   const { token } = useAuth();
//   const [items, setItems] = useState([]);
//   const [itemId, setItemId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchItems = async () => {
//       const res = await getAllItems(token);
//       if (res.success) setItems(res.data);
//     };
//     fetchItems();
//   }, []);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!itemId || !quantity) return setError('Item and Quantity required');
//     const res = await addStock({ itemId, quantity, notes }, token);
//     if (res.success) {
//       setItemId(''); setQuantity(''); setNotes('');
//       onSuccess();
//     } else setError(res.message);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}>
//       <h3>Add Stock</h3>
//       <select value={itemId} onChange={e=>setItemId(e.target.value)} required>
//         <option value="">Select Item</option>
//         {items.map(it=>(
//           <option key={it._id} value={it._id}>{it.name}</option>
//         ))}
//       </select>
//       <input type="number" value={quantity} min="1" onChange={e=>setQuantity(e.target.value)} required/>
//       <input placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
//       <button type="submit">Add Stock</button>
//       {error && <p style={{color:'red'}}>{error}</p>}
//     </form>
//   );
// };

// export default AddStock;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { getAllItems } from '../../api/itemApi';
// import { addStock } from '../../api/stockApi';

// const AddStock = () => {
//   const { token } = useAuth();
//   const [items, setItems] = useState([]);
//   const [formData, setFormData] = useState({ itemId: '', quantity: '', notes: '' });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchItems = async () => {
//       const res = await getAllItems(token);
//       if (res.success) setItems(res.data);
//     };
//     fetchItems();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await addStock(formData, token);
//       if (res.success) {
//         alert("Stock Updated Successfully! 📦");
//         setFormData({ itemId: '', quantity: '', notes: '' });
//       }
//     } catch (err) { alert("Failed to add stock"); }
//     finally { setLoading(false); }
//   };

//   const inputStyle = "w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none";

//   return (
//     <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         📥 Add Stock Inventory
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-sm font-semibold text-gray-600 mb-2">Select Product</label>
//           <select 
//             className={inputStyle}
//             value={formData.itemId}
//             onChange={e => setFormData({...formData, itemId: e.target.value})}
//             required
//           >
//             <option value="">-- Choose Item --</option>
//             {items.map(it => <option key={it._id} value={it._id}>{it.name}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-600 mb-2">Quantity</label>
//           <input 
//             type="number" className={inputStyle} placeholder="How many units?"
//             value={formData.quantity}
//             onChange={e => setFormData({...formData, quantity: e.target.value})}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-600 mb-2">Notes (Optional)</label>
//           <textarea 
//             className={inputStyle} placeholder="Any specific details..."
//             value={formData.notes}
//             onChange={e => setFormData({...formData, notes: e.target.value})}
//           />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
//         >
//           {loading ? "Updating..." : "Update Stock Inventory"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStock;


// import React, { useState, useEffect } from 'react';
// import { getAllItems } from '../../api/itemApi';
// import { addStock } from '../../api/stockApi';

// const AddStock = () => {
//   const [items, setItems] = useState([]);
//   const [formData, setFormData] = useState({ itemId: '', quantity: '', notes: '' });

//   useEffect(() => {
//     const getItems = async () => {
//       const res = await getAllItems();
//       if (res.success) setItems(res.data);
//     };
//     getItems();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addStock(formData);
//       alert("Stock Updated!");
//     } catch (err) { alert("Error updating stock"); }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-sm">
//       <h2 className="text-2xl font-bold mb-8">📥 Update Stock</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-bold mb-2 uppercase text-slate-400">Select Item</label>
//           <select className="w-full p-4 border rounded-2xl outline-none focus:ring-2 ring-blue-500" 
//             onChange={e => setFormData({...formData, itemId: e.target.value})}>
//             <option value="">-- Select Product --</option>
//             {items.map(it => <option key={it._id} value={it._id}>{it.name}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-bold mb-2 uppercase text-slate-400">Quantity</label>
//           <input type="number" className="w-full p-4 border rounded-2xl" placeholder="Enter amount..." 
//             onChange={e => setFormData({...formData, quantity: e.target.value})} />
//         </div>
//         <button className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black text-lg shadow-lg">UPDATE INVENTORY</button>
//       </form>
//     </div>
//   );
// };

// export default AddStock;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const res = await axios.get('http://localhost:5000/api/items', {
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
      const res = await axios.post('http://localhost:5000/api/stock', formData, {
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