import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Projects from './pages/Projects';
import BrowseProjects from './pages/BrowseProjects';
import Reports from './pages/Reports';
import Champions from './pages/Champions';
import Register from './pages/Register';
import { ProjectProvider } from './contexts/ProjectContext';
import './styles/global.css';

// Simple routing state management
type Page = 'home' | 'projects' | 'browse-projects' | 'reports' | 'champions' | 'register';

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

  // Handle navigation with authentication check
  const navigateTo = (page: Page | string) => {
    const targetPage = page as Page;
    
    // Check if trying to access community features
    if (targetPage === 'reports' || targetPage === 'champions') {
      const userData = localStorage.getItem('currentUser');
      if (!userData) {
        // Redirect to home if not logged in
        alert('Please sign in to access community features.');
        setCurrentPage('home');
        return;
      }
    }
    
    // Only navigate to valid pages
    if (['home', 'projects', 'browse-projects', 'reports', 'champions', 'register'].includes(targetPage)) {
      setCurrentPage(targetPage);
    }
  };

  // Navigation wrapper for string parameters
  const navigateToString = (page: string) => {
    navigateTo(page);
  };

  // Show loading screen during initialization
  if (isLoading) {
    return <Loader />;
  }

  // Render current page content
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      case 'projects':
        return <Projects onNavigate={navigateTo} />;
      case 'browse-projects':
        return <BrowseProjects onNavigate={navigateTo} />;
      case 'reports':
        return <Reports />;
      case 'champions':
        return <Champions />;
      case 'register':
        return <Register onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  // Update Navbar to handle navigation
  const NavbarWithNavigation: React.FC = () => (
    <Navbar 
      currentPage={currentPage}
      onNavigate={navigateTo}
    />
  );

  // Check if current page needs special layout
  const isRegisterPage = currentPage === 'register';

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {!isRegisterPage && <NavbarWithNavigation />}
        
        <main className={`flex-1 ${!isRegisterPage ? 'pt-20' : ''}`}>
          {renderPageContent()}
        </main>
        
        {!isRegisterPage && <Footer />}
      </div>
    </ProjectProvider>
  );
};

export default App;
