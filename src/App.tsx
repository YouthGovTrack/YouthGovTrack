import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { getAuthState } from './utils/auth';
import './styles/global.css';

// Simple routing state management
type Page = 'home' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize app and check authentication
    const initializeApp = async () => {
      try {
        const authState = getAuthState();
        setIsAuthenticated(authState.isAuthenticated);
        
        // Set initial page based on auth state
        if (authState.isAuthenticated) {
          setCurrentPage('dashboard');
        } else {
          setCurrentPage('home');
        }
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

  // Handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigateTo('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('home');
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
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard /> : <Login onLoginSuccess={handleLoginSuccess} />;
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
            {isAuthenticated && (
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
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Welcome back!</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigateTo('login')}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === 'login'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Sign In
              </button>
            )}
          </div>
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
