import React from 'react';

const Home: React.FC = () => (
  <main className="min-h-[80vh] bg-white">
    {/* Hero Section */}
    <section className="container mx-auto flex flex-col md:flex-row items-center gap-8 py-16 px-4">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">Track Promises. Empower Youth. Drive Accountability.</h1>
        <p className="text-lg text-gray-700 mb-4">YouthGov Track helps you monitor governor promises, submit community reports, and access civic resources for a better Nigeria.</p>
        <button className="bg-primary text-white px-6 py-3 rounded font-semibold shadow hover:bg-primary-dark transition">Get Started</button>
      </div>
      {/* Hero Illustration Placeholder */}
      <div className="flex-1 flex justify-center">
        <div className="w-64 h-64 bg-gray-200 rounded-xl" aria-label="Hero Illustration"></div>
      </div>
    </section>
    {/* Promises/Reports Preview Section */}
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Promises & Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Placeholders */}
        <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">Card 1</div>
        <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">Card 2</div>
        <div className="bg-white border rounded-lg shadow p-6 h-40 flex items-center justify-center text-gray-400">Card 3</div>
      </div>
    </section>
  </main>
);

export default Home; 