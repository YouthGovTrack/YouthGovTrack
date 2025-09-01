import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLink from '../components/icons/ArrowLink';
import CitizenTestimonials from '../components/CitizenTestimonials';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                About LocalGovTracka
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tracking state governors' promises. Amplifying youth voices and strengthening accountability in Nigerian state governance.
              </p>
              <ArrowLink 
                onClick={() => navigate('/register')}
                className="bg-red-600 text-white hover:bg-red-700 transition-colors px-8 py-3 text-lg font-semibold"
                isLink={false}
              >
                Join the Club
              </ArrowLink>
            </div>
            <div className="flex justify-center">
              <img 
                src="/about.jpeg" 
                alt="Nigaria Map" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-yellow-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To empower youth participation, promote transparency, and strengthen our accountability in Nigerian state governance.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                A future where every young Nigerian holds leaders accountable and participates actively in governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Project Matters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Project Matters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unfulfilled Promises</h3>
              <p className="text-gray-600">
                Many political promises made to youths during campaigns remain unaddressed after the elections.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Low Youth Trust</h3>
              <p className="text-gray-600">
                Government institutions have limited trust from the youth as they feel their voices are not heard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Change</h3>
              <p className="text-gray-600">
                Collecting and sharing data on governance improves citizens to hold leaders accountable.
              </p>
            </div>
          </div>

          {/* Promise Fulfillment Rate */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Promise Fulfillment Rate</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Infrastructure Development</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Education Reforms</span>
                  <span className="text-sm text-gray-500">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Youth Empowerment</span>
                  <span className="text-sm text-gray-500">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{width: '58%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Healthcare Improvements</span>
                  <span className="text-sm text-gray-500">43%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{width: '43%'}}></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              *Source: Average data from 36 of our partner states tracking
            </p>
          </div>
        </div>
      </section>

      {/* How We Track Governors' Promises */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Track Governors' Promises</h2>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Collection</h3>
                <p className="text-gray-600">
                  From State Development priorities, campaign manifestos, speeches, and public commitments.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Categorization & Analysis</h3>
                <p className="text-gray-600">
                  We organize promises by sectors (education, health, infrastructure, etc.) and track for measurement.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly Reporting</h3>
                <p className="text-gray-600">
                  Generate and publish reports on your progress and share them with monitoring.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Engagement</h3>
                <p className="text-gray-600">
                  Involve citizens and share civil monitoring and need for impact sharing and quality feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tools for Civic Impact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Tools for Civic Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Civic Accountability Tracker</h3>
              <p className="text-sm text-gray-600">
                Transparent tracking that measures and displays government performance across key sectors.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Memo of Understanding & Civic Reports</h3>
              <p className="text-sm text-gray-600">
                Transparent platform to promote effective processes and check information available to the public.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Town Halls & Youth Discussions</h3>
              <p className="text-sm text-gray-600">
                Public forums for direct engagement with government officials and meaningful youth discussions.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Radio Broadcasts & Civic Stories</h3>
              <p className="text-sm text-gray-600">
                Audio programs in local languages to share civic information and promote governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We've Achieved */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We've Achieved</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">36</div>
              <div className="text-sm text-gray-600">States Monitored</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">1,000+</div>
              <div className="text-sm text-gray-600">Youth Members</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">250+</div>
              <div className="text-sm text-gray-600">Accountability Reports</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Radio Shows</div>
            </div>
          </div>
        </div>
      </section>

      {/* Voices from the Field */}
      <CitizenTestimonials />
      {/* Supported by Champions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported by Champions of Democracy</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are supported by organizations committed to governance accountability and youth empowerment across Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">Youth Democratic Council</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">Transparency Union</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">REVTP</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">Nigeria Youth Coalition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the movement to hold leaders accountable.
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Be part of the civic movement transforming governance across Nigeria. Your voice matters in building the Nigeria we all desire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ArrowLink 
              onClick={() => navigate('/register')}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors px-8 py-3 text-lg font-semibold"
              isLink={false}
            >
              Become a Civic Champion
            </ArrowLink>
            <ArrowLink 
              onClick={() => navigate('/browse-projects')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 transition-colors px-8 py-3 text-lg font-semibold"
              isLink={false}
            >
              Explore Projects
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
