import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { 
  CheckBadgeIcon, 
  ClockIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  XMarkIcon,
  UserPlusIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon as CheckBadgeIconSolid } from '@heroicons/react/24/solid';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { cn } from '../utils/cn';

interface Champion {
  id: string;
  name: string;
  state: string;
  lga: string;
  projectsTracked: number;
  reportsSubmitted: number;
  joinDate: string;
  avatar: string;
  bio: string;
  verified: boolean;
  contactInfo: {
    email?: string;
    phone?: string;
  };
}

interface CommunityChampionsProps {
  selectedState?: string;
  selectedLGA?: string;
  onChampionSelect?: React.Dispatch<React.SetStateAction<number | null>>;
  searchQuery?: string;
  activeTab?: 'All' | 'Projects' | 'Community Posts';
}

const CommunityChampions: React.FC<CommunityChampionsProps> = ({ 
  selectedState, 
  selectedLGA, 
  onChampionSelect,
  searchQuery = '',
  activeTab = 'All'
}) => {
  const [champions] = useState<Champion[]>([
    {
      id: '1',
      name: 'Adebayo Olamide',
      state: 'Lagos',
      lga: 'Ikeja',
      projectsTracked: 24,
      reportsSubmitted: 18,
      joinDate: '2023-01-15',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Civil engineer passionate about infrastructure development in Lagos State.',
      verified: true,
      contactInfo: {
        email: 'adebayo.olamide@email.com'
      }
    },
    {
      id: '2',
      name: 'Fatima Ibrahim',
      state: 'Kano',
      lga: 'Dala',
      projectsTracked: 31,
      reportsSubmitted: 25,
      joinDate: '2022-08-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Healthcare advocate ensuring medical facilities reach rural communities.',
      verified: true,
      contactInfo: {
        email: 'fatima.ibrahim@email.com',
        phone: '+234 803 123 4567'
      }
    },
    {
      id: '3',
      name: 'Chuka Okonkwo',
      state: 'Rivers',
      lga: 'Port Harcourt',
      projectsTracked: 19,
      reportsSubmitted: 14,
      joinDate: '2023-03-10',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Environmental scientist tracking water and sanitation projects.',
      verified: true,
      contactInfo: {
        email: 'chuka.okonkwo@email.com'
      }
    },
    {
      id: '4',
      name: 'Aisha Mohammed',
      state: 'Abia',
      lga: 'Aba South',
      projectsTracked: 16,
      reportsSubmitted: 12,
      joinDate: '2023-05-22',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Education advocate ensuring school projects benefit local children.',
      verified: true,
      contactInfo: {
        email: 'aisha.mohammed@email.com'
      }
    },
    {
      id: '5',
      name: 'David Okafor',
      state: 'Lagos',
      lga: 'Alimosho',
      projectsTracked: 22,
      reportsSubmitted: 20,
      joinDate: '2022-11-05',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      bio: 'Community leader focused on youth development and skills acquisition projects.',
      verified: true,
      contactInfo: {
        email: 'david.okafor@email.com',
        phone: '+234 806 987 6543'
      }
    },
    {
      id: '6',
      name: 'Blessing Eze',
      state: 'Adamawa',
      lga: 'Demsa',
      projectsTracked: 8,
      reportsSubmitted: 6,
      joinDate: '2023-07-14',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      bio: 'Agricultural extension officer monitoring farming and irrigation projects.',
      verified: false,
      contactInfo: {
        email: 'blessing.eze@email.com'
      }
    }
  ]);

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    lga: '',
    experience: '',
    motivation: '',
    availability: ''
  });

  const filteredChampions = useMemo(() => {
    return champions.filter(champion => {
      // Filter by selected state/LGA
      if (selectedState && champion.state !== selectedState) return false;
      if (selectedLGA && champion.lga !== selectedLGA) return false;
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          champion.name.toLowerCase().includes(query) ||
          champion.state.toLowerCase().includes(query) ||
          champion.lga.toLowerCase().includes(query) ||
          champion.bio.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [champions, selectedState, selectedLGA, searchQuery]);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully! We will review your application and get back to you within 5-7 business days.');
    setShowApplicationForm(false);
    setApplicationData({
      fullName: '',
      email: '',
      phone: '',
      state: '',
      lga: '',
      experience: '',
      motivation: '',
      availability: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  const getVerificationBadge = (verified: boolean) => {
    if (verified) {
      return (
        <Badge variant="success" className="inline-flex items-center gap-1">
          <CheckBadgeIconSolid className="w-3 h-3" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="inline-flex items-center gap-1">
        <ClockIcon className="w-3 h-3" />
        Pending
      </Badge>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <Card variant="elevated" className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Community Champions</CardTitle>
            <p className="text-gray-600 mt-2">
              Local leaders verifying and tracking projects in their communities
            </p>
          </div>
          <Button 
            onClick={() => setShowApplicationForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            size="lg"
          >
            <UserPlusIcon className="w-5 h-5 mr-2" />
            Become a Champion
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Champions Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredChampions.map((champion) => (
            <motion.div
              key={champion.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group"
            >
              <Card 
                variant="default"
                className={cn(
                  "cursor-pointer transition-all duration-300 border-gray-200 hover:border-primary-300 hover:shadow-lg",
                  "group-hover:shadow-xl"
                )}
                onClick={() => onChampionSelect && onChampionSelect(parseInt(champion.id))}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={champion.avatar}
                        alt={champion.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-primary-200 transition-all duration-300"
                      />
                      {champion.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                          <CheckBadgeIconSolid className="w-5 h-5 text-primary-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-primary-700 transition-colors">
                          {champion.name}
                        </h3>
                        {getVerificationBadge(champion.verified)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {champion.lga}, {champion.state}
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {champion.bio}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-primary-50 rounded-lg border border-primary-100">
                      <div className="text-lg font-bold text-primary-700">{champion.projectsTracked}</div>
                      <div className="text-xs text-primary-600 font-medium">Projects Tracked</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-lg font-bold text-green-700">{champion.reportsSubmitted}</div>
                      <div className="text-xs text-green-600 font-medium">Reports Submitted</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      Joined {new Date(champion.joinDate).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      {champion.contactInfo.email && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                        >
                          <a
                            href={`mailto:${champion.contactInfo.email}`}
                            title="Send email"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <EnvelopeIcon className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {champion.contactInfo.phone && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <a
                            href={`tel:${champion.contactInfo.phone}`}
                            title="Call"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PhoneIcon className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredChampions.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <UserPlusIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No champions found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Be the first champion in your area!'}
            </p>
            <Button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <UserPlusIcon className="w-5 h-5 mr-2" />
              Become a Champion
            </Button>
          </motion.div>
        )}
      </CardContent>

      {/* Application Form Modal */}
      <Transition appear show={showApplicationForm} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowApplicationForm}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                    Become a Community Champion
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowApplicationForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </Button>
                  </Dialog.Title>

                  <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <h4 className="font-medium text-primary-900 mb-2">What is a Community Champion?</h4>
                    <p className="text-sm text-primary-800">
                      Community Champions are verified local leaders who help track and verify government projects 
                      in their communities. They serve as the bridge between citizens and our platform, ensuring 
                      accurate and timely project updates.
                    </p>
                  </div>

                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="fullName"
                          value={applicationData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={applicationData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+234 xxx xxx xxxx"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <select
                          name="state"
                          value={applicationData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select your state</option>
                          <option value="Lagos">Lagos</option>
                          <option value="Rivers">Rivers</option>
                          <option value="Kano">Kano</option>
                          <option value="Abia">Abia</option>
                          <option value="Adamawa">Adamawa</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Local Government Area *
                      </label>
                      <Input
                        type="text"
                        name="lga"
                        value={applicationData.lga}
                        onChange={handleInputChange}
                        required
                        placeholder="Your LGA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relevant Experience *
                      </label>
                      <textarea
                        name="experience"
                        value={applicationData.experience}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Describe your experience in community leadership, project management, or civic engagement..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Why do you want to be a Champion? *
                      </label>
                      <textarea
                        name="motivation"
                        value={applicationData.motivation}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Tell us your motivation for becoming a Community Champion..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Availability *
                      </label>
                      <select
                        name="availability"
                        value={applicationData.availability}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        <option value="">Select your availability</option>
                        <option value="5-10 hours/week">5-10 hours per week</option>
                        <option value="10-15 hours/week">10-15 hours per week</option>
                        <option value="15+ hours/week">15+ hours per week</option>
                        <option value="As needed">As needed basis</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowApplicationForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700"
                      >
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Card>
  );
};

export default CommunityChampions;
