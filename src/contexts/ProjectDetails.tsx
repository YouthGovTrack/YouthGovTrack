import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from './ProjectContext';
import { Project } from '../services/mockApi';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface ProjectDetailsProps {
  projectId: number | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId }) => {
  console.log('[ProjectDetails] Rendered. projectId:', projectId);
  const navigate = useNavigate();
  const { projects, loading: projectsLoading } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        if (!projectsLoading) {
          const foundProject = projects.find(p => p.id === projectId);
          if (foundProject) {
            setProject(foundProject);
            setCurrentImageIndex(0); // Reset image index when project changes
            
            // Get related projects (same category, different project)
            const related = projects
              .filter(p => p.id !== projectId && p.category === foundProject.category)
              .slice(0, 3);
            setRelatedProjects(related);
          } else {
            setError('Project not found');
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, projects, projectsLoading]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!project?.images || project.images.length <= 1) return;

      if (event.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => 
          prev === 0 ? project.images!.length - 1 : prev - 1
        );
      } else if (event.key === 'ArrowRight') {
        setCurrentImageIndex(prev => 
          prev === project.images!.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [project?.images]);

  // Format image URL function
  const formatImageUrl = (url: string) => {
    if (!url) return '/citizen1.png';
    console.log('Processing image URL:', url);
    
    // If it's already a full URL, return as is
    if (url.startsWith('http')) return url;
    
    // If it's already a path starting with /, return as is
    if (url.startsWith('/')) return url;
    
    // For relative paths, add the correct prefix
    return `/uploads/${url}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
            ? "nd"
            : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
  };

  // If loading, error, or no project data, return early
  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>No project found</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 pt-16">
        {/* Back Button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate('/browse-projects')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Banner Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {/* Project Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-sm">{project.location}, {project.state}</span>
            </div>
          </div>
          
          {/* Project Image Gallery */}
          <div className="relative h-[280px]">
            {/* Main Image */}
            <img
              src={formatImageUrl(project.images && project.images.length > 0 ? project.images[currentImageIndex] : '')}
              alt={`${project.name} visualization ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Error loading project image:', (e.target as HTMLImageElement).src);
                (e.target as HTMLImageElement).src = '/citizen1.png';
              }}
            />

            {/* Navigation Arrows - Only show if there are multiple images */}
            {project.images && project.images.length > 1 && (
              <>
                {/* Previous Arrow */}
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? project.images!.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Arrow */}
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === project.images!.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {project.images && project.images.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}

            {/* Image Dots Indicator */}
            {project.images && project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute bottom-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700 shadow-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* Thumbnail Gallery - Only show if there are multiple images */}
          {project.images && project.images.length > 1 && (
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-blue-500 scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={formatImageUrl(image)}
                      alt={`${project.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/citizen1.png';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
            <div className="px-4 py-3 text-center">
              <div className="text-sm text-gray-500">Status</div>
              <div className={`mt-1 font-medium ${
                project.status === 'Completed' ? 'text-green-600' :
                project.status === 'Ongoing' ? 'text-blue-600' :
                'text-yellow-600'
              }`}>{project.status}</div>
            </div>
            <div className="px-4 py-3 text-center">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="mt-1 font-medium text-gray-900">{project.progress}%</div>
            </div>
            <div className="px-4 py-3 text-center">
              <div className="text-sm text-gray-500">Budget</div>
              <div className="mt-1 font-medium text-gray-900">₦{project.budget.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <main className='flex flex-col md:flex-row md:justify-between mainevent'>
          <article className='flex flex-col'>
            <h2 className='font-bold text-2xl mt-4'>{project.name}</h2>

            <h2 className='font-bold text-2xl mt-6'>Description</h2>
            <p className='mt-2 text-base'>{project.description}</p>

            <h2 className='font-bold text-2xl mt-8'>Project Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <img
                  src="/citizen1.png"
                  alt="Contractor"
                  className="w-24 h-24 rounded-full object-cover mb-3"
                  onError={(e) => {
                    console.error('Error loading contractor image:', (e.target as HTMLImageElement).src);
                    (e.target as HTMLImageElement).src = '/citizen1.png';
                  }}
                />
                <div className="text-center">
                  <h3 className="font-bold text-lg">{project.contractor}</h3>
                  <p className="text-gray-600 mt-1">Project Contractor</p>
                </div>
              </div>
            </div>

            <h2 className='font-bold text-2xl mt-8'>Date & Time</h2>
            <div className='flex items-center mt-2'>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className='font-semibold ml-4'>
                Start Date: {formatDate(project.startDate)}
              </p>
            </div>

            <div className='flex items-center mt-2'>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className='font-semibold ml-4'>
                Expected Completion: {formatDate(project.expectedCompletion)}
              </p>
            </div>

            {project.actualCompletion && (
              <div className='flex items-center mt-2'>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className='font-semibold ml-4 text-green-600'>
                  Completed: {formatDate(project.actualCompletion)}
                </p>
              </div>
            )}
          </article>

          <aside className='mt-10 md:mt-0 md:ml-10'>
            <h2 className='font-bold text-2xl'>Project Location</h2>

            <div className="mt-4">
              {project.location ? (
                <>
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="380"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${project.location}, ${project.lga}, ${project.state}`)}`}
                      allowFullScreen
                    />
                  </div>
                  <div className="mt-6 rounded-lg overflow-hidden">
                    <p className='h2 text-lg font-bold mt-4'>{project.location}</p>
                    <p className='text-lg font-medium text-gray-800 mt-2'>{project.lga}, {project.state}</p>
                  </div>
                </>
              ) : (
                <p className='font-semibold text-gray-500'>Location details not available</p>
              )}
            </div>

            <h2 className='h2 mt-6' style={{fontWeight: 'bold', fontSize: '25px'}}>Project Details & Info</h2>

            <p className='font-bold mt-4'>Status:</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
              project.status === 'Completed' ? 'bg-green-100 text-green-800' :
              project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
              project.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {project.status}
            </span>

            <p className='font-bold mt-4'>Category:</p>
            <p className='font-medium mt-1'>{project.category}</p>

            <p className='font-bold mt-4'>Budget:</p>
            <p className='font-bold mt-1 text-green-600'>₦{project.budget.toLocaleString()}</p>

            <p className='font-bold mt-4'>Progress:</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{project.progress}% Complete</p>
            </div>

            <p className='font-bold mt-4'>Beneficiaries:</p>
            <p className='font-bold mt-1'>{project.beneficiaries.toLocaleString()} people</p>

            <p className='font-bold mt-4'>Contact Info:</p>
            <p className='font-bold mt-4 p3'>{project.contractor || 'N/A'}</p>

            <p className='font-bold mt-4 mb-8'>Last Updated: {formatDate(project.updatedAt)}</p>
          </aside>
        </main>

        {/* Action Button */}
        <div className='flex justify-center mt-8 mb-8'>
          <button 
            className='bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300'
            onClick={() => navigate('/reports')}
          >
            Submit Report
          </button>
        </div>

        {/* Related Projects Section */}
        <main className='hidden md:flex flex-col' style={{width: '80%', margin: 'auto', marginTop: '3em'}}>
          <h3 className='' style={{color: '#463A93', fontWeight: 'bold', fontSize: '2em'}}>Explore Related Projects</h3>

          <section className='pastevents grid grid-cols-1 md:grid-cols-3 gap-8' style={{marginTop: '2em', marginBottom: '3em'}}>
            {relatedProjects.length === 0 ? (
              <p>No related projects found.</p>
            ) : (
              relatedProjects.map((relatedProject) => (
                <div 
                  key={relatedProject.id} 
                  className='flex flex-col items-center m-2 cursor-pointer hover:transform hover:scale-105 transition-all duration-300'
                  onClick={() => {
                    // Navigate to related project details
                    navigate(`/project-details/${relatedProject.id}`);
                  }}
                >
                  <img 
                    src={formatImageUrl(relatedProject.images && relatedProject.images.length > 0 ? relatedProject.images[0] : '')} 
                    alt={relatedProject.name}
                    style={{width: '350px', height: '200px', objectFit: 'cover', borderRadius: '20px'}}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/citizen1.png';
                    }}
                  />
                  <p className='font-bold mt-2 text-center'>{relatedProject.name}</p>
                  <p className='text-gray-600 text-sm mt-1 text-center'>{relatedProject.location}, {relatedProject.state}</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${relatedProject.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{relatedProject.progress}% Complete</p>
                </div>
              ))
            )}
          </section>
        </main>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetails;
