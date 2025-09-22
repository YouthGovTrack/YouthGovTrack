import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import OptimizedIcon from './OptimizedIcon';
import ViewCivicAlertsModal from './ViewCivicAlertsModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCivicAlertsModalOpen, setIsCivicAlertsModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openCivicAlertsModal = () => {
    setIsCivicAlertsModalOpen(true);
  };

  const closeCivicAlertsModal = () => {
    setIsCivicAlertsModalOpen(false);
  };

  // Handle Track my LGA button click - direct navigation since no auth needed
  const handleTrackMyLGA = () => {
    navigate('/browse-projects');
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
              LocalGovTrack
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <NavLink 
                to="/"
                className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
                end
              >
                Home
              </NavLink>
              <button 
                onClick={handleTrackMyLGA}
                className={`font-medium transition-colors text-sm xl:text-base ${location.pathname === '/browse-projects' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Track my LGA
              </button>
              <NavLink 
                to="/budget" 
                className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Budget
              </NavLink>
              <NavLink 
                to="/reports"
                className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Reports
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
              >
                About
              </NavLink>
              {/* User Menu and Civic Alerts */}
              <div className="flex items-center space-x-3 ml-4">
                {/* Civic Alerts Bell Icon */}
                <button
                  onClick={openCivicAlertsModal}
                  className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  aria-label="View civic alerts"
                  title="Civic Alerts & Notifications"
                >
                  <OptimizedIcon name="bell" size={20} className="transition-transform group-hover:scale-110" />
                </button>
                
                <div className="flex items-center space-x-3">
                </div>
              </div>
            </nav>

            {/* Tablet Navigation (md to lg) */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className={`font-medium transition-colors text-sm ${
                  location.pathname === '/' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={handleTrackMyLGA}
                className={`font-medium transition-colors text-sm ${
                  location.pathname === '/browse-projects' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Track my LGA
              </button>
              {/* Civic Alerts Bell Icon for Tablet */}
              <button
                onClick={openCivicAlertsModal}
                className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="View civic alerts"
              >
                <OptimizedIcon name="bell" size={18} />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200 shadow-lg">
                <button 
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === '/' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  🏠 Home
                </button>
                <button 
                  onClick={() => {
                    handleTrackMyLGA();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === '/browse-projects' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  📊 Track my LGA
                </button>
                <button 
                  onClick={() => {
                    navigate('/budget');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === '/budget' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  💰 Budget
                </button>
                <button 
                  onClick={() => {
                    navigate('/reports');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === '/reports' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  📋 Reports
                </button>
                <button 
                  onClick={() => {
                    navigate('/about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === '/about' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  ℹ️ About
                </button>
                {/* Civic Alerts in Mobile Menu */}
                <button
                  onClick={() => {
                    openCivicAlertsModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  🔔 Civic Alerts
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Civic Alerts Modal */}
      <ViewCivicAlertsModal
        isOpen={isCivicAlertsModalOpen}
        onClose={closeCivicAlertsModal}
      />
    </>
  );
};

export default Navbar;
