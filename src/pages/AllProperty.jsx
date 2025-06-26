import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get`, {
          params: { page, size }
        });
        setProperties(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      }
    };

    fetchProperties();
  }, [page, size]);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Properties</h1>
        <Link
          to="/addproperty"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
        >
          Add Property
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Sr. No.</th>
              <th className="py-2 px-4 border">Property Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Property For</th>
              <th className="py-2 px-4 border">BHK Type</th>
              <th className="py-2 px-4 border">Floor</th>
              <th className="py-2 px-4 border">Area (sq. ft.)</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Expected Price</th>
              <th className="py-2 px-4 border">Available From</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((property, index) => (
                <tr key={property.propertyId}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{property.propertyName}</td>
                  <td className="py-2 px-4 border">{property.category}</td>
                  <td className="py-2 px-4 border">{property.propertyFor}</td>
                  <td className="py-2 px-4 border">{property.bhkType}</td>
                  <td className="py-2 px-4 border">{property.floor} of {property.totalFloors}</td>
                  <td className="py-2 px-4 border">{property.totalBuildUpArea}</td>
                  <td className="py-2 px-4 border">
                    {property.address?.street}, {property.address?.city}, {property.address?.state}, {property.address?.zipCode}
                  </td>
                  <td className="py-2 px-4 border">{property.expectedPrice}</td>
                  <td className="py-2 px-4 border">{new Date(property.availableFrom).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-2 px-4 border text-center">No properties found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProperty;
