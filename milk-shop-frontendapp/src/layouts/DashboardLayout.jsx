import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar fixed width */}
    <div className="hidden lg:block w-64 fixed inset-y-0">
        <Sidebar />
      </div>
      {/* Main Page Content */}
          <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <Outlet />
        </main>
    </div>
  );
};

export default DashboardLayout;