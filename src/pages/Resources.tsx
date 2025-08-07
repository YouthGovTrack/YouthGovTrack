import React from 'react';

const Resources: React.FC = () => (
  <main className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-primary mb-6">Resources</h1>
    {/* Resource Kits Section */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Resource Kits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow p-6 h-32 flex items-center justify-center text-gray-400">ResourceKitCard 1</div>
        <div className="bg-white border rounded-lg shadow p-6 h-32 flex items-center justify-center text-gray-400">ResourceKitCard 2</div>
      </div>
    </section>
    {/* Educational Media Section */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Educational Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow p-6 h-32 flex items-center justify-center text-gray-400">VideoCard 1</div>
        <div className="bg-white border rounded-lg shadow p-6 h-32 flex items-center justify-center text-gray-400">PodcastCard 1</div>
      </div>
    </section>
  </main>
);

export default Resources; 