import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChampionSidebar } from '../contexts/ChampionSidebar';
import CommunityChampions from '../components/CommunityChampions';
import CommunityProjects from '../components/CommunityProjects';
import LiveCivicAlerts from '../components/LiveCivicAlerts';
import CitizenTestimonials from '../components/CitizenTestimonials';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/ui/Input';
import { cn } from '../utils/cn';
import ArrowLink from '../components/icons/ArrowLink';

interface CommunityProps {
  initialTab?: string;
}

const Community: React.FC<CommunityProps> = ({ initialTab = 'dashboard' }) => {
  console.log('[Community] Rendered');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChampionId, setSelectedChampionId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update tab when initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '📊' },
    { id: 'alerts', label: 'Live Alerts', icon: '🚨' },
    { id: 'champions', label: 'Champions', icon: '🏆' }
  ];

  const championTabOptions = ['All', 'Projects', 'Community Posts'] as const;
  const [activeChampionTab, setActiveChampionTab] = useState<'All' | 'Projects' | 'Community Posts'>('All');

  // Handle showing projects from sidebar
  const handleShowProjects = () => {
    setActiveTab('projects');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-8 text-white">
              <h1 className="text-xl sm:text-3xl font-bold mb-4">
                Welcome to LocalGovTrack Community, {user?.firstName}! 🎉
              </h1>
              <p className="text-sm sm:text-lg opacity-90 mb-6">
                You're now part of a growing community of {user?.lga} citizens working together to improve local governance and transparency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold">12</div>
                  <div className="text-xs sm:text-sm">Projects in {user?.lga}</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold">45</div>
                  <div className="text-xs sm:text-sm">Active Citizens</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl font-bold">3</div>
                  <div className="text-xs sm:text-sm">Community Champions</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/browse-projects')}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-4 text-sm sm:text-base">
                  📊
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Browse Projects</h3>
                <p className="text-xs sm:text-sm text-gray-600">Explore ongoing projects in your area</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/reports')}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 sm:mb-4 text-sm sm:text-base">
                  📝
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Submit Report</h3>
                <p className="text-xs sm:text-sm text-gray-600">Report issues or provide updates</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveTab('champions')}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 sm:mb-4 text-sm sm:text-base">
                  🏆
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Meet Champions</h3>
                <p className="text-xs sm:text-sm text-gray-600">Connect with local leaders</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveTab('alerts')}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2 sm:mb-4 text-sm sm:text-base">
                  🚨
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Live Alerts</h3>
                <p className="text-xs sm:text-sm text-gray-600">Stay updated with real-time notifications</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Activity in {user?.lga}</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm sm:text-base">
                    📊
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">New healthcare center project started</p>
                    <p className="text-xs sm:text-sm text-gray-600">2 hours ago • {user?.lga} LGA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center text-sm sm:text-base">
                    ✅
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Road construction project completed</p>
                    <p className="text-xs sm:text-sm text-gray-600">1 day ago • {user?.lga} LGA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center text-sm sm:text-base">
                    👥
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">5 new citizens joined the community</p>
                    <p className="text-xs sm:text-sm text-gray-600">3 days ago • {user?.lga} LGA</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'projects':
        return (
          <CommunityProjects filterByUserLocation={true} />
        );
      
      case 'alerts':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LiveCivicAlerts />
          </motion.div>
        );
      
      case 'champions':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Champions Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-700 to-blue-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-white shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="space-y-3 sm:space-y-4 max-w-2xl">
                  <motion.h2 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    What's happening in {user?.lga} community
                  </motion.h2>
                  <motion.p 
                    className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Connect with local champions, track government projects, and make your voice heard. 
                    Join a community of citizens working together for transparency and positive change.
                  </motion.p>
                </div>
                <motion.div
                  className="flex justify-center lg:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <img
                    src={user?.profileImage || "/citizen2.png"}
                    alt="Community engagement"
                    className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 object-cover rounded-full border-4 border-white/20 shadow-xl"
                  />
                </motion.div>
              </div>
            </div>

            {/* Search Bar */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search champions, projects, or community posts..."
                className="pl-10 w-full shadow-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            {/* Enhanced Tab Navigation for Champions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="border-b border-gray-200 bg-white rounded-lg shadow-sm p-1 overflow-x-auto">
                <nav className="flex space-x-1 min-w-max">
                  {championTabOptions.map((tab) => (
                    <ArrowLink
                      key={tab}
                      onClick={() => setActiveChampionTab(tab)}
                      className={cn(
                        'relative py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap',
                        tab === activeChampionTab
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      )}
                      isLink={false}
                    >
                      {tab === activeChampionTab && (
                        <motion.div
                          className="absolute inset-0 bg-blue-50 rounded-md"
                          layoutId="activeChampionTab"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </ArrowLink>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Champions Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChampionTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CommunityChampions 
                  onChampionSelect={setSelectedChampionId}
                  searchQuery={searchQuery}
                  activeTab={activeChampionTab}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navbar />
      
      <div className="flex flex-col lg:flex-row pt-20">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block w-80 bg-white shadow-lg">
          <ChampionSidebar projectId={1} onShowProjects={handleShowProjects} />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-medium">Menu</span>
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white w-80 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <ChampionSidebar projectId={1} onShowProjects={handleShowProjects} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Navigation */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Community Hub</h1>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-600">
                  {user?.lga}, {user?.state}
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200 px-2 sm:px-8 overflow-x-auto">
            <div className="flex space-x-2 sm:space-x-8 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-1 sm:mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Community;