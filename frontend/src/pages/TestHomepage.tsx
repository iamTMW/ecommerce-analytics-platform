import React from 'react';

export default function TestHomepage() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">$45,230</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">1,240</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Active Customers</p>
          <p className="text-2xl font-bold text-gray-800">523</p>
        </div>
      </div>
    </div>
  );
}
