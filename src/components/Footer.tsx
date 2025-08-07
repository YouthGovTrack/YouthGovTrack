import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-100 border-t mt-12 py-8 text-sm text-gray-600">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      {/* Branding & Copyright */}
      <div className="flex flex-col md:flex-row items-center gap-2">
        <span className="font-bold text-primary">YouthGov Track</span>
        <span className="hidden md:inline">|</span>
        <span>© {new Date().getFullYear()} BBYDI</span>
      </div>
      {/* Partner Logos Placeholder */}
      <div className="flex gap-3">
        <span className="w-8 h-8 bg-gray-300 rounded" aria-label="Partner Logo"></span>
        <span className="w-8 h-8 bg-gray-300 rounded" aria-label="Partner Logo"></span>
      </div>
      {/* Social Links Placeholder */}
      <div className="flex gap-3">
        <a href="#" aria-label="Twitter" className="w-6 h-6 bg-gray-300 rounded-full"></a>
        <a href="#" aria-label="Facebook" className="w-6 h-6 bg-gray-300 rounded-full"></a>
        <a href="#" aria-label="Instagram" className="w-6 h-6 bg-gray-300 rounded-full"></a>
      </div>
    </div>
  </footer>
);

export default Footer; 