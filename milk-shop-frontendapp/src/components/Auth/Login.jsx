// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../api/authApi';
// import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//         debugger
//       const { data } = await loginUser(formData);
//       login(data); // save user & token
//       if (data.user.role === 'admin') navigate('/admin');
//       else navigate('/user');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>Signup</span>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginUser(formData);
      login(data);
      if (data.user.role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <span className="text-white text-3xl">🔐</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">WELCOME BACK</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Log in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold mb-6 text-center border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-4 mt-1 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN NOW →"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium">
            New here? <span onClick={() => navigate('/signup')} className="text-blue-600 font-black cursor-pointer hover:underline">Create an Account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;