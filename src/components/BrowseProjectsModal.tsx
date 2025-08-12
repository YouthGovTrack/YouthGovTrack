import React, { useState } from 'react';
import ArrowLink from './icons/ArrowLink';

interface BrowseProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string, projectId?: number) => void;
}

const BrowseProjectsModal: React.FC<BrowseProjectsModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Ikeja General Hospital Expansion",
      category: "Healthcare",
      state: "Lagos",
      lga: "Ikeja",
      progress: 75,
      budget: "₦2.5B",
      startDate: "Jan 2024",
      expectedCompletion: "Dec 2024",
      status: "On Track",
      description: "Expansion of emergency ward and acquisition of modern medical equipment"
    },
    {
      id: 2,
      title: "Surulere-Ikoyi Bridge Reconstruction",
      category: "Infrastructure",
      state: "Lagos",
      lga: "Surulere",
      progress: 45,
      budget: "₦8.2B",
      startDate: "Mar 2024",
      expectedCompletion: "Jun 2025",
      status: "Delayed",
      description: "Complete reconstruction of the bridge with improved traffic flow design"
    },
    {
      id: 3,
      title: "Abuja Primary School Renovation",
      category: "Education",
      state: "FCT",
      lga: "Abuja Municipal",
      progress: 90,
      budget: "₦450M",
      startDate: "Oct 2023",
      expectedCompletion: "Aug 2024",
      status: "Near Completion",
      description: "Renovation of 15 primary schools with modern facilities and IT equipment"
    },
    {
      id: 4,
      title: "Kano Water Treatment Plant",
      category: "Infrastructure",
      state: "Kano",
      lga: "Kano Municipal",
      progress: 30,
      budget: "₦3.8B",
      startDate: "May 2024",
      expectedCompletion: "Dec 2025",
      status: "On Track",
      description: "Construction of modern water treatment facility to serve 500,000 residents"
    },
    {
      id: 5,
      title: "Port Harcourt Road Network",
      category: "Infrastructure",
      state: "Rivers",
      lga: "Port Harcourt",
      progress: 60,
      budget: "₦5.1B",
      startDate: "Feb 2024",
      expectedCompletion: "Nov 2024",
      status: "On Track",
      description: "Reconstruction of major road networks and installation of street lights"
    },
    {
      id: 6,
      title: "Kaduna Healthcare Initiative",
      category: "Healthcare",
      state: "Kaduna",
      lga: "Kaduna North",
      progress: 85,
      budget: "₦1.2B",
      startDate: "Sep 2023",
      expectedCompletion: "Sep 2024",
      status: "Near Completion",
      description: "Establishment of 10 new primary healthcare centers across rural areas"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory;
    const stateMatch = selectedState === 'all' || project.state === selectedState;
    return categoryMatch && stateMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'Near Completion':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (progress >= 50) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="p-6 pt-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Government Projects</h2>
              <p className="text-gray-600">Discover and track public infrastructure projects in your area</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                >
                  <option value="all">All Categories</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Filter by State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                >
                  <option value="all">All States</option>
                  <option value="Lagos">Lagos</option>
                  <option value="FCT">FCT</option>
                  <option value="Kano">Kano</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Kaduna">Kaduna</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Project Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">{project.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusColor(project.status)} shadow-sm`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Location</span>
                      </div>
                      <span className="font-semibold text-gray-900">{project.lga}, {project.state}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span>Budget</span>
                      </div>
                      <span className="font-bold text-green-600 text-lg">{project.budget}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Timeline</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{project.startDate} - {project.expectedCompletion}</span>
                    </div>

                    {/* Progress Section */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>Progress</span>
                        </div>
                        <span className="font-bold text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(project.progress)} shadow-sm relative overflow-hidden`}
                          style={{ width: `${project.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <ArrowLink 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      isLink={false}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Follow Project
                      </span>
                    </ArrowLink>
                    <ArrowLink 
                      onClick={() => {
                        // Add report functionality here
                        onClose();
                      }}
                      className="bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-200 text-sm font-medium border border-green-200 hover:border-green-300"
                      isLink={false}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Report Status
                      </span>
                    </ArrowLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 max-w-md mx-auto">We couldn't find any projects matching your current filter criteria. Try adjusting your filters or search terms.</p>
            </div>
          )}

          <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProjectsModal;
