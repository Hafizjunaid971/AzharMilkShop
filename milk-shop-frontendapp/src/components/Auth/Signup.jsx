// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signupUser } from '../../api/authApi.js';
// import { useAuth } from '../../context/AuthContext.jsx';

// const Signup = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const { data } = await signupUser(formData);
//       login(data); // login after signup
//       if (data.role === 'admin') navigate('/admin');
//       else navigate('/user');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Signup</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
//         <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
//         <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
//         <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

//         <select name="role" value={formData.role} onChange={handleChange}>
//           <option value="staff">Staff</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button type="submit">Signup</button>
//       </form>
//       <p>
//         Already have an account? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>Login</span>
//       </p>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../api/authApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await signupUser(formData);
      login(data);
      if (data.role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">JOIN SYSTEM</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Create your staff or admin account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" name="name" className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold" placeholder="Ali Khan" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold cursor-pointer">
                <option value="staff">Staff Member</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input type="email" name="email" className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold" placeholder="ali@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input type="password" name="password" className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold" placeholder="Minimum 6 characters" value={formData.password} onChange={handleChange} required />
          </div>
<div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
            <input type="password" name="confirmPassword" className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none font-bold" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl mt-4"
          >
            {loading ? "CREATING ACCOUNT..." : "REGISTER ACCOUNT"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium">
            Already registered? <span onClick={() => navigate('/login')} className="text-blue-600 font-black cursor-pointer hover:underline">Log In Here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;