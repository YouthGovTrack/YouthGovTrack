import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProjects } from '../contexts/ProjectContext';
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../services/mockApi';
import ArrowLink from './icons/ArrowLink';

interface CommunityProjectsProps {
  filterByUserLocation?: boolean;
}

const CommunityProjects: React.FC<CommunityProjectsProps> = ({ filterByUserLocation = true }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, loading, fetchProjects } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects with user's state filter if needed
    if (filterByUserLocation && user?.state) {
      fetchProjects({ state: user.state });
    } else {
      fetchProjects();
    }
  }, [filterByUserLocation, user?.state, fetchProjects]);

  useEffect(() => {
    // Filter projects based on user location
    if (filterByUserLocation && user?.state) {
      const userProjects = projects.filter(project => 
        project.state === user.state && 
        (!user.lga || project.lga === user.lga)
      );
      setFilteredProjects(userProjects);
    } else {
      setFilteredProjects(projects);
    }
  }, [projects, filterByUserLocation, user?.state, user?.lga]);

  const getStatusColor = (status: string) => {
    const statusColors = {
      Completed: 'bg-green-100 text-green-800',
      Ongoing: 'bg-blue-100 text-blue-800',
      Abandoned: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading projects...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filterByUserLocation && user?.state 
                ? `Projects in ${user.state}${user?.lga ? `, ${user.lga}` : ''}`
                : 'All Projects'
              }
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <ArrowLink
            onClick={() => navigate('/browse-projects')}
            className="bg-blue-600 text-white hover:bg-blue-700"
            isLink={false}
          >
            View All Projects
          </ArrowLink>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">
            {filterByUserLocation && user?.state 
              ? `No projects found in ${user.state}${user?.lga ? `, ${user.lga}` : ''}.`
              : 'No projects available at the moment.'
            }
          </p>
          <ArrowLink
            onClick={() => navigate('/browse-projects')}
            className="bg-blue-600 text-white hover:bg-blue-700"
            isLink={false}
          >
            Explore All Projects
          </ArrowLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {project.images && project.images.length > 0 && (
                <img 
                  src={project.images[0]} 
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                    {project.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} ml-2 whitespace-nowrap`}>
                    {project.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-900 font-medium">{project.lga}, {project.state}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-900 font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Budget:</span>
                    <span className="text-gray-900 font-semibold">{formatCurrency(project.budget)}</span>
                  </div>
                  {project.progress > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress:</span>
                      <span className="text-gray-900 font-medium">{project.progress}%</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <ArrowLink
                    onClick={() => navigate(`/project-details/${project.id}`)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    isLink={false}
                  >
                    View Details
                  </ArrowLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {filteredProjects.length > 6 && (
        <div className="text-center">
          <ArrowLink
            onClick={() => navigate('/browse-projects')}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            isLink={false}
          >
            View All {filteredProjects.length} Projects
          </ArrowLink>
        </div>
      )}
    </motion.div>
  );
};

export default CommunityProjects;
