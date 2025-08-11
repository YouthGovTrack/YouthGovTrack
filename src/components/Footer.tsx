import React from 'react';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Twitter from './icons/Twitter';
import LinkedIn from './icons/LinkedIn';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LocalGovTrack</h3>
            <p className="text-gray-400">Empowering citizens to track government projects and engage in civic activities.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="/how-it-works" className="block text-gray-400 hover:text-white transition-colors">How It Works</a>
              <a href="/projects" className="block text-gray-400 hover:text-white transition-colors">Projects</a>
              <a href="/reports" className="block text-gray-400 hover:text-white transition-colors">Reports</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +234 (0) 800 7890</p>
              <p>📧 info@localgovtrack.ng</p>
              <p>📍 123 BOVAS Office, Lagos</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="flex-1 p-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/localgovtrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://twitter.com/localgovtrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://linkedin.com/company/localgovtrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedIn size={24} />
              </a>
              <a 
                href="https://instagram.com/localgovtrack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2025 LocalGovTrack. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
