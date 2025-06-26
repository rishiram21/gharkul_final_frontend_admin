import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/packages/get`);
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/packages/delete/${id}`);
        fetchPackages();
      } catch (error) {
        console.error('Error deleting package:', error);
        setError('Failed to delete package');
      }
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="w-full bg-purple-700 p-4 mb-6 rounded-lg">
          <h1 className="text-3xl font-bold text-white text-center">Packages</h1>
        </div>

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

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Package Name</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Price</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Duration Days</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Status</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Post Limit</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Contact Limit</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">User Role</th>
                <th className="py-3 px-4 border-b border-gray-200 text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-purple-50">
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.packageName}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.price}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.durationDays}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.status}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.postLimit}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.contactLimit}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-800">{pkg.userRole}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <Link
                        to={`/edit-package/${pkg.id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3 px-4 border-b text-center text-gray-800">No packages found.</td>
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
