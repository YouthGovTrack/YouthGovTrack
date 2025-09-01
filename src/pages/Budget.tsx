import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Budget: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Power BI Dashboard URL
  const powerBIUrl = "https://app.powerbi.com/view?r=eyJrIjoiN2Y4OWMzMjEtMjVjNy00NWEwLWI0OGUtZGVjMDY3MDRjM2I3IiwidCI6ImY3ZjYyY2EyLTY1ODEtNDI2YS04NDEwLTcxZTZhMzJmNDAxOCJ9";

  useEffect(() => {
    // Set a timeout to hide loading after dashboard should load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const refreshDashboard = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload
    const iframe = document.getElementById('powerbi-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 pt-16">
        {/* Page Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Budget Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Real-time government budget allocation and spending tracker
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Refresh Button */}
                <button
                  onClick={refreshDashboard}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
                
                {/* Open in New Tab Button */}
                <a
                  href={powerBIUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Full View
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Information Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-800">Interactive Budget Dashboard</h3>
                <p className="text-sm text-blue-700 mt-1">
                  This dashboard provides real-time insights into government budget allocation and spending across different sectors and regions. 
                  You can interact with the charts, filter by categories, and drill down into specific projects.
                </p>
              </div>
            </div>
          </div>

          {/* Power BI Dashboard Container */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Loading State */}
            {isLoading && !hasError && (
              <div className="flex items-center justify-center h-96 bg-gray-50">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Loading Budget Dashboard...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="flex items-center justify-center h-96 bg-gray-50">
                <div className="text-center">
                  <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Unavailable</h3>
                  <p className="text-gray-600 mb-4">
                    The budget dashboard is currently unavailable. This could be due to:
                  </p>
                  <ul className="text-sm text-gray-500 text-left max-w-md mx-auto mb-4">
                    <li>• Network connectivity issues</li>
                    <li>• Dashboard maintenance</li>
                    <li>• Access permissions</li>
                  </ul>
                  <div className="space-x-4">
                    <button
                      onClick={refreshDashboard}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                    <a
                      href={powerBIUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Open Direct Link
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Power BI Iframe */}
            <iframe
              id="powerbi-iframe"
              src={powerBIUrl}
              className={`w-full border-0 ${isLoading || hasError ? 'hidden' : 'block'}`}
              style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Government Budget Dashboard"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>

          {/* Dashboard Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Real-time Data</h3>
              </div>
              <p className="text-gray-600">
                Access up-to-date budget information with automatic data refresh from government sources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Interactive Filters</h3>
              </div>
              <p className="text-gray-600">
                Filter budget data by state, ministry, project type, and time period to find specific information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Visual Analytics</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive charts and graphs showing budget trends, spending patterns, and project progress.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Budget Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">₦45.6T</div>
                <div className="text-sm text-gray-600">Total Budget 2024</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">68%</div>
                <div className="text-sm text-gray-600">Budget Utilization</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-600">36</div>
                <div className="text-sm text-gray-600">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Budget;
