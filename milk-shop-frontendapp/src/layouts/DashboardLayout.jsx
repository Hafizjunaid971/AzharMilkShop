// import React from "react";
// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar fixed width */}
//     <div className="hidden lg:block w-64 fixed inset-y-0">
//         <Sidebar />
//       </div>
//       {/* Main Page Content */}
//           <main className="flex-1 lg:ml-64 p-4 md:p-8">
//           <Outlet />
//         </main>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      
      {/* --- Mobile Top Bar --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a] text-white flex items-center justify-between px-4 z-50 shadow-lg">
        <h1 className="font-bold tracking-tight">AZHAR MILK <span className="text-blue-400">SHOP</span></h1>
        
        {/* Hamburger / Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            // Close (X) Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu (Hamburger) Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* --- Sidebar Container --- */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block
      `}>
        {/* Sidebar ko closeMenu prop bhej rahe hain */}
        <Sidebar closeMenu={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* --- Mobile Overlay --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- Main Content --- */}
      <main className="flex-1 p-4 md:p-8 mt-16 lg:mt-0 overflow-x-hidden min-w-0">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;