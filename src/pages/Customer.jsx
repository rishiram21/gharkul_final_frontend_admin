import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDashboard } from '../context/DashboardContext'; // Adjust path if needed

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateDashboardData } = useDashboard();
  const hasUpdatedDashboard = useRef(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/users`);
        const data = response.data || [];
        setUsers(data);
        if (!hasUpdatedDashboard.current) {
          const customerCount = data.filter(user => user.userRole === 'CUSTOMER').length;
          updateDashboardData({ customerCount });
          hasUpdatedDashboard.current = true;
        }
      } catch (err) {
        setError(err.message);
        updateDashboardData({ customerCount: 0 }); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [updateDashboardData]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">User List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId} className="border-b border-purple-200 hover:bg-purple-50">
                  <td className="py-3 px-4">{user.userId}</td>
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.lastName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phoneNumber}</td>
                  <td className="py-3 px-4">
                    {user.userRole === 'CUSTOMER' ? 'OWNER' : user.userRole}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-purple-600">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
