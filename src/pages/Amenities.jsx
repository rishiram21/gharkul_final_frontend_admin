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
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Manage Amenities</h1>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newAmenityName}
            onChange={(e) => setNewAmenityName(e.target.value)}
            placeholder="Enter amenity name"
            className="px-4 py-2 border rounded flex-grow"
          />
          <button
            onClick={handleAddAmenity}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Amenity
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Amenities List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {amenities.length > 0 ? (
                amenities.map((amenity) => (
                  <tr key={amenity.amenityId}>
                    <td className="py-2 px-4 border">{amenity.amenityId}</td>
                    <td className="py-2 px-4 border">{amenity.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 px-4 border text-center">No amenities found.</td>
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
