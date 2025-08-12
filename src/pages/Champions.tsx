import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CommunityChampions from '../components/CommunityChampions';
import { ChampionSidebar } from '../contexts/ChampionSidebar';
import { Input } from '../components/ui/Input';
import { cn } from '../utils/cn';
import ArrowLink from '../components/icons/ArrowLink';

interface ChampionsProps {
  onNavigate: (page: string, projectId?: number) => void;
}

const Champions: React.FC<ChampionsProps> = ({ onNavigate }) => {
  const [selectedChampionId, setSelectedChampionId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Projects' | 'Community Posts'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabOptions = ['All', 'Projects', 'Community Posts'] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Left Sidebar - Natural part of page flow */}
        <aside className="w-80 bg-white border-r border-gray-200 shadow-sm min-h-screen sticky top-20 self-start overflow-y-auto max-h-[calc(100vh-5rem)] flex-shrink-0">
          <ChampionSidebar 
            projectId={selectedChampionId || 1}
            onNavigate={onNavigate}
          />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Search Header */}
          <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
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
                  placeholder="Search projects in your area or state..."
                  className="pl-10 w-full shadow-sm border-gray-200 focus:border-primary-300 focus:ring-primary-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          {/* Hero Banner */}
          <motion.div 
            className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white mb-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="space-y-4 max-w-2xl">
                <motion.h2 
                  className="text-3xl font-bold tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  What's happening in your community
                </motion.h2>
                <motion.p 
                  className="text-primary-100 text-lg leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Connect with local champions, track government projects, and make your voice heard. 
                  Join a community of citizens working together for transparency and positive change.
                </motion.p>
              </div>
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <img
                  src="/citizen2.png"
                  alt="Community engagement"
                  className="h-32 w-32 object-cover rounded-full border-4 border-white/20 shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Tab Navigation */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="border-b border-gray-200 bg-white rounded-lg shadow-sm p-1">
              <nav className="flex space-x-1">
                {tabOptions.map((tab) => (
                  <ArrowLink
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'relative py-3 px-6 text-sm font-medium rounded-md transition-all duration-200',
                      tab === activeTab
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    )}
                    isLink={false}
                  >
                    {tab === activeTab && (
                      <motion.div
                        className="absolute inset-0 bg-primary-50 rounded-md"
                        layoutId="activeTab"
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
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <CommunityChampions 
                onChampionSelect={setSelectedChampionId}
                searchQuery={searchQuery}
                activeTab={activeTab}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Champions;
