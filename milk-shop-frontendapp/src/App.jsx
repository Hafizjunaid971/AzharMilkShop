// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext.jsx';
// import AppRoutes from './routes/TempAppRoute.jsx';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppRoutes />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import UserDashboard from './components/Dashboard/UserDashboard.jsx';
import AddItem from './components/Items/AddItem.jsx';
import AddStock from './components/Stock/AddStock.jsx';
import AddSale from './components/Sales/AddSale.jsx';
import SaleList from './components/Sales/SaleList.jsx';
import StockList from './components/Stock/StockList.jsx';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import ItemList from './components/Items/ItemList.jsx';
const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Admin Routes (Nested inside DashboardLayout) */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute adminOnly>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminDashboard />} /> {/* /admin */}
      <Route path="items" element={<AddItem />} />   {/* /admin/items */}
      <Route path="items-list" element={<ItemList />} />   {/* /admin/items-list */}
      <Route path="stock" element={<AddStock />} />  {/* /admin/stock */}
      <Route path="sales" element={<AddSale />} />   {/* /admin/sales */}
      <Route path="sales-list" element={<SaleList />} />   {/* /admin/sales-list */}
      <Route path="stock-list" element={<StockList />} />   {/* /admin/stock-list */}
    </Route>

    {/* User/Staff Routes */}
    <Route
      path="/user"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<UserDashboard />} /> {/* /user */}
      <Route path="sales" element={<AddSale />} />  {/* /user/sales */}
      <Route path="items" element={<AddItem />} />  {/* /user/items */}
      <Route path="stock" element={<AddStock />} />  {/* /user/stock */}
      <Route path="items-list" element={<ItemList />} />  {/* /user/items-list */}
      <Route path="sales-list" element={<SaleList />} />   {/* /admin/sales-list */}
      <Route path="stock-list" element={<StockList />} />   {/* /admin/stock-list */}
    </Route>

    {/* Redirects */}
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;