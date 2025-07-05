import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewPropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get/${propertyId}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return <div className="text-center p-6 text-lg font-medium text-gray-600">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600 font-semibold">Error: {error}</div>;
  }

  if (!property) {
    return <div className="text-center p-6 text-gray-500">No property details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-purple-800">🏠 {property.propertyName}</h1>
          <p className="text-sm text-gray-500 mt-1">Posted by User ID: {property.postedByUserId}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Detail label="Category" value={property.category} />
          <Detail label="Apartment Type" value={property.apartmentType} />
          <Detail label="BHK Type" value={property.bhkType} />
          <Detail label="Floor" value={`${property.floor} of ${property.totalFloors}`} />
          <Detail label="Total Built-up Area" value={`${property.totalBuildUpArea} sq. ft.`} />
          <Detail label="Expected Price" value={`₹ ${property.expectedPrice}`} />
          <Detail
            label="Available From"
            value={new Date(property.availableFrom).toLocaleDateString()}
          />
        </div>

        <div className="pt-4 border-t">
          <h2 className="text-lg font-semibold text-gray-700">📍 Address</h2>
          <p className="text-gray-600 mt-1">
            {property.address?.street}, {property.address?.city}, {property.address?.state} - {property.address?.zipCode}
          </p>
        </div>

        {property.description && (
          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold text-gray-700">📝 Description</h2>
            <p className="text-gray-600 mt-1 whitespace-pre-line">{property.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable component for key-value pairs
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || '-'}</p>
  </div>
);

export default ViewPropertyDetails;
