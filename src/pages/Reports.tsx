import React from 'react';

const Reports: React.FC = () => (
  <main className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-primary mb-6">Community Reports</h1>
    {/* FilterBar Placeholder */}
    <div className="mb-6 bg-gray-50 p-4 rounded shadow-sm">FilterBar (TODO)</div>
    {/* Report Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">ReportCard 1</div>
      <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">ReportCard 2</div>
      <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">ReportCard 3</div>
    </div>
  </main>
);

export default Reports; 