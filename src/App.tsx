import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

// Simple routing state management
type Page = 'home' | 'dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Just set initial page to home
        setCurrentPage('home');
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle navigation
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  // Show loading screen during initialization
  if (isLoading) {
    return <Loader />;
  }

  // Render current page content
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  // Update Navbar to handle navigation
  const NavbarWithNavigation: React.FC = () => (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigateTo('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              YouthGovTrack
            </button>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigateTo('home')}
              className={`font-medium transition ${
                currentPage === 'home' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">Projects</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">Reports</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">Resources</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">About</a>
            <button 
              onClick={() => navigateTo('dashboard')}
              className={`font-medium transition ${
                currentPage === 'dashboard' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarWithNavigation />
      
      <main className="flex-1">
        {renderPageContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
