import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'projects' | 'reports' | 'champions') => void;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  role: 'citizen' | 'champion' | 'admin';
  joinDate: string;
  isVerified: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for logged-in user on component mount and localStorage changes
  useEffect(() => {
    const checkAuthState = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        try {
          setCurrentUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkAuthState();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        checkAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [authModalOpen]); // Re-check when auth modal closes

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    // Redirect to home if on community pages
    if (currentPage === 'reports' || currentPage === 'champions') {
      onNavigate('home');
    }
  };

  const isLoggedIn = !!currentUser;

  return (
    <>
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('home')}
                className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                YouthGovTrack
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className={`font-medium transition-colors text-sm xl:text-base ${
                  currentPage === 'home' 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('projects')}
                className={`font-medium transition-colors text-sm xl:text-base ${
                  currentPage === 'projects' 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Projects
              </button>
              
              {/* Community Features - Only show when logged in */}
              {isLoggedIn && (
                <>
                  <button 
                    onClick={() => onNavigate('reports')}
                    className={`font-medium transition-colors text-sm xl:text-base ${
                      currentPage === 'reports' 
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Reports
                  </button>
                  <button 
                    onClick={() => onNavigate('champions')}
                    className={`font-medium transition-colors text-sm xl:text-base ${
                      currentPage === 'champions' 
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Champions
                  </button>
                </>
              )}
              
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm xl:text-base">
                About
              </a>
              
              {/* Auth Buttons / User Menu */}
              <div className="flex items-center space-x-3 ml-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-700">
                      Welcome, <span className="font-medium text-blue-600">{currentUser.firstName}</span>
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
                      onClick={() => handleAuthClick('login')}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick('register')}
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
              <button 
                onClick={() => onNavigate('home')}
                className={`font-medium transition-colors text-sm ${
                  currentPage === 'home' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('projects')}
                className={`font-medium transition-colors text-sm ${
                  currentPage === 'projects' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Projects
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">{currentUser.firstName}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors font-medium text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAuthClick('register')}
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
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === 'home' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  🏠 Home
                </button>
                <button 
                  onClick={() => {
                    onNavigate('projects');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === 'projects' 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  📊 Projects
                </button>
                
                {/* Community Features - Only show when logged in */}
                {isLoggedIn && (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('reports');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        currentPage === 'reports' 
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      📋 Reports
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('champions');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        currentPage === 'champions' 
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
                
                {/* Mobile Auth Section */}
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-600">
                        Logged in as <span className="font-medium text-blue-600">{currentUser.firstName} {currentUser.lastName}</span>
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
                          handleAuthClick('login');
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                      >
                        🔑 Sign In
                      </button>
                      <button
                        onClick={() => {
                          handleAuthClick('register');
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
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navbar;
