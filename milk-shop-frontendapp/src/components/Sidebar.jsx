
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//   const { user, logout } = useAuth();
//    const storedResponse = localStorage.getItem("user");

//   // Parse it and extract the user object
//   const response = storedResponse ? JSON.parse(storedResponse) : null;
//   const userdata = response?.user;
//   const userrole = userdata?.role;
//   const linkClass = ({ isActive }) => 
//     `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
//       isActive 
//       ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)]' 
//       : 'text-slate-400 hover:bg-slate-800 hover:text-white'
//     }`;

//   return (
//     <div className="fixed inset-y-0 left-0 w-64 bg-[#0f172a] text-white p-6 flex flex-col shadow-2xl">
//       {/* Brand Logo */}
//       <div className="flex items-center gap-3 px-4 mb-12">
//         <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/50">
//           M
//         </div>
//         <span className="text-xl font-bold tracking-tight uppercase">Milk <span className="text-blue-500">Shop</span></span>
//       </div>
      
//       {/* Navigation */}
//       <nav className="flex-1 space-y-3">
//         {userrole === 'admin' ? (
//           <>
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Main Menu</p>
//             <NavLink to="/admin" end className={linkClass}><span>📊</span> Dashboard</NavLink>
//             <NavLink to="/admin/items" className={linkClass}><span>📦</span> Add  Product</NavLink>
//             <NavLink to="/admin/items-list" className={linkClass}><span>📋</span> Items List</NavLink>
//             <NavLink to="/admin/stock" className={linkClass}><span>📈</span> Add Stock</NavLink>
//             <NavLink to="/admin/stock-list" className={linkClass}><span>💰</span> Stock Record</NavLink>

//             <NavLink to="/admin/sales" className={linkClass}><span>💰</span> Sales Record</NavLink>
//             <NavLink to="/admin/sales-list" className={linkClass}><span>📋</span> Sales List</NavLink>

//           </>
//         ) : (
//           <>
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Staff Menu</p>
//             <NavLink to="/user" end className={linkClass}><span>🏠</span> Home</NavLink>
//             <NavLink to="/user/items" className={linkClass}><span>📦</span> Add product</NavLink>
//             <NavLink to="/user/items-list" className={linkClass}><span>📋</span> Items List</NavLink>
//             <NavLink to="/user/stock" className={linkClass}><span>📈</span> Add Stock</NavLink>
//             <NavLink to="/user/sales" className={linkClass}><span>💰</span> Sales Record</NavLink>
//             <NavLink to="/user/sales-list" className={linkClass}><span>📋</span> Sales List</NavLink>

//             <NavLink to="/user/stock-list" className={linkClass}><span>💰</span> Stock Record</NavLink>


//           </>
//         )}
//       </nav>

//       {/* User Info & Logout */}
//       <div className="mt-auto bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 font-bold flex items-center justify-center text-xs text-white uppercase">
//             {user?.name?.charAt(0)}
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-sm font-bold truncate capitalize">{user?.name}</p>
//             <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{user?.role}</p>
//           </div>
//         </div>
//         <button 
//           onClick={logout} 
//           className="w-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
//         >
//           <span>🚪</span> Logout
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Sidebar;



import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// props mein closeMenu receive kar rahe hain
const Sidebar = ({ closeMenu }) => {
  const { user, logout } = useAuth();
  const storedResponse = localStorage.getItem("user");

  const response = storedResponse ? JSON.parse(storedResponse) : null;
  const userdata = response?.user;
  const userrole = userdata?.role;

  const linkClass = ({ isActive }) => 
    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
      isActive 
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)]' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    /* h-full kar diya aur fixed hata diya kyunke parent Layout isay handle kar raha hai */
    <div className="h-full bg-[#0f172a] text-white p-6 flex flex-col shadow-2xl overflow-y-auto">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-4 mb-12">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/50">
          M
        </div>
        <span className="text-xl font-bold tracking-tight uppercase">
          Milk <span className="text-blue-500">Shop</span>
        </span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {/* onClick={closeMenu} har link par lagana hai taake mobile par menu khud band ho jaye */}
        {userrole === 'admin' ? (
          <>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Main Menu</p>
            <NavLink to="/admin" end className={linkClass} onClick={closeMenu}><span>📊</span> Dashboard</NavLink>
            <NavLink to="/admin/items" className={linkClass} onClick={closeMenu}><span>📦</span> Add Product</NavLink>
            <NavLink to="/admin/items-list" className={linkClass} onClick={closeMenu}><span>📋</span> Items List</NavLink>
            <NavLink to="/admin/stock" className={linkClass} onClick={closeMenu}><span>📈</span> Add Stock</NavLink>
            <NavLink to="/admin/stock-list" className={linkClass} onClick={closeMenu}><span>💰</span> Stock Record</NavLink>
            <NavLink to="/admin/sales" className={linkClass} onClick={closeMenu}><span>💰</span> Sales Record</NavLink>
            <NavLink to="/admin/sales-list" className={linkClass} onClick={closeMenu}><span>📋</span> Sales List</NavLink>
          </>
        ) : (
          <>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Staff Menu</p>
            <NavLink to="/user" end className={linkClass} onClick={closeMenu}><span>🏠</span> Home</NavLink>
            <NavLink to="/user/items" className={linkClass} onClick={closeMenu}><span>📦</span> Add product</NavLink>
            <NavLink to="/user/items-list" className={linkClass} onClick={closeMenu}><span>📋</span> Items List</NavLink>
            <NavLink to="/user/stock" className={linkClass} onClick={closeMenu}><span>📈</span> Add Stock</NavLink>
            <NavLink to="/user/sales" className={linkClass} onClick={closeMenu}><span>💰</span> Sales Record</NavLink>
            <NavLink to="/user/sales-list" className={linkClass} onClick={closeMenu}><span>📋</span> Sales List</NavLink>
            <NavLink to="/user/stock-list" className={linkClass} onClick={closeMenu}><span>💰</span> Stock Record</NavLink>
          </>
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="mt-8 bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 font-bold flex items-center justify-center text-xs text-white uppercase">
            {user?.name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate capitalize">{user?.name}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={() => { logout(); closeMenu(); }} 
          className="w-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;