import React from 'react';
import CommunityChampions from '../components/CommunityChampions';

const Champions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community Champions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Meet the dedicated citizens ensuring government projects serve their communities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">1,500+</div>
                <div className="text-blue-200">Active Champions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">36</div>
                <div className="text-blue-200">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">774</div>
                <div className="text-blue-200">LGAs Represented</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* What Champions Do */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What Community Champions Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Monitoring</h3>
              <p className="text-gray-600 text-sm">
                Regular site visits to track project progress and verify citizen reports
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Verification</h3>
              <p className="text-gray-600 text-sm">
                Verify citizen reports through independent investigation and documentation
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Engagement</h3>
              <p className="text-gray-600 text-sm">
                Organize townhalls and community meetings to discuss project impacts
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Collection</h3>
              <p className="text-gray-600 text-sm">
                Gather accurate data on project status, budget utilization, and community impact
              </p>
            </div>
          </div>
        </div>

        {/* Champion Requirements */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Becoming a Community Champion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Resident of the community for at least 2 years
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Previous experience in community leadership or civic engagement
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Commitment to dedicate 5-15 hours per week
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Strong communication and documentation skills
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Access to smartphone or camera for photo documentation
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">★</span>
                    Monthly stipend for communication and transportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">★</span>
                    Training workshops on civic engagement and project monitoring
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">★</span>
                    Access to exclusive Champion network and resources
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">★</span>
                    Certificate of recognition from YouthGovTrack
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">★</span>
                    Direct impact on community development and accountability
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Champions List */}
        <CommunityChampions />

        {/* Success Stories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Champion Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="Adebayo Olamide"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Adebayo Olamide</h3>
                  <p className="text-sm text-gray-600">Lagos State Champion</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "Through consistent monitoring and community engagement, I helped ensure that 
                three major road projects in Ikeja LGA were completed on schedule. The key was 
                building trust with both contractors and community members."
              </p>
              <div className="text-xs text-blue-600 font-medium">
                Impact: 3 projects completed • 15,000+ residents benefited
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
                  alt="Fatima Ibrahim"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Fatima Ibrahim</h3>
                  <p className="text-sm text-gray-600">Kano State Champion</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "When I discovered that a health center project was using substandard materials, 
                I documented the issues and worked with local authorities to ensure quality 
                standards were met. The facility now serves over 8,000 people safely."
              </p>
              <div className="text-xs text-blue-600 font-medium">
                Impact: 1 major quality issue resolved • 8,000+ people served safely
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference in Your Community?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join our network of dedicated citizens working to ensure government projects 
            truly serve the people. Your community needs champions like you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Apply to be a Champion
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Champions;
