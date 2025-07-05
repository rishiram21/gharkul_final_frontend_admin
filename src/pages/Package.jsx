import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext'; // updated path from contexts to context

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { updateDashboardData } = useDashboard();
  const hasFetched = useRef(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/packages/get`);
      setPackages(response.data || []);
      updateDashboardData({ packageCount: (response.data || []).length });
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to fetch packages');
      updateDashboardData({ packageCount: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchPackages();
    }
  }, []);

  const filteredPackages = packages.filter((pkg) =>
    pkg.packageName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-4 text-purple-600">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="w-full bg-purple-700 p-4 mb-6 rounded-lg">
          <h1 className="text-3xl font-bold text-white text-center">Packages</h1>
        </div>

        {/* Search + Add */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search packages..."
              className="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-r hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Search
            </button>
          </div>
          <Link
            to="/addpackage"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Add Package
          </Link>
        </div>

        {/* Package Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="py-3 px-4 border-b text-gray-800">Package Name</th>
                <th className="py-3 px-4 border-b text-gray-800">Description</th>
                <th className="py-3 px-4 border-b text-gray-800">Price</th>
                <th className="py-3 px-4 border-b text-gray-800">Duration (Days)</th>
                <th className="py-3 px-4 border-b text-gray-800">Status</th>
                <th className="py-3 px-4 border-b text-gray-800">Post Limit</th>
                <th className="py-3 px-4 border-b text-gray-800">Contact Limit</th>
                <th className="py-3 px-4 border-b text-gray-800">Features</th>
                <th className="py-3 px-4 border-b text-gray-800">User Role</th>
                <th className="py-3 px-4 border-b text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-purple-50">
                    <td className="py-3 px-4 border-b">{pkg.packageName}</td>
                    <td className="py-3 px-4 border-b">{pkg.description}</td>
                    <td className="py-3 px-4 border-b">₹{pkg.price}</td>
                    <td className="py-3 px-4 border-b">{pkg.durationDays}</td>
                    <td className="py-3 px-4 border-b">{pkg.status}</td>
                    <td className="py-3 px-4 border-b">{pkg.postLimit}</td>
                    <td className="py-3 px-4 border-b">{pkg.contactLimit}</td>
                    <td className="py-3 px-4 border-b">{pkg.features}</td>
                    <td className="py-3 px-4 border-b">{pkg.userRole}</td>
                    <td className="py-3 px-4 border-b">
                      <Link
                        to={`/edit-package/${pkg.id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Edit
                      </Link>
                      {/* <button
                        onClick={() => handleDelete(pkg.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center text-gray-800">
                    No packages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Package;
