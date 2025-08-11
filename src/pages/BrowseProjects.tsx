import React, { useState, useEffect } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import { Project, ProjectFilters } from '../services/mockApi';
import CitizenReportsModal from '../components/CitizenReportsModal';
import SubmitProjectModal from '../components/SubmitProjectModal';

interface Filters {
  state: string;
  lga: string;
  status: string;
  category: string;
  dateFrom: string;
  dateTo: string;
  searchQuery: string;
}

interface BrowseProjectsProps {
  onNavigate: (page: string, projectId?: number) => void;
}

const BrowseProjects: React.FC<BrowseProjectsProps> = ({ onNavigate }) => {
  const { projects, loading, error, stats, total, fetchProjects, clearError } = useProjects();
  
  const [filters, setFilters] = useState<Filters>({
    state: '',
    lga: '',
    status: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    searchQuery: ''
  });
  const [selectedState, setSelectedState] = useState('');
  const [lgaOptions, setLgaOptions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const nigeriaStates = [
    {
      name: 'Abia',
      lgas: ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi']
    },
    {
      name: 'Adamawa',
      lgas: ['Demsa', 'Fufure', 'Ganye', 'Gayuk', 'Gombi', 'Grie', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South']
    },
    {
      name: 'Lagos',
      lgas: ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere']
    },
    {
      name: 'Rivers',
      lgas: ['Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 'Bonny', 'Degema', 'Eleme', 'Emuoha', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 'Oyigbo', 'Port Harcourt', 'Tai']
    },
    {
      name: 'Kano',
      lgas: ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nassarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil']
    }
  ];

  // Update LGA options when state changes
  useEffect(() => {
    if (selectedState) {
      const state = nigeriaStates.find(s => s.name === selectedState);
      setLgaOptions(state ? state.lgas : []);
      setFilters({
        ...filters,
        state: selectedState,
        lga: ''
      });
    } else {
      setLgaOptions([]);
      setFilters({
        ...filters,
        state: '',
        lga: ''
      });
    }
  }, [selectedState]);

  // Fetch projects when filters change
  useEffect(() => {
    const projectFilters: ProjectFilters = {
      state: filters.state || undefined,
      category: filters.category || undefined,
      status: filters.status as any || undefined,
      search: filters.searchQuery || undefined
    };
    
    fetchProjects(projectFilters);
  }, [filters, fetchProjects]);

  // Clear error when component unmounts or filters change
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const filteredProjects = projects;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    setSelectedState('');
    setFilters({
      state: '',
      lga: '',
      status: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      searchQuery: ''
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      Completed: 'bg-green-100 text-green-800',
      Ongoing: 'bg-blue-100 text-blue-800',
      Abandoned: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const handleReportProject = (project: Project) => {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      alert('Please sign in to submit project reports. Join our community to help track government projects!');
      return;
    }
    
    setSelectedProject(project);
    setShowReportModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Projects</h1>
              <p className="mt-2 text-gray-600">Explore government projects across all states and sectors</p>
              {stats && (
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>Total: {stats.totalProjects}</span>
                  <span>Completed: {stats.completedProjects}</span>
                  <span>Ongoing: {stats.ongoingProjects}</span>
                  <span>Budget: ₦{(stats.totalBudget / 1000000000).toFixed(1)}B</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                + Submit Project
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={clearError}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All States</option>
                    {nigeriaStates.map(state => (
                      <option key={state.name} value={state.name}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LGA</label>
                  <select
                    name="lga"
                    value={filters.lga}
                    onChange={handleFilterChange}
                    disabled={!selectedState}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">All LGAs</option>
                    {lgaOptions.map(lga => (
                      <option key={lga} value={lga}>{lga}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Abandoned">Abandoned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Categories</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Technology">Technology</option>
                    <option value="Housing">Housing</option>
                    <option value="Environment">Environment</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      name="dateFrom"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="date"
                      name="dateTo"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading projects...</span>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    Showing {filteredProjects.length} of {total} projects
                  </p>
                </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {project.images && project.images.length > 0 && (
                      <img 
                        src={project.images[0]} 
                        alt={project.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{project.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-600 text-sm">{project.description}</p>
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
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Contractor:</span>
                          <span className="text-gray-900 font-medium">{project.contractor}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Start Date:</span>
                          <span className="text-gray-900 font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                        {project.progress > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Progress:</span>
                            <span className="text-gray-900 font-medium">{project.progress}%</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReportProject(project)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                          title="Report project status"
                        >
                          📝 Report Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <span className="text-gray-900 font-medium ml-1">{project.lga}, {project.state}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Category:</span>
                            <span className="text-gray-900 font-medium ml-1">{project.category}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Budget:</span>
                            <span className="text-gray-900 font-semibold ml-1">{formatCurrency(project.budget)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Contractor:</span>
                            <span className="text-gray-900 font-medium ml-1">{project.contractor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-6">
                        <button
                          onClick={() => handleReportProject(project)}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                          title="Report project status"
                        >
                          📝 Report Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more projects.</p>
              </div>
            )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Submit Project Modal */}
      <SubmitProjectModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
      />

      {/* Citizen Report Modal */}
      <CitizenReportsModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setSelectedProject(null);
        }}
        projectId={selectedProject?.id.toString()}
        projectTitle={selectedProject?.name}
      />
    </div>
  );
};

export default BrowseProjects;
