import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-red-500">BloodLink</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting life savers with those in need. Every drop counts in saving lives 
              and building stronger, healthier communities together.
            </p>
            <div className="text-red-500 font-semibold">
              Emergency Hotline: <span className="text-white">102 / 103</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/register" className="block text-gray-300 hover:text-red-500 transition-colors">
                Become a Donor
              </Link>
              <Link to="/request" className="block text-gray-300 hover:text-red-500 transition-colors">
                Request Blood
              </Link>
              <Link to="/search" className="block text-gray-300 hover:text-red-500 transition-colors">
                Find Donors
              </Link>
              <Link to="/banks" className="block text-gray-300 hover:text-red-500 transition-colors">
                Blood Banks
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+977-87-520123</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>help@bloodlink.org.np</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Jumla, Karnali Province, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 BloodLink. All rights reserved. Saving lives, one donation at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;