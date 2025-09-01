import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StateSelector from '../components/StateSelector';
import LiveCivicAlerts from '../components/LiveCivicAlerts';
import Sponsors from '../components/Sponsors';
import CitizenTestimonials from '../components/CitizenTestimonials';
import CommunityAlertForm from '../components/CommunityAlertForm';
import AuthModal from '../components/AuthModal';
import FeaturedProjects from '../components/FeaturedProjects';
import ArrowLink from '../components/icons/ArrowLink';
import LazyImage from '../components/LazyImage';
import { useProjects } from '../contexts/ProjectContext';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLga, setSelectedLga] = useState<string>('');
  const [showCommunityAlertForm, setShowCommunityAlertForm] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [pendingProjectId, setPendingProjectId] = useState<number | null>(null);
  const { projects, loading } = useProjects();
  const [currentBackground, setCurrentBackground] = useState<number>(0);
  const backgroundImages = ['background1.jpeg', 'background2.jpeg', 'background3.jpeg'];
  console.log('[Home] Rendered. loading:', loading, 'projects:', projects);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground(prev => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  useEffect(() => {
    console.log('[Home] useEffect. loading:', loading, 'projects count:', projects.length);
  }, [loading, projects.length]);

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
      // Save the selected state and LGA to localStorage
      const locationData = {
        state: selectedState,
        lga: selectedLga,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('selectedLocation', JSON.stringify(locationData));
      
      console.log('Location saved:', locationData);
      
      // Open the Community Alert Form
      setShowCommunityAlertForm(true);
    } else {
      alert('Please select both state and LGA');
    }
  };

  const handleProjectClick = (projectId: number) => {
    if (user) {
      // User is logged in, navigate to project details
      navigate(`/project-details/${projectId}`);
    } else {
      // User is not logged in, show auth modal
      setPendingProjectId(projectId);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingProjectId) {
      navigate(`/project-details/${pendingProjectId}`);
      setPendingProjectId(null);
    }
  };

  const handleViewAllProjects = () => {
    if (user) {
      navigate('/browse-projects');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    setPendingProjectId(null);
  };
  // Replace all onNavigate calls with navigate
  // Example: onNavigate('browse-projects') => navigate('/browse-projects')
  // Example: onNavigate('project-details', id) => navigate(`/project-details/${id}`)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(/${backgroundImages[currentBackground]})`,
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
              <ArrowLink 
                className="bg-green-500 text-white hover:bg-green-600 transition shadow-lg"
                onClick={() => navigate('/register')}
                isLink={false}
              >
                <LazyImage 
                  src="/pin.svg" 
                  alt="pin icon" 
                  width={20} 
                  height={20}
                  className="mr-2"
                  style={{ filter: 'invert(1) brightness(2)' }}
                />
                Track My LGA
              </ArrowLink>
            </div>
            
            {/* Quick Report Form */}
            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Report</h3>
              <div className="space-y-4">
                <StateSelector 
                  onStateChange={handleStateChange}
                  onLgaChange={handleLgaChange}
                />
                <ArrowLink 
                  className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition font-semibold"
                  onClick={handleContinue}
                  isLink={false}
                >
                  Continue
                </ArrowLink>
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
                <LazyImage 
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
                <LazyImage 
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
                <LazyImage 
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
      <FeaturedProjects 
        onProjectClick={handleProjectClick}
        onViewAllClick={handleViewAllProjects}
      />

      {/* How To Participate Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How To Participate</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Engage */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Engage</h3>
              <p className="text-gray-600 leading-relaxed">
                As a community member, whether new or old, we encourage you to take an active role by liking, 
                sharing, commenting on projects, and engaging with others. Your involvement emphasizes the 
                significance of each project, ultimately leading to tangible actions that drive positive change in your 
                community.
              </p>
            </div>

            {/* Take Action */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Take Action</h3>
              <p className="text-gray-600 leading-relaxed">
                You have the power to contribute to accountability by fact-checking projects, 
                reporting cases to the anti-corruption agency and contacting relevant government 
                agencies (MDAs) through administrative reports or project status updates. This 
                enables us to track progress and address issues more effectively.
              </p>
            </div>

            {/* Follow Up */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Up</h3>
              <p className="text-gray-600 leading-relaxed">
                We encourage you to follow up on your commitments by regularly attending town hall 
                meetings and gatherings. Additionally, we urge you to exchange information and data with fellow 
                citizens across the country, fostering a culture of transparency and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Civic Alerts */}
      <LiveCivicAlerts />

      {/* Citizen Testimonials */}
      <CitizenTestimonials />

      {/* Sponsors */}
      <Sponsors />

      {/* Community Alert Form Modal */}
      <CommunityAlertForm
        isOpen={showCommunityAlertForm}
        onClose={() => setShowCommunityAlertForm(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Home;
