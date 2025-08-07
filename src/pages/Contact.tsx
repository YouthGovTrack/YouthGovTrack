import React from 'react';

const Contact: React.FC = () => (
  <main className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
    <form className="bg-white border rounded-lg shadow p-8 max-w-lg mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input id="name" name="name" type="text" className="w-full border rounded px-3 py-2" placeholder="Your Name" />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input id="email" name="email" type="email" className="w-full border rounded px-3 py-2" placeholder="you@email.com" />
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-1">Message</label>
        <textarea id="message" name="message" className="w-full border rounded px-3 py-2" rows={4} placeholder="Type your message..." />
      </div>
      <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark transition">Send</button>
      {/* Confirmation Message Placeholder */}
      <div className="text-green-600 mt-2">(TODO) Confirmation message after submit</div>
    </form>
  </main>
);

export default Contact; 