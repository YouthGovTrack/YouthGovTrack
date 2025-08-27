/** import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">LocalGovTrack</h1>
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

      {/* Hero Section 
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
            
            {/* Quick Report Form 
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

      {/* Statistics 
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

      {/* Featured Projects 
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

      {/* Live Civic Alerts 
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Live Civic Alerts</h2>
            <span className="text-sm text-gray-500">Stay updated with the latest civic announcements and alerts</span>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">New Healthcare Center Opening</h4>
                  <p className="text-gray-600 mt-1">The newly completed healthcare center in Ikeja will be officially opened next week.</p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Health</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">Road Construction Delay</h4>
                  <p className="text-gray-600 mt-1">The Surulere road rehabilitation project has been delayed due to weather conditions.</p>
                  <span className="text-xs text-gray-400">1 week ago</span>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Alert</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">School Renovation Completed</h4>
                  <p className="text-gray-600 mt-1">The Alimosho public school renovation has been successfully completed ahead of schedule.</p>
                  <span className="text-xs text-gray-400">3 days ago</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">Town Hall Meeting</h4>
                  <p className="text-gray-600 mt-1">Join the upcoming town hall meeting to discuss infrastructure development in your LGA.</p>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Upcoming</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Alerts →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials 
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kind Words from Active Citizens</h2>
            <p className="text-gray-600">Hear from Nigerians who are making a difference in their communities using LocalGovTrack</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-600 mb-6 italic">"LocalGovTrack has empowered our community to hold local officials accountable. We've seen real change in how community projects are managed."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Adebayo Johnson</div>
                  <div className="text-sm text-gray-500">Community Activist, Lagos</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-600 mb-6 italic">"As young Nigerians, we now have a voice in our governance. This platform has helped us report abandoned projects and see action within weeks."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Amina Ibrahim</div>
                  <div className="text-sm text-gray-500">Student Leader, Abuja</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer 
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LocalGovTrack</h3>
              <p className="text-gray-400">Empowering citizens to track government projects and engage in civic activities.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-white">How It Works</a>
                <a href="#" className="block text-gray-400 hover:text-white">Projects</a>
                <a href="#" className="block text-gray-400 hover:text-white">Reports</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +234 (0) 800 7890</p>
                <p>📧 info@localgovtrack.ng</p>
                <p>📍 123 BOVAS Office, Lagos</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
              <div className="flex">
                <input type="email" placeholder="Enter email" className="flex-1 p-2 rounded-l-lg text-gray-900" />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LocalGovTrack. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; */
