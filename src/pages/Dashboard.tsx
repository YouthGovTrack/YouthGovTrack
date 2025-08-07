import React from 'react';

const Dashboard: React.FC = () => (
  <main className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-primary mb-6">Governor Scorecards</h1>
    {/* Scorecards Section */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Scorecards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">Scorecard 1</div>
        <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">Scorecard 2</div>
        <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">Scorecard 3</div>
      </div>
    </section>
    {/* Impact Stats Section */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Impact Stats</h2>
      <div className="flex gap-6">
        <div className="bg-white border rounded-lg shadow p-6 w-40 h-32 flex items-center justify-center text-gray-400">Stat 1</div>
        <div className="bg-white border rounded-lg shadow p-6 w-40 h-32 flex items-center justify-center text-gray-400">Stat 2</div>
        <div className="bg-white border rounded-lg shadow p-6 w-40 h-32 flex items-center justify-center text-gray-400">Stat 3</div>
      </div>
    </section>
  </main>
);

export default Dashboard; 