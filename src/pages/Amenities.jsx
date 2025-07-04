import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDashboard } from '../context/DashboardContext'; // adjust path as needed

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [newAmenityName, setNewAmenityName] = useState('');
  const { updateDashboardData } = useDashboard();
  const hasFetched = useRef(false);

  const fetchAmenities = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/amenities/get`);
      setAmenities(response.data || []);
      updateDashboardData({ amenityCount: (response.data || []).length });
    } catch (error) {
      console.error('Error fetching amenities:', error);
      setAmenities([]);
      updateDashboardData({ amenityCount: 0 });
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAmenities();
    }
  }, []);

  const handleAddAmenity = async () => {
    if (!newAmenityName.trim()) {
      alert('Amenity name is required');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/amenities/add`, {
        name: newAmenityName.trim(),
      });
      const updatedAmenities = [...amenities, response.data];
      setAmenities(updatedAmenities);
      updateDashboardData({ amenityCount: updatedAmenities.length });
      setNewAmenityName('');
    } catch (error) {
      console.error('Error adding amenity:', error);
      alert('Failed to add amenity');
    }
  };

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Manage Amenities</h1>

      {/* Add Amenity */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newAmenityName}
            onChange={(e) => setNewAmenityName(e.target.value)}
            placeholder="Enter amenity name"
            className="px-4 py-2 border rounded flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddAmenity}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
          >
            Add Amenity
          </button>
        </div>
      </div>

      {/* Amenities List */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Amenities List</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Sr. No.</th>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {amenities.length > 0 ? (
                amenities.map((amenity, index) => (
                  <tr key={amenity.amenityId} className="border-b border-purple-200 hover:bg-purple-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{amenity.amenityId}</td>
                    <td className="py-3 px-4">{amenity.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 px-4 text-center text-purple-600">
                    No amenities found.
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

export default Amenities;
