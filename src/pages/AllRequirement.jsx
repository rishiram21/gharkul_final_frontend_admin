import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllRequirement = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/requirement/all`);
        setRequirements(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Property Requirements</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-600">
            <tr>
              <th className="py-3 px-4 text-left text-white">Sr. No.</th>
              <th className="py-3 px-4 text-left text-white">Looking For</th>
              <th className="py-3 px-4 text-left text-white">Property Type</th>
              <th className="py-3 px-4 text-left text-white">BHK Config</th>
              <th className="py-3 px-4 text-left text-white">Budget Range</th>
              <th className="py-3 px-4 text-left text-white">Preferred Locations</th>
              <th className="py-3 px-4 text-left text-white">Additional Requirements</th>
              <th className="py-3 px-4 text-left text-white">Phone Number</th>
              <th className="py-3 px-4 text-left text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-200">
            {requirements.map((requirement, index) => (
              <tr key={requirement.requirementId} className="hover:bg-purple-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{requirement.lookingFor}</td>
                <td className="py-3 px-4">{requirement.propertyType}</td>
                <td className="py-3 px-4">{requirement.bhkConfig}</td>
                <td className="py-3 px-4">₹{requirement.minBudget} - ₹{requirement.maxBudget}</td>
                <td className="py-3 px-4">{requirement.preferredLocations.join(', ')}</td>
                <td className="py-3 px-4">{requirement.additionalRequirements}</td>
                <td className="py-3 px-4">{requirement.phoneNumber}</td>
                <td className="py-3 px-4">{requirement.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequirement;
