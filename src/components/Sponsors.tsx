import React, { useState } from 'react';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
}

const Sponsors: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sponsors: Sponsor[] = [
    {
      id: '1',
      name: 'Ministry of Youth Development',
      logo: '/Sponsors1.png',
      website: 'https://youthdevelopment.gov.ng',
      description: 'Supporting youth empowerment initiatives'
    },
    {
      id: '2',
      name: 'National Democratic Institute',
      logo: '/Sponsors1.png',
      website: 'https://ndi.org',
      description: 'Promoting democratic governance'
    },
    {
      id: '3',
      name: 'Ford Foundation',
      logo: '/Sponsors1.png',
      website: 'https://fordfoundation.org',
      description: 'Advancing social justice'
    },
    {
      id: '4',
      name: 'Open Society Initiative',
      logo: '/Sponsors1.png',
      website: 'https://opensocietyfoundations.org',
      description: 'Building vibrant and inclusive democracies'
    },
    {
      id: '5',
      name: 'USAID Nigeria',
      logo: '/Sponsors1.png',
      website: 'https://usaid.gov/nigeria',
      description: 'From the American People'
    },
    {
      id: '6',
      name: 'MacArthur Foundation',
      logo: '/Sponsors1.png',
      website: 'https://macfound.org',
      description: 'Building a more just, verdant, and peaceful world'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Official Brand Partners</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full max-w-[120px] h-16 flex items-center justify-center p-2 transition-all duration-300 hover:scale-105"
              aria-label={`Visit ${sponsor.name} website`}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/120x60/E5E7EB/6B7280?text=${encodeURIComponent(sponsor.name.split(' ').map(word => word[0]).join(''))}`;
                }}
              />
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 cursor-pointer"
          >
            Become a partner
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="bg-white rounded-lg max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Partner</h3>
              <p className="text-gray-600 mb-6">
                Join us in promoting transparent governance and youth empowerment in Nigeria.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your organization name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="contact@yourorg.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partnership Interest *
                  </label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select partnership type</option>
                    <option value="financial">Financial Sponsorship</option>
                    <option value="technical">Technical Partnership</option>
                    <option value="strategic">Strategic Alliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your organization and partnership goals..."
                  ></textarea>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sponsors;
