import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  Cog6ToothIcon,
  MapIcon,
  HomeIcon,
  FolderOpenIcon,
  ChatBubbleLeftRightIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import SubmitReportModal from '../components/SubmitReportModal';
import ViewCivicAlertsModal from '../components/ViewCivicAlertsModal';
import Loader from '../components/Loader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';

interface Project {
  id: string;
  name: string;
  location: string;
  state: string;
  lga: string;
  category: string;
  status: string;
  progress: number;
  budget: number;
  description: string;
  contractor: string;
  startDate: string;
  updatedAt: string;
  beneficiaries: number;
  images?: string[];
}

interface ChampionSidebarProps {
  projectId: number;
  onNavigate?: (page: string, projectId?: number) => void;
}

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  count?: number;
  href?: string;
}

const sidebarItems: SidebarItem[] = [
  { 
    label: 'Your feed', 
    icon: <HomeIcon className="w-5 h-5" />,
    href: '#feed'
  },
  { 
    label: 'All projects', 
    icon: <FolderOpenIcon className="w-5 h-5" />,
    href: '#projects'
  },
  { 
    label: 'Messages', 
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    count: 3,
    href: '#messages'
  },
  { 
    label: 'Categories', 
    icon: <Squares2X2Icon className="w-5 h-5" />,
    href: '#categories'
  }
];

const ChampionSidebar: React.FC<ChampionSidebarProps> = ({ projectId, onNavigate }) => {
  const [isSubmitReportOpen, setIsSubmitReportOpen] = useState(false);
  const [isViewAlertsOpen, setIsViewAlertsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Simulated data loading
    setLoading(false);
    setProject({
      id: '1',
      name: 'Adebayo Olamide',
      location: 'Ikeja, Lagos State',
      state: 'Lagos State',
      lga: 'Ikeja',
      category: 'Education',
      status: 'Ongoing',
      progress: 75,
      budget: 12,
      description: 'Active community champion monitoring education projects',
      contractor: 'Lagos State Government',
      startDate: '2023-01-01',
      updatedAt: '2023-08-11',
      beneficiaries: 1500,
      images: ['/citizen1.png']
    });
  }, [projectId]);

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Profile Section */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <img 
                  src="/citizen1.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full ring-2 ring-white shadow-md object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {project?.name || 'Community Champion'}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5 leading-tight">
                  {project?.location || 'Set your location'}
                </p>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsViewAlertsOpen(true)}
                >
                  <BellIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={() => setIsSubmitReportOpen(true)}
              className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white shadow-sm"
              size="sm"
            >
              Submit Report
            </Button>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <motion.div 
          className="px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <motion.li 
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <a 
                  href={item.href || '#'} 
                  className={cn(
                    "flex items-center justify-between w-full p-3 text-sm font-medium rounded-lg transition-all duration-200",
                    "text-gray-700 hover:bg-primary-50 hover:text-primary-700 group"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-500 group-hover:text-primary-600 transition-colors">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <Badge variant="default" className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Projects Around You Section */}
        <motion.div 
          className="mt-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Projects around you
          </h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-left p-3 h-auto text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <MapIcon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span>View larger map</span>
            </Button>
          </div>
        </motion.div>

        {/* State Tags */}
        <motion.div 
          className="mt-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-2">
            {['Kano state', 'Lagos state', 'Ogun state'].map((state, index) => (
              <motion.button
                key={state}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                  "bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700",
                  "border border-gray-200 hover:border-primary-300"
                )}
              >
                {state}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    
      {/* Modals */}
      {(isSubmitReportOpen || isViewAlertsOpen) && (
        <div className="fixed inset-0 z-[100]">
          <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => {
              setIsSubmitReportOpen(false);
              setIsViewAlertsOpen(false);
            }}
          />
          <div className="fixed inset-0 z-10">
            <div className="flex min-h-full items-center justify-center p-4">
              {isSubmitReportOpen && (
                <SubmitReportModal
                  isOpen={isSubmitReportOpen}
                  onClose={() => setIsSubmitReportOpen(false)}
                />
              )}
              {isViewAlertsOpen && (
                <ViewCivicAlertsModal
                  isOpen={isViewAlertsOpen}
                  onClose={() => setIsViewAlertsOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ChampionSidebar };
