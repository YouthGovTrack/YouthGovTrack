import React, { useState } from 'react';

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
}

const CommunityChampions: React.FC<CommunityChampionsProps> = ({ selectedState, selectedLGA }) => {
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

  const filteredChampions = champions.filter(champion => {
    if (selectedState && champion.state !== selectedState) return false;
    if (selectedLGA && champion.lga !== selectedLGA) return false;
    return true;
  });

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
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Champions</h2>
          <p className="text-gray-600 mt-1">
            Local leaders verifying and tracking projects in their communities
          </p>
        </div>
        <button
          onClick={() => setShowApplicationForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Become a Champion
        </button>
      </div>

      {/* Champions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChampions.map((champion) => (
          <div key={champion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              <img
                src={champion.avatar}
                alt={champion.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {champion.name}
                  </h3>
                  {getVerificationBadge(champion.verified)}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  📍 {champion.lga}, {champion.state}
                </p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {champion.bio}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{champion.projectsTracked}</div>
                <div className="text-xs text-blue-800">Projects Tracked</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{champion.reportsSubmitted}</div>
                <div className="text-xs text-green-800">Reports Submitted</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Joined {new Date(champion.joinDate).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                {champion.contactInfo.email && (
                  <a
                    href={`mailto:${champion.contactInfo.email}`}
                    className="text-blue-600 hover:text-blue-800"
                    title="Send email"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                )}
                {champion.contactInfo.phone && (
                  <a
                    href={`tel:${champion.contactInfo.phone}`}
                    className="text-green-600 hover:text-green-800"
                    title="Call"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChampions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No champions found</h3>
          <p className="text-gray-500 mb-4">Be the first champion in your area!</p>
          <button
            onClick={() => setShowApplicationForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Become a Champion
          </button>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Become a Community Champion</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What is a Community Champion?</h4>
                <p className="text-sm text-blue-800">
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
                    <input
                      type="text"
                      name="fullName"
                      value={applicationData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <input
                    type="text"
                    name="lga"
                    value={applicationData.lga}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your availability</option>
                    <option value="5-10 hours/week">5-10 hours per week</option>
                    <option value="10-15 hours/week">10-15 hours per week</option>
                    <option value="15+ hours/week">15+ hours per week</option>
                    <option value="As needed">As needed basis</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChampions;
