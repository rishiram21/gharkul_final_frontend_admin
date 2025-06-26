import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 aspect-square flex items-center justify-center shadow-md">
          All Property List
        </div>
        <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 aspect-square flex items-center justify-center shadow-md">
          Amenities
        </div>
        <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 aspect-square flex items-center justify-center shadow-md">
          Packages
        </div>
        <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 aspect-square flex items-center justify-center shadow-md">
          Subscriber List
        </div>
        <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 aspect-square flex items-center justify-center shadow-md">
          Customer
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
