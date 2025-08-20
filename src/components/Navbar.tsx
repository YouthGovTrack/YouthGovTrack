import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import OptimizedIcon from './OptimizedIcon';
import AuthModal from './AuthModal';
import ViewCivicAlertsModal from './ViewCivicAlertsModal';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCivicAlertsModalOpen, setIsCivicAlertsModalOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLoginModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openCivicAlertsModal = () => {
    setIsCivicAlertsModalOpen(true);
  };

  const closeCivicAlertsModal = () => {
    setIsCivicAlertsModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigate('/browse-projects');
  };

  const handleLogout = () => {
    logout();
    // Redirect to home if on community pages
    if (["/reports", "/champions", "/community"].includes(location.pathname)) {
      navigate('/');
    }
  };

  // Handle Track my LGA button click - require sign-in for non-authenticated users
  const handleTrackMyLGA = () => {
    if (user) {
      navigate('/browse-projects');
    } else {
      openLoginModal();
    }
  };

  const isLoggedIn = !!user;

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
              {!isLoggedIn && (
                <NavLink 
                  to="/"
                  className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
                  end
                >
                  Home
                </NavLink>
              )}
              <button 
                onClick={handleTrackMyLGA}
                className={`font-medium transition-colors text-sm xl:text-base ${location.pathname === '/browse-projects' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Track my LGA
              </button>
              {/* Community Features - Only show when logged in */}
              {isLoggedIn && (
                <>
                  <NavLink 
                    to="/reports"
                    className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    Reports
                  </NavLink>
                  <NavLink 
                    to="/champions"
                    className={({ isActive }) => `font-medium transition-colors text-sm xl:text-base ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}
                  >
                    Champions
                  </NavLink>
                </>
              )}
              <NavLink to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm xl:text-base">
                About
              </NavLink>
              {/* Auth Buttons / User Menu */}
              <div className="flex items-center space-x-3 ml-4">
                {/* Civic Alerts Bell Icon - Only show for authenticated users */}
                {isLoggedIn && (
                  <button
                    onClick={openCivicAlertsModal}
                    className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                    aria-label="View civic alerts"
                    title="Civic Alerts & Notifications"
                  >
                    <OptimizedIcon name="bell" size={20} className="transition-transform group-hover:scale-110" />
                    {/* Dynamic Notification Badge */}
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center font-medium animate-pulse">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>
                )}
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-700">
                      Welcome, <span className="font-medium text-blue-600">{user.firstName}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={openLoginModal}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate('/register')}
                      className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Join Community
                    </button>
                  </>
                )}
              </div>
            </nav>

            {/* Tablet Navigation (md to lg) */}
            <nav className="hidden md:flex lg:hidden items-center space-x-4">
              {!isLoggedIn && (
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
              )}
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
              {/* Civic Alerts Bell Icon for Tablet - Only show for authenticated users */}
              {isLoggedIn && (
                <button
                  onClick={openCivicAlertsModal}
                  className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  aria-label="View civic alerts"
                >
                  <OptimizedIcon name="bell" size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[16px] h-4 rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>
              )}
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">{user.firstName}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors font-medium text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                      onClick={() => navigate('/register')}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Join
                </button>
              )}
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
                {!isLoggedIn && (
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
                )}
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
                {/* Community Features - Only show when logged in */}
                {isLoggedIn && (
                  <>
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
                        navigate('/champions');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        location.pathname === '/champions' 
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      🏆 Champions
                    </button>
                  </>
                )}
                <a href="#about" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors">
                  ℹ️ About
                </a>
                {/* Civic Alerts in Mobile Menu - Only show for authenticated users */}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      openCivicAlertsModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>🔔 Civic Alerts</span>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                )}
                {/* Mobile Auth Section */}
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-600">
                        Logged in as <span className="font-medium text-blue-600">{user.firstName} {user.lastName}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                      >
                        🔓 Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          openLoginModal();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                      >
                        🔑 Sign In
                      </button>
                      <button
                        onClick={() => {
                          navigate('/register');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                      >
                        🤝 Join Community
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={handleAuthSuccess}
        onRegisterClick={() => navigate('/register')}
        redirectAfterLogin="browse-projects"
      />

      {/* Civic Alerts Modal */}
      <ViewCivicAlertsModal
        isOpen={isCivicAlertsModalOpen}
        onClose={closeCivicAlertsModal}
      />
    </>
  );
};

export default Navbar;
