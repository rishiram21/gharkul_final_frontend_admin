import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Subscriber = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/subscriptions/get`);
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        setError('Failed to fetch subscriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDeactivateSubscription = async (userId, packageId) => {
    if (window.confirm('Are you sure you want to deactivate this subscription?')) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/subscriptions/check-and-deactivate`,
          null,
          { params: { userId, packageId } }
        );
        alert(response.data);
        setSubscriptions(subscriptions.map(sub =>
          sub.userId === userId && sub.packageId === packageId ? { ...sub, status: 'INACTIVE' } : sub
        ));
      } catch (error) {
        console.error('Error deactivating subscription:', error);
        setError('Failed to deactivate subscription');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className="p-5 text-center text-purple-600">Loading...</div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <div className="p-5 bg-purple-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-800">Manage Subscriptions</h1>
        <Link
          to="/addsubscription"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
        >
          Add Subscription
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Package ID</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Payment Type</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Posts Used</th>
              <th className="py-3 px-4 text-left">Contacts Used</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <tr key={subscription.subscriberId} className="border-b border-purple-200 hover:bg-purple-50">
                  <td className="py-3 px-4">{subscription.userId}</td>
                  <td className="py-3 px-4">{subscription.packageId}</td>
                  <td className="py-3 px-4">{subscription.price}</td>
                  <td className="py-3 px-4">{subscription.paymentType}</td>
                  <td className="py-3 px-4">{new Date(subscription.subscriptionStartDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{new Date(subscription.subscriptionEndDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{subscription.status}</td>
                  <td className="py-3 px-4">{subscription.role}</td>
                  <td className="py-3 px-4">{subscription.postsUsed}</td>
                  <td className="py-3 px-4">{subscription.contactsUsed}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeactivateSubscription(subscription.userId, subscription.packageId)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-3 px-4 text-center text-purple-600">No subscriptions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriber;
