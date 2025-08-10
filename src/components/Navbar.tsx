import React, { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'projects') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
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
            <a href="#reports" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm xl:text-base">
              Reports
            </a>
            <a href="#resources" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm xl:text-base">
              Resources
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm xl:text-base">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm xl:text-base">
              Contact
            </a>
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
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
              Menu
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
              <a href="#reports" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors">
                📋 Reports
              </a>
              <a href="#resources" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors">
                📚 Resources
              </a>
              <a href="#about" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors">
                ℹ️ About
              </a>
              <a href="#contact" className="block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors">
                📞 Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
