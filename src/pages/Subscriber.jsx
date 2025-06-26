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

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Subscriptions</h1>
        <Link
          to="/addsubscription"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Subscription
        </Link>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2">Subscriptions List</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Package ID</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Payment Type</th>
              <th className="py-2 px-4 border">Start Date</th>
              <th className="py-2 px-4 border">End Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Posts Used</th>
              <th className="py-2 px-4 border">Contacts Used</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <tr key={subscription.subscriberId}>
                  <td className="py-2 px-4 border">{subscription.userId}</td>
                  <td className="py-2 px-4 border">{subscription.packageId}</td>
                  <td className="py-2 px-4 border">{subscription.price}</td>
                  <td className="py-2 px-4 border">{subscription.paymentType}</td>
                  <td className="py-2 px-4 border">{subscription.subscriptionStartDate}</td>
                  <td className="py-2 px-4 border">{subscription.subscriptionEndDate}</td>
                  <td className="py-2 px-4 border">{subscription.status}</td>
                  <td className="py-2 px-4 border">{subscription.role}</td>
                  <td className="py-2 px-4 border">{subscription.postsUsed}</td>
                  <td className="py-2 px-4 border">{subscription.contactsUsed}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDeactivateSubscription(subscription.userId, subscription.packageId)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-2 px-4 border text-center">No subscriptions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriber;
