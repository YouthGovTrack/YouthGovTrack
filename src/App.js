import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold">YouthGovTrack</h1>
            <nav className="space-x-4">
              <a href="#" className="hover:text-blue-200">Home</a>
              <a href="#" className="hover:text-blue-200">About</a>
              <a href="#" className="hover:text-blue-200">Contact</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Youth Government Tracking
          </h2>
          <p className="text-gray-600 mb-6">
            Track and monitor government activities that affect young people.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Get Started
          </button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Policy Tracking
            </h3>
            <p className="text-gray-600">
              Monitor policies that impact youth education, employment, and welfare.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Legislative Updates
            </h3>
            <p className="text-gray-600">
              Stay informed about new legislation affecting young people.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Civic Engagement
            </h3>
            <p className="text-gray-600">
              Find opportunities to participate in local government activities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
