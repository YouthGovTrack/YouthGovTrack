import React, { useState } from 'react';
import ReportsDashboard from '../components/ReportsDashboard';
import CitizenReportsModal from '../components/CitizenReportsModal';

const Reports: React.FC = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Citizen Reports</h1>
              <p className="mt-2 text-gray-600">
                Track community-submitted reports and project updates from across Nigeria
              </p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Impact Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">1,247</div>
              <div className="text-blue-100">Total Reports Submitted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">856</div>
              <div className="text-blue-100">Reports Verified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">324</div>
              <div className="text-blue-100">Issues Resolved</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Citizen Reporting Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Submit Report</h3>
              <p className="text-gray-600 text-sm">
                Share updates, issues, or observations about government projects in your community. 
                Include photos and detailed descriptions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Champion Review</h3>
              <p className="text-gray-600 text-sm">
                Local Community Champions review and verify your report through site visits 
                and stakeholder engagement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Take Action</h3>
              <p className="text-gray-600 text-sm">
                Verified reports are escalated to relevant authorities and tracked until 
                resolution or project completion.
              </p>
            </div>
          </div>
        </div>

        {/* Reports Dashboard */}
        <ReportsDashboard />
        
        {/* Community Guidelines */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Community Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 className="font-medium mb-2">✅ What to Include:</h4>
              <ul className="space-y-1">
                <li>• Specific project details and locations</li>
                <li>• Clear photos and evidence</li>
                <li>• Accurate dates and timeframes</li>
                <li>• Contact information for follow-up</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">❌ What to Avoid:</h4>
              <ul className="space-y-1">
                <li>• Personal attacks or inflammatory language</li>
                <li>• Unverified rumors or hearsay</li>
                <li>• Duplicate reports on same issue</li>
                <li>• Reports outside your local area</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Report Modal */}
      <CitizenReportsModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
};

export default Reports;
