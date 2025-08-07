import React from 'react';

const About: React.FC = () => (
  <main className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-primary mb-6">About YouthGov Track</h1>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Mission & Vision</h2>
      <p className="text-gray-700">Project mission and vision go here. (TODO)</p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Partners</h2>
      <div className="flex gap-4">
        <span className="w-16 h-16 bg-gray-200 rounded" aria-label="Partner Logo"></span>
        <span className="w-16 h-16 bg-gray-200 rounded" aria-label="Partner Logo"></span>
      </div>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
      <div className="bg-white border rounded-lg shadow p-6 text-gray-400">TestimonialCard (TODO)</div>
    </section>
  </main>
);

export default About; 