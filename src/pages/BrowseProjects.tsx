import React, { useState, useEffect } from 'react';
import CitizenReportsModal from '../components/CitizenReportsModal';

interface Project {
  id: number;
  title: string;
  lga: string;
  state: string;
  budget: number;
  status: 'Completed' | 'Ongoing' | 'Abandoned';
  sector: string;
  description: string;
  fullDescription: string;
  startDate: string;
  completionDate: string;
  contractor: string;
  imageUrl?: string;
}

interface Filters {
  state: string;
  lga: string;
  status: string;
  sector: string;
  dateFrom: string;
  dateTo: string;
  searchQuery: string;
}

const BrowseProjects: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    state: '',
    lga: '',
    status: '',
    sector: '',
    dateFrom: '',
    dateTo: '',
    searchQuery: ''
  });
  const [selectedState, setSelectedState] = useState('');
  const [lgaOptions, setLgaOptions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showReportModal, setShowReportModal] = useState(false);
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

  const projects: Project[] = [
    {
      id: 1,
      title: "Community Health Center Renovation",
      lga: "Ikeja",
      state: "Lagos",
      budget: 25000000,
      status: "Completed",
      sector: "Health",
      description: "Renovation of the community health center to improve healthcare access.",
      fullDescription: "Complete renovation of the community health center including new equipment, expanded capacity, and improved facilities for maternal care. The project has significantly improved healthcare access for over 10,000 residents.",
      startDate: "2022-05-15",
      completionDate: "2023-01-20",
      contractor: "HealthBuild Nigeria Ltd",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Alimosho Road Expansion Project",
      lga: "Alimosho",
      state: "Lagos",
      budget: 120000000,
      status: "Ongoing",
      sector: "Roads",
      description: "Expansion of the main road connecting Alimosho to improve traffic flow.",
      fullDescription: "Major expansion of the 12km road connecting Alimosho to neighboring areas, including drainage systems, street lights, and pedestrian walkways. Expected to reduce travel time by 45% and benefit over 500,000 residents.",
      startDate: "2023-02-10",
      completionDate: "2024-06-30",
      contractor: "Lagos Roads Construction Company"
    },
    {
      id: 3,
      title: "Primary School Classroom Block",
      lga: "Obio/Akpor",
      state: "Rivers",
      budget: 35000000,
      status: "Completed",
      sector: "Education",
      description: "Construction of a new classroom block at the local primary school.",
      fullDescription: "Construction of a modern 8-classroom block with administrative offices, library, and computer room. The project has increased school capacity by 320 students and improved learning conditions.",
      startDate: "2022-03-01",
      completionDate: "2022-11-15",
      contractor: "EduBuild Construction Ltd"
    },
    {
      id: 4,
      title: "Borehole Water Project",
      lga: "Dala",
      state: "Kano",
      budget: 8500000,
      status: "Completed",
      sector: "Water",
      description: "Installation of boreholes to provide clean water access to the community.",
      fullDescription: "Installation of 5 solar-powered boreholes with water treatment facilities and distribution points across the community. Now providing clean water to approximately 7,500 residents.",
      startDate: "2023-01-05",
      completionDate: "2023-04-20",
      contractor: "AquaTech Solutions"
    },
    {
      id: 5,
      title: "Youth Skills Acquisition Center",
      lga: "Aba South",
      state: "Abia",
      budget: 45000000,
      status: "Ongoing",
      sector: "Education",
      description: "Construction and equipping of a skills acquisition center for youth training.",
      fullDescription: "Development of a comprehensive skills acquisition center with facilities for digital skills, fashion design, carpentry, welding, and agricultural training. Expected to train 500 youths annually.",
      startDate: "2023-06-12",
      completionDate: "2024-03-30",
      contractor: "BuildRight Construction Company"
    },
    {
      id: 6,
      title: "Rural Electrification Project",
      lga: "Demsa",
      state: "Adamawa",
      budget: 75000000,
      status: "Abandoned",
      sector: "Power",
      description: "Extension of power grid to rural communities in Demsa LGA.",
      fullDescription: "Project aimed to extend the national power grid to 12 rural communities in Demsa LGA, benefiting approximately 25,000 residents. Project was abandoned after completing only 30% of the planned work due to funding issues.",
      startDate: "2021-08-15",
      completionDate: "2022-12-31",
      contractor: "PowerGrid Solutions Ltd"
    },
    {
      id: 7,
      title: "Market Expansion and Modernization",
      lga: "Port Harcourt",
      state: "Rivers",
      budget: 95000000,
      status: "Ongoing",
      sector: "Commerce",
      description: "Expansion and modernization of the central market facilities.",
      fullDescription: "Comprehensive expansion and modernization of the central market including 200 new stalls, improved drainage, waste management systems, and security infrastructure. Will benefit over 1,500 traders and improve commercial activities.",
      startDate: "2023-04-20",
      completionDate: "2024-05-15",
      contractor: "Urban Development Consortium"
    },
    {
      id: 8,
      title: "Primary Healthcare Clinic",
      lga: "Kosofe",
      state: "Lagos",
      budget: 32000000,
      status: "Completed",
      sector: "Health",
      description: "Construction of a new primary healthcare clinic to serve the local community.",
      fullDescription: "Construction of a fully equipped primary healthcare clinic with maternal care facilities, vaccination unit, laboratory, and pharmacy. Now serving approximately 15,000 residents with basic healthcare services.",
      startDate: "2022-07-10",
      completionDate: "2023-03-25",
      contractor: "MedBuild Construction Nigeria"
    },
    {
      id: 9,
      title: "Irrigation System for Smallholder Farmers",
      lga: "Garun Mallam",
      state: "Kano",
      budget: 55000000,
      status: "Ongoing",
      sector: "Agriculture",
      description: "Development of irrigation infrastructure for small-scale farming communities.",
      fullDescription: "Implementation of a modern irrigation system covering 500 hectares of farmland, benefiting approximately 350 smallholder farmers. Expected to increase agricultural productivity by up to 70% and enable year-round farming.",
      startDate: "2023-01-15",
      completionDate: "2024-02-28",
      contractor: "AgroTech Development Ltd"
    },
    {
      id: 10,
      title: "Secondary School Science Laboratory",
      lga: "Umuahia North",
      state: "Abia",
      budget: 28000000,
      status: "Abandoned",
      sector: "Education",
      description: "Construction and equipping of science laboratories for secondary schools.",
      fullDescription: "Project intended to build and equip modern science laboratories in 5 secondary schools across Umuahia North. Construction was abandoned after completing only 2 laboratories due to contractual disputes.",
      startDate: "2022-02-20",
      completionDate: "2022-10-30",
      contractor: "EduInfra Solutions"
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

  const filteredProjects = projects.filter(project => {
    const stateMatch = !filters.state || project.state === filters.state;
    const lgaMatch = !filters.lga || project.lga === filters.lga;
    const statusMatch = !filters.status || project.status === filters.status;
    const sectorMatch = !filters.sector || project.sector === filters.sector;
    const searchMatch = !filters.searchQuery || 
      project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return stateMatch && lgaMatch && statusMatch && sectorMatch && searchMatch;
  });

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
      sector: '',
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
            </div>
            <div className="flex items-center gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <select
                    name="sector"
                    value={filters.sector}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Sectors</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Roads">Roads</option>
                    <option value="Water">Water</option>
                    <option value="Power">Power</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Agriculture">Agriculture</option>
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
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{project.title}</h3>
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
                          <span className="text-gray-500">Sector:</span>
                          <span className="text-gray-900 font-medium">{project.sector}</span>
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
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                          View Details
                        </button>
                        <button
                          onClick={() => handleReportProject(project)}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                          title="Report project status"
                        >
                          📝
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
                          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
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
                            <span className="text-gray-500">Sector:</span>
                            <span className="text-gray-900 font-medium ml-1">{project.sector}</span>
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
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                          View Details
                        </button>
                        <button
                          onClick={() => handleReportProject(project)}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                          title="Report project status"
                        >
                          📝 Report
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
          </div>
        </div>
      </div>

      {/* Citizen Report Modal */}
      <CitizenReportsModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setSelectedProject(null);
        }}
        projectId={selectedProject?.id.toString()}
        projectTitle={selectedProject?.title}
      />
    </div>
  );
};

export default BrowseProjects;
