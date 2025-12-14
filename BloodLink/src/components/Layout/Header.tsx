import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Active Requests', href: '/active-requests' },
    { name: 'Find Donors', href: '/search' },
    { name: 'Blood Banks', href: '/banks' },
    { name: 'Profile', href: '/profile' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white shadow-lg border-b-2 border-red-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-red-600 p-2 rounded-full">
              <Droplet className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-4xl font-extrabold text-red-600">BloodLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-lg font-bold transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/request"
              className="bg-red-600 text-white px-6 py-2 rounded-full text-lg font-bold hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
            >
              Emergency Request
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-lg font-bold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link

                to="/request"
                onClick={() => setIsMenuOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-red-700 transition-colors mx-4 text-center"
              >
                Emergency Request
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;