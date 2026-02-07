// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { getAllItems } from '../../api/itemApi';
// import AddItem from './AddItem';

// const ItemList = () => {
//   const { token } = useAuth();
//   const [items, setItems] = useState([]);

//   const fetchItems = async () => {
//     const res = await getAllItems(token);
//     if (res.success) setItems(res.data);
//   };

//   useEffect(() => { fetchItems(); }, []);

//   return (
//     <div>
//       <h2>Items</h2>
//       <AddItem onSuccess={fetchItems} />
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Unit</th>
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item._id}>
//               <td>{item.name}</td>
//               <td>{item.price}</td>
//               <td>{item.unit}</td>
//               <td>
//                 <img src={`http://localhost:5000/${item.imageUrl}`} width="50" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemList;


// import React, { useEffect, useState } from 'react';
// import { getAllItems } from '../../api/itemApi';

// const ItemList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await getAllItems();
//       if (res.success) setItems(res.data);
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="border-b border-gray-100">
//             <th className="py-4 px-2 text-gray-400 font-medium uppercase text-sm">Product</th>
//             <th className="py-4 px-2 text-gray-400 font-medium uppercase text-sm">Price</th>
//             <th className="py-4 px-2 text-gray-400 font-medium uppercase text-sm">Unit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
//               <td className="py-4 px-2 font-bold text-gray-700">{item.name}</td>
//               <td className="py-4 px-2 text-blue-600 font-semibold">{item.price} PKR</td>
//               <td className="py-4 px-2"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs uppercase">{item.unit}</span></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ItemList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Items from Backend
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/items', {
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
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
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