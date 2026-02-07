import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSale = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([{ itemId: '', quantity: 1, price: 0 }]);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/items', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) setItems(res.data.data);
      } catch (err) { console.error("Error fetching items:", err); }
    };
    fetchItems();
  }, []);

  const handleAddItemRow = () => {
    setSelectedItems([...selectedItems, { itemId: '', quantity: 1, price: 0 }]);
  };

  const removeItemRow = (index) => {
    const copy = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(copy);
  };

  const handleChange = (index, field, value) => {
    const copy = [...selectedItems];
    if (field === 'itemId') {
      const itemDetail = items.find(it => it._id === value);
      copy[index].price = itemDetail ? itemDetail.price : 0;
      copy[index].itemId = value;
    } else if (field === 'quantity') {
      copy[index].quantity = Number(value);
    }
    setSelectedItems(copy);
  };

  const totalBill = selectedItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Controller expects: { items: [...], notes, date }
      const payload = {
        items: selectedItems,
        notes: notes,
        date: date
      };

      const res = await axios.post('http://localhost:5000/api/sales', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        alert("Sale Created! 💸 Total: " + totalBill + " PKR");
        setSelectedItems([{ itemId: '', quantity: 1, price: 0 }]);
        setNotes('');
      }
    } catch (err) { 
      // Yahan controller ka bheja hua exact error message milega (like "Insufficient stock")
      alert(err.response?.data?.message || "Error creating sale"); 
    }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[2.5rem] shadow-2xl border border-slate-50">
      <div className="flex justify-between items-center mb-8 bg-slate-900 p-8 rounded-[2rem] text-white">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Point of Sale</h2>
          <p className="text-blue-400 text-xs font-bold tracking-widest">BILLING SYSTEM</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payable Amount</p>
          <p className="text-4xl font-black">{totalBill} <span className="text-sm">PKR</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
             <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block ml-2">Sale Date</label>
             <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-blue-500" />
          </div>
        </div>

        {selectedItems.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-end bg-slate-50 p-6 rounded-3xl border border-slate-100 group transition-all">
            <div className="flex-[2]">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Item</label>
              <select 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
                value={item.itemId} 
                onChange={e => handleChange(idx, 'itemId', e.target.value)} 
                required
              >
                <option value="">Select Item</option>
                {items.map(it => <option key={it._id} value={it._id}>{it.name.toUpperCase()}</option>)}
              </select>
            </div>
            <div className="w-24">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Qty</label>
              <input 
                type="number" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold"
                value={item.quantity} min="1" 
                onChange={e => handleChange(idx, 'quantity', e.target.value)} 
                required 
              />
            </div>
            <div className="w-32">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Price</label>
              <input type="text" className="w-full p-4 bg-slate-100 rounded-2xl font-bold text-slate-500" value={item.price} readOnly />
            </div>
            <button type="button" onClick={() => removeItemRow(idx)} className="p-4 text-red-400 hover:text-red-600 font-bold">✕</button>
          </div>
        ))}
        
        <button type="button" onClick={handleAddItemRow} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:bg-slate-50 transition-all">
          + ADD ANOTHER ITEM TO BILL
        </button>

        <textarea 
          className="w-full p-4 bg-slate-50 rounded-2xl font-medium h-20 outline-none" 
          placeholder="Customer details or notes..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />

        <button 
          type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white p-6 rounded-3xl font-black text-xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 mt-4"
        >
          {loading ? "CHECKING STOCK & PROCESSING..." : "COMPLETE SALE & GENERATE BILL"}
        </button>
      </form>
    </div>
  );
};

export default AddSale;