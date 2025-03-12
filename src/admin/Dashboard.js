import React, { useState, useEffect } from "react";
import API_URL from "../Url";

export const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    pendingRenewals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user/dashboard`);
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        setAnalyticsData({
          totalUsers: data.totalUsers,
          pendingRenewals: data.pendingRenewals,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100  min-w-md min-h-[55rem] p-4 sm:p-6 lg:p-8 mt-2 rounded-lg">
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
    <p className="text-gray-600 mb-6">
      Manage administrative tasks, view analytics, and handle user operations efficiently.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
    <div className="bg-blue-500 shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white">Total Users</h2>
      <p className="text-3xl font-bold text-white mt-2">
        {analyticsData.totalUsers}
      </p>
    </div>

    <div className="bg-red-600 shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white">Pending Renewals</h2>
      <p className="text-3xl font-bold text-white mt-2">
        {analyticsData.pendingRenewals}
      </p>
    </div>
  </div>
</div>

  );
};
