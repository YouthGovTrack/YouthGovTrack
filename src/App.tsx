
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';

// Wrapper to extract projectId from URL and pass as prop
function ProjectDetailsWrapper() {
  const params = useParams();
  const id = params.id;
  const projectId = id ? Number(id) : null;
  return <ProjectDetails projectId={projectId} />;
}
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
import OptimizedIcon from './components/OptimizedIcon';
import './styles/global.css';


const App: React.FC = () => {
  const [isAlertFormOpen, setIsAlertFormOpen] = useState(false);
  // For special layout pages
  const location = useLocation();
  const isSpecialPage = ['/register', '/project-details', '/community'].includes(location.pathname);
  console.log('[App] Rendered. location:', location.pathname, 'isSpecialPage:', isSpecialPage);

  return (
    <AuthProvider>
      <NotificationProvider>
        <ProjectProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {!isSpecialPage && <Navbar />}
            <main className={`flex-1 ${!isSpecialPage ? 'pt-20' : ''}`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse-projects" element={<BrowseProjects />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/champions" element={<Champions />} />
                <Route path="/register" element={<Register />} />
                <Route path="/community" element={<Community />} />
                <Route path="/project-details/:id" element={<ProjectDetailsWrapper />} />

                {/* Add more routes as needed */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            {!isSpecialPage && <Footer />}
            {/* Floating Action Button for Community Alerts */}
            {!isSpecialPage && (
              <button
                onClick={() => setIsAlertFormOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 z-40 group"
                title="Submit Community Alert"
              >
                <OptimizedIcon name="plus" size={24} className="transition-transform group-hover:rotate-180" />
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

const AppWithRouter: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
