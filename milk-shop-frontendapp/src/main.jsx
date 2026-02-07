// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";   // Note: App.jsx not index.js
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './App'; // Aapka App.jsx wala component
import { AuthProvider } from './context/AuthContext';
import './index.css'; // Tailwind yahan import honi chahiye

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);