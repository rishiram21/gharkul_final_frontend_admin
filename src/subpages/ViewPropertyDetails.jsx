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
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!property) {
    return <div className="text-center p-4">No property details found.</div>;
  }

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-5">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">Property Details</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{property.propertyName}</h2>
          <p><strong>Posted By User ID:</strong> {property.postedByUserId}</p>
          <p><strong>Category:</strong> {property.category}</p>
          <p><strong>Apartment Type:</strong> {property.apartmentType}</p>
          <p><strong>BHK Type:</strong> {property.bhkType}</p>
          <p><strong>Floor:</strong> {property.floor} of {property.totalFloors}</p>
          <p><strong>Total Build Up Area:</strong> {property.totalBuildUpArea} sq. ft.</p>
          <p><strong>Address:</strong> {property.address?.street}, {property.address?.city}, {property.address?.state}, {property.address?.zipCode}</p>
          <p><strong>Expected Price:</strong> {property.expectedPrice}</p>
          <p><strong>Available From:</strong> {new Date(property.availableFrom).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyDetails;
