import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Amenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [newAmenityName, setNewAmenityName] = useState('');

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/amenities/get`);
        setAmenities(response.data);
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, []);

  const handleAddAmenity = async () => {
    if (!newAmenityName.trim()) {
      alert('Amenity name is required');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/amenities/add`, {
        name: newAmenityName.trim()
      });
      setAmenities([...amenities, response.data]);
      setNewAmenityName('');
    } catch (error) {
      console.error('Error adding amenity:', error);
      alert('Failed to add amenity');
    }
  };

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Manage Amenities</h1>

      <div className="mb-4">
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

      <div>
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Amenities List</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {amenities.length > 0 ? (
                amenities.map((amenity) => (
                  <tr key={amenity.amenityId} className="border-b border-purple-200 hover:bg-purple-50">
                    <td className="py-3 px-4">{amenity.amenityId}</td>
                    <td className="py-3 px-4">{amenity.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-3 px-4 text-center text-purple-600">No amenities found.</td>
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
