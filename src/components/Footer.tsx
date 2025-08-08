import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">YouthGovTrack</h3>
            <p className="text-gray-400">Empowering citizens to track government projects and engage in civic activities.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white">About Us</a>
              <a href="#" className="block text-gray-400 hover:text-white">How It Works</a>
              <a href="#" className="block text-gray-400 hover:text-white">Projects</a>
              <a href="#" className="block text-gray-400 hover:text-white">Reports</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +234 (0) 800 7890</p>
              <p>📧 info@youthgovtrack.ng</p>
              <p>📍 123 BOVAS Office, Lagos</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="flex-1 p-2 rounded-l-lg text-gray-900" 
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 YouthGovTrack. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
