import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const { updateDashboardData } = useDashboard();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get`, {
        params: { page, size },
      });

      setProperties(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);

      // ✅ Update dashboard property count
      updateDashboardData({ propertyCount: response.data.totalElements || 0 });
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
      updateDashboardData({ propertyCount: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hasFetched.current = false; // reset on page change
  }, [page]);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchProperties();
    }
  }, [page, size]);

  const handlePreviousPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/allproperty/${propertyId}`);
  };

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-800">All Properties</h1>
        <Link
          to="/addproperty"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add Property
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Sr. No.</th>
              <th className="py-3 px-4 text-left">Property Name</th>
              <th className="py-3 px-4 text-left">Posted By User ID</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Apartment Type</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-purple-600">
                  Loading...
                </td>
              </tr>
            ) : properties.length > 0 ? (
              properties.map((property, index) => (
                <tr
                  key={property.propertyId}
                  className="border-b border-purple-200 hover:bg-purple-50"
                >
                  <td className="py-3 px-4">{page * size + index + 1}</td>
                  <td className="py-3 px-4">{property.propertyName}</td>
                  <td className="py-3 px-4">{property.postedByUserId}</td>
                  <td className="py-3 px-4">{property.category}</td>
                  <td className="py-3 px-4">{property.apartmentType}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewDetails(property.propertyId)}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-purple-600">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-purple-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-purple-800">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-purple-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProperty;
