import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-2">
          <span className="block w-8 h-8 bg-gray-200 rounded-full" aria-label="Logo"></span>
          <span className="font-bold text-lg text-primary">YouthGov Track</span>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          <li><a href="#" className="hover:text-primary">Home</a></li>
          <li><a href="#" className="hover:text-primary">Promises</a></li>
          <li><a href="#" className="hover:text-primary">Reports</a></li>
          <li><a href="#" className="hover:text-primary">Resources</a></li>
          <li><a href="#" className="hover:text-primary">About</a></li>
        </ul>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
      </nav>
      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-lg py-4 px-6 space-y-4 font-medium text-gray-700">
          <li><a href="#" className="block hover:text-primary">Home</a></li>
          <li><a href="#" className="block hover:text-primary">Promises</a></li>
          <li><a href="#" className="block hover:text-primary">Reports</a></li>
          <li><a href="#" className="block hover:text-primary">Resources</a></li>
          <li><a href="#" className="block hover:text-primary">About</a></li>
        </ul>
      )}
    </header>
  );
};

export default Navbar; 