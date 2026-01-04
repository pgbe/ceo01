
import React from 'react';
import { HomeIcon } from './icons/HomeIcon';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-[#1F2A38] text-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-wide">CEO Dashboard</h1>
          </div>
          <nav>
            <button
              onClick={onHomeClick}
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
              aria-label="Home"
            >
              <HomeIcon />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
