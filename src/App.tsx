import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CommunityAlertForm from './components/CommunityAlertForm';
import Home from './pages/Home';
import BrowseProjects from './pages/BrowseProjects';
import Reports from './pages/Reports';
import Champions from './pages/Champions';
import Register from './pages/Register';
import Community from './pages/Community';

import ProjectDetails from './contexts/ProjectDetails';
import { ProjectProvider } from './contexts/ProjectContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { Plus } from 'react-feather';
import './styles/global.css';

// Simple routing state management
type Page = 'home' | 'browse-projects' | 'reports' | 'champions' | 'register' | 'project-details' | 'community';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertFormOpen, setIsAlertFormOpen] = useState(false);
  const [communityInitialTab, setCommunityInitialTab] = useState('dashboard');

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
  const navigateTo = (page: Page | string, projectId?: number) => {
    const targetPage = page as Page;
    
    // Handle project details navigation
    if (targetPage === 'project-details' && projectId) {
      setSelectedProjectId(projectId);
      setCurrentPage('project-details');
      return;
    }
    
    // Handle champions navigation - redirect to community with champions tab
    if (targetPage === 'champions') {
      setCommunityInitialTab('champions');
      setCurrentPage('community');
      return;
    }
    
    // Check if trying to access community features
    if (targetPage === 'reports' || targetPage === 'community') {
      const userData = localStorage.getItem('currentUser');
      if (!userData) {
        // Redirect to home if not logged in
        alert('Please sign in to access community features.');
        setCurrentPage('home');
        return;
      }
    }
    
    // Reset community tab for other pages
    if (targetPage !== 'community') {
      setCommunityInitialTab('dashboard');
    }
    
    // Only navigate to valid pages
    if (['home', 'browse-projects', 'reports', 'champions', 'register', 'project-details', 'community'].includes(targetPage)) {
      setCurrentPage(targetPage);
      if (targetPage !== 'project-details') {
        setSelectedProjectId(null); // Clear project ID when navigating away
      }
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
      case 'browse-projects':
        return <BrowseProjects onNavigate={navigateTo} />;
      case 'reports':
        return <Reports />;
      case 'champions':
        return <Champions onNavigate={navigateTo} />;
      case 'register':
        return <Register onNavigate={navigateTo} />;
      case 'community':
        return <Community onNavigate={navigateTo} initialTab={communityInitialTab} />;
      case 'project-details':
        return <ProjectDetails projectId={selectedProjectId} onNavigate={navigateTo} />;
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
  const isSpecialPage = currentPage === 'register' || currentPage === 'project-details' || currentPage === 'community';

  return (
    <AuthProvider>
      <NotificationProvider>
        <ProjectProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {!isSpecialPage && <NavbarWithNavigation />}
            
            <main className={`flex-1 ${!isSpecialPage ? 'pt-20' : ''}`}>
              {renderPageContent()}
            </main>
            
            {!isSpecialPage && <Footer />}

          {/* Floating Action Button for Community Alerts */}
          {!isSpecialPage && (
            <button
              onClick={() => setIsAlertFormOpen(true)}
              className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 z-40 group"
              title="Submit Community Alert"
            >
              <Plus size={24} className="transition-transform group-hover:rotate-180" />
            </button>
          )}

          {/* Community Alert Form Modal */}
          <CommunityAlertForm
            isOpen={isAlertFormOpen}
            onClose={() => setIsAlertFormOpen(false)}
          />
        </div>
      </ProjectProvider>
    </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
