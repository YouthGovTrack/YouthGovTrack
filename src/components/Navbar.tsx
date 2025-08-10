import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">YouthGovTrack</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Projects</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Reports</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Resources</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
