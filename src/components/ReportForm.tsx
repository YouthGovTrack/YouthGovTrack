import React from 'react';

const ReportForm: React.FC = () => (
  <form className="bg-white border rounded-lg shadow p-8 max-w-xl mx-auto space-y-6">
    <div>
      <label htmlFor="report" className="block font-medium mb-1">Report</label>
      <textarea id="report" name="report" className="w-full border rounded px-3 py-2" rows={4} placeholder="Describe the project status..." />
    </div>
    <div>
      <label className="block font-medium mb-1">Image Upload</label>
      <input type="file" className="w-full" />
    </div>
    <div>
      <label className="block font-medium mb-1">Geolocation</label>
      <input type="text" className="w-full border rounded px-3 py-2" placeholder="Location (auto or manual)" />
    </div>
    <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark transition">Submit Report</button>
    {/* Confirmation Message Placeholder */}
    <div className="text-green-600 mt-2">(TODO) Confirmation message after submit</div>
  </form>
);

export default ReportForm; 