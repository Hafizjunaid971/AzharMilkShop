import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar fixed width */}
      <Sidebar />

      {/* Main Page Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Yahan aapke saare pages (AddItem, AddSale) load honge */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;