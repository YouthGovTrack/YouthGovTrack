import React, { useState, useEffect } from 'react';
import LazyImage from './LazyImage';

interface CitizenReport {
  id: string;
  projectId: string;
  projectTitle: string;
  reporterName: string;
  reporterEmail: string;
  reportType: 'progress_update' | 'issue' | 'completion' | 'abandonment' | 'quality_concern';
  description: string;
  images: string[];
  location: {
    state: string;
    lga: string;
    address?: string;
  };
  status: 'pending' | 'verified' | 'investigating' | 'resolved';
  submitDate: string;
  verifiedBy?: string;
  championNotes?: string;
}

const ReportsDashboard: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<CitizenReport[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    reportType: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  });
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);

  // Sample data - in real app, this would come from API
  useEffect(() => {
    const loadReports = () => {
      // Load from localStorage first
      const storedReports: CitizenReport[] = JSON.parse(localStorage.getItem('citizenReports') || '[]');
      
      const sampleReports: CitizenReport[] = [
        {
          id: '1',
          projectId: '1',
          projectTitle: 'Community Health Center Renovation',
          reporterName: 'Anonymous',
          reporterEmail: 'reporter1@email.com',
          reportType: 'progress_update',
          description: 'The health center renovation is progressing well. New windows have been installed and the roof repairs are almost complete. Expected completion in 2 weeks.',
          images: [],
          location: {
            state: 'Lagos',
            lga: 'Ikeja',
            address: 'Behind Local Government Secretariat'
          },
          status: 'verified',
          submitDate: '2025-08-05T10:30:00Z',
          verifiedBy: 'Adebayo Olamide',
          championNotes: 'Confirmed during site visit. Progress matches reported status.'
        },
        {
          id: '2',
          projectId: '2',
          projectTitle: 'Alimosho Road Expansion Project',
          reporterName: 'Mrs. Sarah Johnson',
          reporterEmail: 'sarah.j@email.com',
          reportType: 'issue',
          description: 'The road construction equipment has been sitting idle for the past 3 weeks. Workers mentioned they are waiting for materials but no official update has been provided.',
          images: [],
          location: {
            state: 'Lagos',
            lga: 'Alimosho',
            address: 'Akowonjo Junction area'
          },
          status: 'investigating',
          submitDate: '2025-08-03T14:15:00Z',
          verifiedBy: 'David Okafor',
          championNotes: 'Investigating with contractor. Material delivery delayed due to supply chain issues.'
        },
        {
          id: '3',
          projectId: '4',
          projectTitle: 'Borehole Water Project',
          reporterName: 'Ibrahim Musa',
          reporterEmail: 'ibrahim.m@email.com',
          reportType: 'completion',
          description: 'The borehole project has been completed and is now providing clean water to our community. The installation was done professionally and the water quality is excellent.',
          images: [],
          location: {
            state: 'Kano',
            lga: 'Dala',
            address: 'Central Market Area'
          },
          status: 'verified',
          submitDate: '2025-08-01T09:20:00Z',
          verifiedBy: 'Fatima Ibrahim',
          championNotes: 'Project completion confirmed. Water quality tested and approved.'
        },
        {
          id: '4',
          projectId: '10',
          projectTitle: 'Secondary School Science Laboratory',
          reporterName: 'Anonymous',
          reporterEmail: 'concerned.parent@email.com',
          reportType: 'abandonment',
          description: 'The science laboratory construction at Government Secondary School has been abandoned for over 6 months. The building is half-completed and materials are being stolen.',
          images: [],
          location: {
            state: 'Abia',
            lga: 'Umuahia North',
            address: 'Government Secondary School, Umuahia'
          },
          status: 'pending',
          submitDate: '2025-07-28T16:45:00Z'
        },
        {
          id: '5',
          projectId: '3',
          projectTitle: 'Primary School Classroom Block',
          reporterName: 'Teacher Mary Okoro',
          reporterEmail: 'mary.okoro@email.com',
          reportType: 'quality_concern',
          description: 'The newly completed classroom block has poor ventilation and the windows don\'t close properly. During rain, water enters the classrooms making them unusable.',
          images: [],
          location: {
            state: 'Rivers',
            lga: 'Obio/Akpor',
            address: 'St. Patrick\'s Primary School'
          },
          status: 'investigating',
          submitDate: '2025-07-25T11:30:00Z',
          verifiedBy: 'Chuka Okonkwo',
          championNotes: 'Scheduled site inspection for next week to assess quality issues.'
        }
      ];
      
      // Combine stored reports (newer ones first) with sample reports
      const allReports = [...storedReports, ...sampleReports.filter((sample: CitizenReport) => 
        !storedReports.some((stored: CitizenReport) => stored.id === sample.id)
      )];
      
      setReports(allReports);
      setFilteredReports(allReports);
    };

    loadReports();

    // Listen for storage changes for real-time updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'citizenReports') {
        loadReports();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (filters.status) {
      filtered = filtered.filter(report => report.status === filters.status);
    }
    if (filters.reportType) {
      filtered = filtered.filter(report => report.reportType === filters.reportType);
    }
    if (filters.location) {
      filtered = filtered.filter(report => 
        report.location.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        report.location.lga.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(report => 
        new Date(report.submitDate) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(report => 
        new Date(report.submitDate) <= new Date(filters.dateTo)
      );
    }

    setFilteredReports(filtered);
  }, [filters, reports]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      reportType: '',
      location: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getReportTypeInfo = (type: string) => {
    const types = {
      progress_update: { icon: '📈', label: 'Progress Update', color: 'text-blue-600' },
      issue: { icon: '⚠️', label: 'Issue Report', color: 'text-red-600' },
      completion: { icon: '✅', label: 'Completion', color: 'text-green-600' },
      abandonment: { icon: '🚫', label: 'Abandonment', color: 'text-red-600' },
      quality_concern: { icon: '🔍', label: 'Quality Concern', color: 'text-orange-600' }
    };
    return types[type as keyof typeof types] || { icon: '📄', label: 'Report', color: 'text-gray-600' };
  };

  const getStatsData = () => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const verified = reports.filter(r => r.status === 'verified').length;
    const investigating = reports.filter(r => r.status === 'investigating').length;
    const resolved = reports.filter(r => r.status === 'resolved').length;

    return { total, pending, verified, investigating, resolved };
  };

  const stats = getStatsData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Citizen Reports Dashboard</h2>
          <p className="text-gray-600 mt-1">Track and manage community-submitted project reports</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Reports</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-800">{stats.pending}</div>
          <div className="text-sm text-yellow-700">Pending Review</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-800">{stats.verified}</div>
          <div className="text-sm text-green-700">Verified</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-800">{stats.investigating}</div>
          <div className="text-sm text-blue-700">Investigating</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-800">{stats.resolved}</div>
          <div className="text-sm text-purple-700">Resolved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <div>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="progress_update">Progress Update</option>
              <option value="issue">Issue Report</option>
              <option value="completion">Completion</option>
              <option value="abandonment">Abandonment</option>
              <option value="quality_concern">Quality Concern</option>
            </select>
          </div>
          
          <div>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filter by location..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
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

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const typeInfo = getReportTypeInfo(report.reportType);
          return (
            <div
              key={report.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-lg ${typeInfo.color}`}>{typeInfo.icon}</span>
                    <h3 className="font-semibold text-gray-900">{report.projectTitle}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Type:</span> {typeInfo.label}
                    </div>
                    <div>
                      <span className="font-medium">Reporter:</span> {report.reporterName}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {report.location.lga}, {report.location.state}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-2">{report.description}</p>
                  
                  {/* Display images if any */}
                  {report.images && report.images.length > 0 && (
                    <div className="mt-2 flex space-x-2">
                      {report.images.slice(0, 3).map((image, imgIndex) => (
                        <LazyImage
                          key={imgIndex}
                          src={image}
                          alt={`Report image ${imgIndex + 1}`}
                          className="w-12 h-12 object-cover rounded border border-gray-200"
                        />
                      ))}
                      {report.images.length > 3 && (
                        <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-600">
                          +{report.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {report.championNotes && (
                    <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-800 font-medium">Champion Notes:</div>
                      <div className="text-xs text-blue-700">{report.championNotes}</div>
                    </div>
                  )}
                </div>
                
                <div className="text-right text-sm text-gray-500 ml-4">
                  <div>{new Date(report.submitDate).toLocaleDateString()}</div>
                  <div>{new Date(report.submitDate).toLocaleTimeString()}</div>
                  {report.verifiedBy && (
                    <div className="text-xs text-green-600 mt-1">
                      Verified by {report.verifiedBy}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more reports.</p>
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Report Details</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Project</h4>
                  <p className="text-gray-700">{selectedReport.projectTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Report Type</h4>
                    <p className="text-gray-700">{getReportTypeInfo(selectedReport.reportType).label}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Status</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Reporter</h4>
                  <p className="text-gray-700">{selectedReport.reporterName}</p>
                  <p className="text-sm text-gray-500">{selectedReport.reporterEmail}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-gray-700">
                    {selectedReport.location.lga}, {selectedReport.location.state}
                    {selectedReport.location.address && (
                      <span className="block text-sm text-gray-600">{selectedReport.location.address}</span>
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedReport.description}</p>
                </div>

                {/* Display images if any */}
                {selectedReport.images && selectedReport.images.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900">Supporting Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {selectedReport.images.map((image, index) => (
                        <LazyImage
                          key={index}
                          src={image}
                          alt={`Report image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80"
                          onClick={() => window.open(image, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport.championNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900">Champion Notes</h4>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-800">{selectedReport.championNotes}</p>
                      {selectedReport.verifiedBy && (
                        <p className="text-sm text-blue-600 mt-2">- {selectedReport.verifiedBy}</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900">Submitted</h4>
                  <p className="text-gray-700">
                    {new Date(selectedReport.submitDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsDashboard;
