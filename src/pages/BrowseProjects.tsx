import React, { useState } from 'react';

const BrowseProjects: React.FC = () => {
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedLGA, setSelectedLGA] = useState('All LGAs');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: "Community Health Center Renovation",
      location: "Ikeja, Lagos",
      sector: "Health",
      budget: "₦25,000,000",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      description: "Renovation of the local community health center to improve healthcare access in the area.",
      progress: 100,
      category: "Healthcare"
    },
    {
      id: 2,
      title: "Alimosho Road Expansion Project",
      location: "Alimosho, Lagos",
      sector: "Roads",
      budget: "₦120,000,000",
      status: "Ongoing",
      statusColor: "bg-blue-100 text-blue-800",
      description: "Expansion of the main road connecting Alimosho to other major areas for better traffic flow.",
      progress: 65,
      category: "Infrastructure"
    },
    {
      id: 3,
      title: "Primary School Classroom Block",
      location: "Obio/Akpor, Rivers",
      sector: "Education",
      budget: "₦35,000,000",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      description: "Construction of a new classroom block at the local primary school.",
      progress: 100,
      category: "Education"
    },
    {
      id: 4,
      title: "Borehole Water Project",
      location: "Dala, Kano",
      sector: "Water",
      budget: "₦8,500,000",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      description: "Installation of boreholes to provide clean water access to rural communities.",
      progress: 100,
      category: "Infrastructure"
    },
    {
      id: 5,
      title: "Youth Skills Acquisition Center",
      location: "Jos South, Abia",
      sector: "Education",
      budget: "₦45,000,000",
      status: "Ongoing",
      statusColor: "bg-blue-100 text-blue-800",
      description: "Construction and equipping of a skills acquisition center for youth development.",
      progress: 70,
      category: "Education"
    },
    {
      id: 6,
      title: "Rural Electrification Project",
      location: "Demsa, Adamawa",
      sector: "Power",
      budget: "₦75,000,000",
      status: "Ongoing",
      statusColor: "bg-blue-100 text-blue-800",
      description: "Extension of power grid to rural communities in Demsa local government area.",
      progress: 45,
      category: "Infrastructure"
    },
    {
      id: 7,
      title: "Market Expansion and Modernization",
      location: "Port Harcourt, Rivers",
      sector: "Commerce",
      budget: "₦95,000,000",
      status: "Ongoing",
      statusColor: "bg-blue-100 text-blue-800",
      description: "Expansion and modernization of the central market with modern facilities.",
      progress: 55,
      category: "Infrastructure"
    },
    {
      id: 8,
      title: "Primary Healthcare Clinic",
      location: "Keffi, Lagos",
      sector: "Health",
      budget: "₦32,000,000",
      status: "Ongoing",
      statusColor: "bg-blue-100 text-blue-800",
      description: "Construction of a new primary healthcare clinic to serve rural communities.",
      progress: 80,
      category: "Healthcare"
    },
    {
      id: 9,
      title: "Irrigation System for Smallholder Farmers",
      location: "Daura Mallam, Kano",
      sector: "Agriculture",
      budget: "₦55,000,000",
      status: "Ongoing",
      statusColor: "bg-blue-100 text-blue-800",
      description: "Development of irrigation infrastructure for small-scale farming communities.",
      progress: 40,
      category: "Agriculture"
    },
    {
      id: 10,
      title: "Secondary School Science Laboratory",
      location: "Umuahia North, Abia",
      sector: "Education",
      budget: "₦26,000,000",
      status: "Abandoned",
      statusColor: "bg-red-100 text-red-800",
      description: "Construction and equipping of science laboratories for secondary education.",
      progress: 25,
      category: "Education"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const stateMatch = selectedState === 'All States' || project.location.includes(selectedState);
    const statusMatch = selectedStatus === 'All Statuses' || project.status === selectedStatus;
    const sectorMatch = selectedSector === 'All Sectors' || project.sector === selectedSector;
    const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return stateMatch && statusMatch && sectorMatch && searchMatch;
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <span>🏠 Home</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Projects</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Projects in Your LGA</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">🔽 Filters</h3>
                <button className="text-blue-600 text-sm hover:text-blue-800">Clear All</button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location Filters */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Location</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All States">All States</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Kano">Kano</option>
                      <option value="Abia">Abia</option>
                      <option value="Adamawa">Adamawa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">LGA</label>
                    <select
                      value={selectedLGA}
                      onChange={(e) => setSelectedLGA(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All LGAs">All LGAs</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Project Status */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Project Status</h4>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Abandoned">Abandoned</option>
                </select>
              </div>

              {/* Sector */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sector</h4>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All Sectors">All Sectors</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Roads">Roads</option>
                  <option value="Water">Water</option>
                  <option value="Power">Power</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Commerce">Commerce</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Date Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">From</label>
                    <input
                      type="date"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">To</label>
                    <input
                      type="date"
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{filteredProjects.length} Projects Found</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ongoing</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
            </div>

            {/* Projects Grid */}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🏗️</div>
                      <p className="text-sm">Project Image</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.statusColor} whitespace-nowrap ml-2`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">📍 {project.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sector: {project.sector}</span>
                        <span className="font-medium text-gray-900">{project.budget}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    {/* Progress Bar */}
                    {project.status === 'Ongoing' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
                      View more ⌄
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProjects;
