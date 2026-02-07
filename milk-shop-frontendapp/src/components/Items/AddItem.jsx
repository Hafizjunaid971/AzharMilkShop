

// import React, { useState } from 'react';
// import { createItem } from '../../api/itemApi';  // Make sure your itemApi is correctly imported

// const AddItem = () => {
//   const [name, setName] = useState('');  // State for name
//   const [price, setPrice] = useState('');  // State for price
//   const [unit, setUnit] = useState('');  // State for unit
//   const [imageUrl, setImage] = useState(null);  // State for image file

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();  // Prevent page reload

//     // Check if all required fields are filled
//     if (!name || !price || !unit || !imageUrl) {
//       alert("Please fill all fields including image!");
//       return;
//     }

//     const itemData = {
//       name,
//       price,
//       unit,
//       imageUrl,  // Ensure this is a valid image file (you'll see if it's not because the form won't submit)
//     };

//     try {
//       const result = await createItem(itemData);
//       console.log('Item created:', result);
//     } catch (error) {
//       console.error('Error creating item:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Item</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Item Name"
//           />
//         </div>
//         <div>
//           <label>Price</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder="Price"
//           />
//         </div>
//         <div>
//           <label>Unit</label>
//          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
//   <option value="">Select unit</option>
//   <option value="liter">Liter</option>
//   <option value="ml">ML</option>
//   <option value="kg">KG</option>
//   <option value="gram">Gram</option>
// </select>

//         </div>
//         <div>
//           <label>imageUrl</label>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])} // Make sure this is a file object
//           />
//         </div>
//         <button type="submit">Add Item</button>
//       </form>
//     </div>
//   );
// };

// export default AddItem;



// import { useState } from 'react';
// import { createItem } from '../../api/itemApi';

// const AddItem = () => {
//   const [formData, setFormData] = useState({ name: '', price: '', unit: '', imageUrl: null });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createItem(formData);
//       alert("Item Added Successfully! 🔥");
//     } catch (err) { console.error(err); }
//   };

//   const inputStyle = "w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all";

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-8 rounded-2xl">
//         <div>
//           <label className="block text-sm font-medium mb-1">Item Name</label>
//           <input className={inputStyle} type="text" placeholder="e.g. Fresh Milk" 
//             onChange={e => setFormData({...formData, name: e.target.value})} />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Price</label>
//             <input className={inputStyle} type="number" placeholder="0.00" 
//               onChange={e => setFormData({...formData, price: e.target.value})} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Unit</label>
//             <select className={inputStyle} onChange={e => setFormData({...formData, unit: e.target.value})}>
//               <option value="">Select Unit</option>
//               <option value="kg">Kilogram (KG)</option>
//               <option value="liter">Liter (L)</option>
//             </select>
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Image</label>
//           <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
//             onChange={e => setFormData({...formData, imageUrl: e.target.files[0]})} />
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all pt-4">
//           Save Product
//         </button>
//       </form>
//     </div>
//   );
// };
// export default AddItem;

// import React, { useState, useEffect } from 'react';
// import { createItem, getAllItems } from '../../api/itemApi';

// const AddItem = () => {
//   const [items, setItems] = useState([]);
//   const [formData, setFormData] = useState({ name: '', price: '', unit: '', imageUrl: null });

//   // Load items to show in a table below the form
//   const fetchItems = async () => {
//     const res = await getAllItems();
//     if (res.success) setItems(res.data);
//   };

//   useEffect(() => { fetchItems(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createItem(formData);
//       alert("Item added successfully!");
//       fetchItems(); // List refresh karein
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="space-y-10">
//       {/* Form Section */}
//       <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
//         <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <input className="p-3 border rounded-xl" placeholder="Item Name" onChange={e => setFormData({...formData, name: e.target.value})} />
//           <input className="p-3 border rounded-xl" type="number" placeholder="Price" onChange={e => setFormData({...formData, price: e.target.value})} />
//           <select className="p-3 border rounded-xl" onChange={e => setFormData({...formData, unit: e.target.value})}>
//             <option value="">Select Unit</option>
//             <option value="liter">Liter</option>
//             <option value="kg">KG</option>
//           </select>
//           <input type="file" className="p-2" onChange={e => setFormData({...formData, imageUrl: e.target.files[0]})} />
//           <button className="md:col-span-2 bg-blue-600 text-white p-3 rounded-xl font-bold uppercase tracking-wider">Save Item</button>
//         </form>
//       </div>

//       {/* List Section */}
//       <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
//         <h3 className="text-xl font-bold mb-4">Current Inventory</h3>
//         <table className="w-full">
//           <thead className="text-slate-400 text-sm uppercase">
//             <tr><th className="py-3">Name</th><th className="py-3">Price</th><th className="py-3">Unit</th></tr>
//           </thead>
//           <tbody>
//             {items.map(it => (
//               <tr key={it._id} className="border-t">
//                 <td className="py-4 font-bold">{it.name}</td>
//                 <td className="py-4 text-blue-600">{it.price} PKR</td>
//                 <td className="py-4 uppercase text-xs">{it.unit}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AddItem;

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddItem = () => {
//   const [formData, setFormData] = useState({ name: '', price: '', unit: 'liter' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       // Token check
//       if (!token) return alert("Pehle login karein!");

//       // Backend route: POST /api/items
//       // Hum sirf JSON bhej rahe hain (Bina image ke)
//       const res = await axios.post('http://localhost:5000/api/items', formData, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json' 
//         }
//       });

//       if (res.data.success) {
//         alert("Success! Item add hogaya. Ab ye dropdown mein nazar ayega. 🔥");
//         setFormData({ name: '', price: '', unit: 'liter' });
//       }
//     } catch (err) {
//       console.error("Error details:", err.response?.data);
//       alert(err.response?.data?.message || "Item add nahi ho saka");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
//         <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase">✨ Add New Product</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-xs font-bold text-slate-400 uppercase ml-1">Product Name</label>
//             <input 
//               className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold"
//               placeholder="e.g. Pakola 1L"
//               value={formData.name}
//               onChange={e => setFormData({...formData, name: e.target.value})}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-xs font-bold text-slate-400 uppercase ml-1">Price (PKR)</label>
//             <input 
//               type="number"
//               className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold"
//               placeholder="e.g. 250"
//               value={formData.price}
//               onChange={e => setFormData({...formData, price: e.target.value})}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-xs font-bold text-slate-400 uppercase ml-1">Unit</label>
//             <select 
//               className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold"
//               value={formData.unit}
//               onChange={e => setFormData({...formData, unit: e.target.value})}
//             >
//               <option value="liter">Liter</option>
//               <option value="kg">KG</option>
//               <option value="piece">Piece</option>
//             </select>
//           </div>

//           <button 
//             type="submit" 
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all"
//           >
//             {loading ? "SAVING..." : "ADD ITEM TO SYSTEM"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddItem;


import React, { useState } from 'react';
import axios from 'axios';

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
      const res = await axios.post('http://localhost:5000/api/items', data, {
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