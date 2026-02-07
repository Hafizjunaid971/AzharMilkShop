import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from  '../components/Auth/Login.jsx';
import Signup from  '../components/Auth/Signup.jsx';
import AdminDashboard from  '../components/Dashboard/AdminDashboard.jsx';
import UserDashboard from  '../components/Dashboard/UserDashboard.jsx';


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route
      path="/admin"
      element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/user"
      element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
