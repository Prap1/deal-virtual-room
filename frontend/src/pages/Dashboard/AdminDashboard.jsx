import React from 'react';
import Sidebar from '../../components/Common/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Admin Dashboard</h1>

        {/* You can include analytics components here */}
        {/* Example: charts, statistics, etc. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">Completed vs Pending Deals Chart</div>
          <div className="bg-white p-4 rounded-lg shadow">User Engagement Chart</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
