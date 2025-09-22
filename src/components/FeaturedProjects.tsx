import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLink from './icons/ArrowLink';
import { useProjects } from '../contexts/ProjectContext';

interface FeaturedProjectsProps {
  onProjectClick?: (projectId: number) => void;
  onViewAllClick?: () => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ 
  onProjectClick, 
  onViewAllClick 
}) => {
  const { projects, loading } = useProjects();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600">Track the progress of government projects in your local government area</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading projects...</span>
            </div>
          ) : (
            projects.slice(0, 3).map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-[1.02] transition-all duration-200 relative"
                onClick={() => onProjectClick?.(project.id)}
              >
                <div className="h-48 bg-gray-50 flex items-center justify-center p-6">
                  <img 
                    src={project.images[0] || '/Healthcare.png'} 
                    alt={project.name} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500">📍 {project.lga}, {project.state}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm ${project.category === 'Healthcare' ? 'bg-blue-100 text-blue-800' : 
                      project.category === 'Infrastructure' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded`}>
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full ${
                        project.category === 'Healthcare' ? 'bg-blue-600' : 
                        project.category === 'Infrastructure' ? 'bg-red-600' : 
                        'bg-yellow-600'
                      }`}
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Budget: ₦{(project.budget / 1000000).toLocaleString()}M</span>
                    <span>End Date: {new Date(project.expectedCompletion).toLocaleDateString('en-NG', {month: 'short', year: 'numeric'})}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-8">
          <ArrowLink 
            className="bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
            onClick={onViewAllClick}
            isLink={false}
          >
            View All Projects
          </ArrowLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
