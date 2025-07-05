import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDashboard } from '../context/DashboardContext';

const AllRequirement = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateDashboardData } = useDashboard();
  const hasFetched = useRef(false);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/requirement/all`);
      setRequirements(response.data || []);
      updateDashboardData({ requirementCount: (response.data || []).length });
      setError(null);
    } catch (err) {
      setError(err.message);
      setRequirements([]);
      updateDashboardData({ requirementCount: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchRequirements();
    }
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-purple-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Property Requirements</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Sr. No.</th>
              <th className="py-3 px-4 text-left">Looking For</th>
              <th className="py-3 px-4 text-left">Property Type</th>
              <th className="py-3 px-4 text-left">BHK Config</th>
              <th className="py-3 px-4 text-left">Budget Range</th>
              <th className="py-3 px-4 text-left">Preferred Locations</th>
              <th className="py-3 px-4 text-left">Additional Requirements</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {requirements.map((requirement, index) => (
              <tr key={requirement.requirementId} className="hover:bg-purple-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{requirement.lookingFor}</td>
                <td className="py-3 px-4">{requirement.propertyType}</td>
                <td className="py-3 px-4">{requirement.bhkConfig}</td>
                <td className="py-3 px-4">
                  ₹{requirement.minBudget} - ₹{requirement.maxBudget}
                </td>
                <td className="py-3 px-4">{requirement.preferredLocations?.join(', ')}</td>
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
