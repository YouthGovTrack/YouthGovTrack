import React, { useState } from 'react';
import StateSelector from '../components/StateSelector';
import LiveCivicAlerts from '../components/LiveCivicAlerts';
import Sponsors from '../components/Sponsors';
import CitizenTestimonials from '../components/CitizenTestimonials';

const Home: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLga, setSelectedLga] = useState<string>('');

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    console.log('Selected state:', state);
  };

  const handleLgaChange = (lga: string) => {
    setSelectedLga(lga);
    console.log('Selected LGA:', lga);
  };

  const handleContinue = () => {
    if (selectedState && selectedLga) {
      // Handle form submission
      console.log('Proceeding with:', { state: selectedState, lga: selectedLga });
      // You can navigate to another page or make an API call here
    } else {
      alert('Please select both state and LGA');
    }
  };
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
                <img 
                  src="/pin.svg" 
                  alt="pin icon" 
                  width={20} 
                  height={20}
                  className="mr-2"
                  style={{ filter: 'invert(1) brightness(2)' }}
                />
                Track My LGA
              </button>
            </div>
            
            {/* Quick Report Form */}
            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Report</h3>
              <div className="space-y-4">
                <StateSelector 
                  onStateChange={handleStateChange}
                  onLgaChange={handleLgaChange}
                />
                <button 
                  className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  onClick={handleContinue}
                >
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
              <div className="flex justify-center mb-2">
                <img 
                  src="/map.svg" 
                  alt="Map icon" 
                  width={48} 
                  height={48}
                  className="text-blue-600"
                />
              </div>
              <div className="text-3xl font-bold text-gray-900">247</div>
              <div className="text-gray-600">LGAs Covered</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-2">
                <img 
                  src="/report.svg" 
                  alt="Report icon" 
                  width={48} 
                  height={48}
                  className="text-green-600"
                />
              </div>
              <div className="text-3xl font-bold text-gray-900">12,643</div>
              <div className="text-gray-600">Report Submitted</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-2">
                <img 
                  src="/citizen.svg" 
                  alt="User icon" 
                  width={48} 
                  height={48}
                  className="text-yellow-600"
                />
              </div>
              <div className="text-3xl font-bold text-gray-900">5,782</div>
              <div className="text-gray-600">Citizens Trained</div>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-6">
                <img 
                  src="/Healthcare.png" 
                  alt="Healthcare Center" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
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

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-6">
                <img 
                  src="/infracture.png" 
                  alt="Road Infrastructure" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
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

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-50 flex items-center justify-center p-6">
                <img 
                  src="/Education.png" 
                  alt="School Building" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
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

      {/* Live Civic Alerts */}
      <LiveCivicAlerts />

      {/* Citizen Testimonials */}
      <CitizenTestimonials />

      {/* Sponsors */}
      <Sponsors />
    </div>
  );
};

export default Home;
