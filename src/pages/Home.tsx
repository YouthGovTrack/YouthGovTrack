import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Track Local Government Projects in Nigeria
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering citizens to monitor development projects, report issues, and access civic education materials for a more transparent governance.
              </p>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex items-center">
                <span className="mr-2">🇳🇬</span>
                Track My LGA
              </button>
            </div>
            
            {/* Quick Report Form */}
            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Report</h3>
              <div className="space-y-4">
                <div>
                  <select className="w-full p-3 rounded-lg text-gray-900">
                    <option>Select your state</option>
                    <option>Lagos</option>
                    <option>Abuja</option>
                    <option>Kano</option>
                  </select>
                </div>
                <div>
                  <select className="w-full p-3 rounded-lg text-gray-900">
                    <option>Select your LGA</option>
                  </select>
                </div>
                <button className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-blue-600 text-4xl mb-2">🗺️</div>
              <div className="text-3xl font-bold text-gray-900">247</div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-green-600 text-4xl mb-2">💰</div>
              <div className="text-3xl font-bold text-gray-900">12,643</div>
              <div className="text-gray-600">Budget Allocated</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-yellow-600 text-4xl mb-2">👥</div>
              <div className="text-3xl font-bold text-gray-900">5,782</div>
              <div className="text-gray-600">Active Citizens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600">Track the progress of government projects in your local government area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-blue-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ikeja Primary Healthcare Center</h3>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500">📍 Ikeja LGA, Lagos</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Healthcare</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Budget: ₦85,000,000</span>
                  <span>End Date: Dec 2023</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-red-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Surulere Road Rehabilitation</h3>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500">📍 Surulere LGA, Lagos</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Infrastructure</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Budget: ₦120,000,000</span>
                  <span>End Date: Mar 2024</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-yellow-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Alimosho Public School Renovation</h3>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500">📍 Alimosho LGA, Lagos</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Education</span>
                  <span className="text-sm text-gray-500">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Budget: ₦65,000,000</span>
                  <span>End Date: Nov 2023</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              View All Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
