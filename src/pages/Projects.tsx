import React, { useState } from 'react';
import SubmitReportModal from '../components/SubmitReportModal';
import ViewCivicAlertsModal from '../components/ViewCivicAlertsModal';

interface ProjectsProps {
  onNavigate?: (page: 'home' | 'projects' | 'browse-projects') => void;
}

const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [isSubmitReportOpen, setIsSubmitReportOpen] = useState(false);
  const [isViewAlertsOpen, setIsViewAlertsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projects Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your local government engagement and project reports</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                📊
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reports Submitted</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                ✅
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projects Followed</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                🏆
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Civic Points</p>
                <p className="text-2xl font-semibold text-gray-900">245</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                📍
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Local Issues</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Road maintenance completed</p>
                    <p className="text-xs text-gray-500">Submitted 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">School renovation progress</p>
                    <p className="text-xs text-gray-500">Submitted 1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Water supply issue reported</p>
                    <p className="text-xs text-gray-500">Submitted 2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Followed Projects</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">Ikeja Healthcare Center</p>
                  <p className="text-xs text-gray-500">85% complete • Healthcare</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">Surulere Road Project</p>
                  <p className="text-xs text-gray-500">45% complete • Infrastructure</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">School Renovation</p>
                  <p className="text-xs text-gray-500">92% complete • Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button 
            onClick={() => setIsSubmitReportOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            📝 Submit New Report
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('browse-projects')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            🔍 Browse Projects
          </button>
          <button 
            onClick={() => setIsViewAlertsOpen(true)}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition flex items-center gap-2"
          >
            🚨 View Civic Alerts
          </button>
        </div>

        {/* Modals */}
        <SubmitReportModal 
          isOpen={isSubmitReportOpen} 
          onClose={() => setIsSubmitReportOpen(false)} 
        />
        <ViewCivicAlertsModal 
          isOpen={isViewAlertsOpen} 
          onClose={() => setIsViewAlertsOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Projects;
