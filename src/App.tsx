import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Projects from './pages/Projects';
import './styles/global.css';

// Simple routing state management
type Page = 'home' | 'projects';

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
      case 'projects':
        return <Projects />;
      default:
        return <Home />;
    }
  };

  // Update Navbar to handle navigation
  const NavbarWithNavigation: React.FC = () => (
    <Navbar 
      currentPage={currentPage}
      onNavigate={navigateTo}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarWithNavigation />
      
      <main className="flex-1 pt-20">
        {renderPageContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
