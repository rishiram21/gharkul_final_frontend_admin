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
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">First Name</th>
              <th className="py-2 px-4 border">Last Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId}>
                  <td className="py-2 px-4 border">{user.userId}</td>
                  <td className="py-2 px-4 border">{user.firstName}</td>
                  <td className="py-2 px-4 border">{user.lastName}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.phoneNumber}</td>
                  <td className="py-2 px-4 border">
                    {user.userRole === 'CUSTOMER' ? 'OWNER' : user.userRole}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 border text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
