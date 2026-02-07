import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axiosInstance from '../../api/authApi';

const UserDashboard = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      const { data } = await axiosInstance.get('/sales');
      setSales(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>User Dashboard</h2>
        {loading ? (
          <p>Loading sales...</p>
        ) : (
          <ul>
            {sales.map(sale => (
              <li key={sale._id}>
                Date: {new Date(sale.date).toLocaleDateString()} - Total: {sale.totalAmount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
