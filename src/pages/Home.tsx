import React, { useState, useEffect } from 'react';
import StateSelector from '../components/StateSelector';
import LiveCivicAlerts from '../components/LiveCivicAlerts';
import Sponsors from '../components/Sponsors';
import CitizenTestimonials from '../components/CitizenTestimonials';
import AuthModal from '../components/AuthModal';
import { useProjects } from '../contexts/ProjectContext';

interface HomeProps {
  onNavigate: (page: string, projectId?: number) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLga, setSelectedLga] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const { projects, loading } = useProjects();
  const [currentBackground, setCurrentBackground] = useState<1 | 2>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground(prev => prev === 1 ? 2 : 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      // Navigate to browse projects page
      onNavigate('browse-projects');
    } else {
      alert('Please select both state and LGA');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(/background${currentBackground}.jpeg)`,
          minHeight: '80vh'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Track Local Government Projects in Nigeria
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed opacity-90">
                Empowering citizens to monitor development projects, report issues, and access civic education materials for a more transparent governance.
              </p>
              <button 
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex items-center"
                onClick={() => setShowAuthModal(true)}
              >
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
              
              {showAuthModal && (
                <AuthModal
                  isOpen={showAuthModal}
                  onClose={() => setShowAuthModal(false)}
                />
              )}
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
            {loading ? (
              <div className="col-span-3 flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading projects...</span>
              </div>
            ) : (
              projects.slice(0, 3).map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
                  onClick={() => onNavigate('project-details', project.id)}
                >
                  <div className="h-48 bg-gray-50 flex items-center justify-center p-6">
                    <img 
                      src={project.images[0] || '/Healthcare.png'} 
                      alt={project.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-500">📍 {project.lga}, {project.state}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm ${project.category === 'Healthcare' ? 'bg-blue-100 text-blue-800' : 
                        project.category === 'Infrastructure' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded`}>
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${
                          project.category === 'Healthcare' ? 'bg-blue-600' : 
                          project.category === 'Infrastructure' ? 'bg-red-600' : 
                          'bg-yellow-600'
                        }`}
                        style={{width: `${project.progress}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Budget: ₦{(project.budget / 1000000).toLocaleString()}M</span>
                      <span>End Date: {new Date(project.expectedCompletion).toLocaleDateString('en-NG', {month: 'short', year: 'numeric'})}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => onNavigate('browse-projects')}
            >
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
