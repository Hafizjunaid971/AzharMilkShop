import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('token');

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(tokenFromStorage || null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from backend if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await getCurrentUser(token); // make sure API uses token
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data)); // save user for reload
        } catch (err) {
          console.error('Failed to fetch current user:', err);
          logout(); // invalid token
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData)); // save user immediately
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
