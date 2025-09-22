import React, { useState, ErrorInfo, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommunityAlertForm from './components/CommunityAlertForm';
import Home from './pages/Home';
import About from './pages/About';
import Budget from './pages/Budget';
import BrowseProjects from './pages/BrowseProjects';
import Reports from './pages/Reports';
import ProjectDetails from './contexts/ProjectDetails';
import { ProjectProvider } from './contexts/ProjectContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import OptimizedIcon from './components/OptimizedIcon';
import './styles/global.css';

/**
 * State interface for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component that catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire application.
 */
class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state to render fallback UI when an error occurs
   * @param error - The error that was thrown
   * @returns Updated state with error flag
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error details for debugging purposes
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper component that extracts project ID from URL parameters and validates it
 * before passing to the ProjectDetails component.
 * @returns ProjectDetails component with validated projectId prop
 */
function ProjectDetailsWrapper() {
  const params = useParams();
  const id = params.id;
  
  // Validate and convert projectId to ensure it's a positive integer
  let projectId: number | null = null;
  if (id) {
    const parsedId = parseInt(id, 10);
    if (!isNaN(parsedId) && parsedId > 0) {
      projectId = parsedId;
    }
  }
  
  return <ProjectDetails projectId={projectId} />;
}

/**
 * Main application component that handles routing and layout logic.
 * Determines which pages should have special layouts (no navbar/footer).
 */
const App: React.FC = () => {
  const [isAlertFormOpen, setIsAlertFormOpen] = useState(false);
  const location = useLocation();
  
  // Determine if current page should use special layout (no navbar/footer)
  const isSpecialPage = location.pathname.startsWith('/project-details/');

  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <ProjectProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              {!isSpecialPage && <Navbar />}
              <main className={`flex-1 ${!isSpecialPage ? 'pt-20' : ''}`}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/browse-projects" element={<BrowseProjects />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/project-details/:id" element={<ProjectDetailsWrapper />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              {!isSpecialPage && <Footer />}
              {!isSpecialPage && (
                <button
                  onClick={() => setIsAlertFormOpen(true)}
                  className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 z-40 group"
                  title="Submit Community Alert"
                  aria-label="Submit Community Alert"
                >
                  <OptimizedIcon name="plus" size={24} className="transition-transform group-hover:rotate-180" />
                </button>
              )}
              <CommunityAlertForm
                isOpen={isAlertFormOpen}
                onClose={() => setIsAlertFormOpen(false)}
              />
            </div>
          </ProjectProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

/**
 * Root component that wraps the App with React Router for client-side routing
 */
const AppWithRouter: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;