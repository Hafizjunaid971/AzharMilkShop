// import React, { useEffect, useState } from 'react';
// import Sidebar from '../Sidebar';
// import axiosInstance from '../../api/authApi';
// import ItemList from '../Items/ItemList';
// import SaleList from '../Sales/SaleList';
// import StockList from '../Stock/StockList';
// const AdminDashboard = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchItems = async () => {
//     try {
//       const { data } = await axiosInstance.get('/items');
//       setItems(data.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="dashboard-content">
//         <h2>Admin Dashboard</h2>
//         <ItemList />
//       <StockList />
//       <SaleList />
//         {loading ? (
//           <p>Loading items...</p>
//         ) : (
//           <ul>
//             {items.map(item => (
//               <li key={item._id}>{item.name} - {item.price} per {item.unit}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/authApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalSales: 0,
    lowStock: 0,
    recentItems: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Aapke existing endpoints se data fetch ho raha hai
        const { data } = await axiosInstance.get('/items');
        setStats({
          totalItems: data.data.length,
          totalSales: 15, // Placeholder: Aap isay /sales API se update kar sakte hain
          lowStock: 5,    // Placeholder
          recentItems: data.data.slice(0, 5) // Sirf top 5 items
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full text-blue-600 font-bold">Loading VIP Dashboard...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Admin Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Products */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-[2rem] text-white shadow-lg shadow-blue-200">
          <div className="text-3xl mb-2">📦</div>
          <div className="text-sm opacity-80 uppercase font-bold tracking-wider">Total Products</div>
          <div className="text-4xl font-black mt-1">{stats.totalItems}</div>
        </div>

        {/* Card 2: Sales Today */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-wider">Total Sales</div>
          <div className="text-4xl font-black text-slate-800 mt-1">{stats.totalSales}</div>
        </div>

        {/* Card 3: Stock Alert */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="text-3xl mb-2">⚠️</div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-wider">Low Stock</div>
          <div className="text-4xl font-black text-red-500 mt-1">{stats.lowStock}</div>
        </div>

        {/* Card 4: System Health */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-sm text-slate-400 uppercase font-bold tracking-wider">System Status</div>
          <div className="text-lg font-bold text-green-500 mt-1">Operational</div>
        </div>
      </div>

      {/* Recent Items Table Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Recently Added Items</h3>
          <button className="text-blue-600 font-semibold hover:underline text-sm">View All Items</button>
        </div>
        
        <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-500 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {stats.recentItems.map((item) => (
                <tr key={item._id} className="hover:bg-white transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">{item.price} PKR</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-green-500 font-bold">In Stock</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
