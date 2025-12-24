import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Droplet, Filter } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { mockDonors, bloodGroups, cities } from '../data/mockData';
import type { Donor } from '../types';

const DonorSearch: React.FC = () => {
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: '',
    availability: 'all'
  });

  const [filteredDonors, setFilteredDonors] = useState<Donor[]>(mockDonors);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    
    // Apply filters
    let filtered = mockDonors;
    
    if (newFilters.bloodGroup) {
      filtered = filtered.filter(donor => donor.bloodGroup === newFilters.bloodGroup);
    }
    
    if (newFilters.city) {
      filtered = filtered.filter(donor => donor.city === newFilters.city);
    }
    
    if (newFilters.availability === 'available') {
      filtered = filtered.filter(donor => donor.availability);
    }
    
    setFilteredDonors(filtered);
  };

  const getAvailabilityBadge = (available: boolean) => {
    return available ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        Available
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        Unavailable
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Find Blood Donors</h1>
              <p className="text-2xl text-gray-600 max-w-2xl">
                Search and connect with verified blood donors in your area. Get help when you need it most.
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="relative bg-gradient-to-br from-red-100 to-red-50 p-8 shadow-2xl"
                   style={{
                     borderRadius: '40% 60% 60% 40% / 70% 50% 50% 70%',
                     border: '6px solid #dc2626',
                     transform: 'rotate(3deg)'
                   }}>
                <img
                  src="/donation.jpg"
                  alt="Community donors"
                  className="h-80 w-full object-cover"
                  style={{
                    borderRadius: '35% 65% 55% 45% / 65% 45% 55% 35%',
                    transform: 'rotate(-3deg)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 rounded-lg border-l-4 border-red-600">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Donors</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={filters.bloodGroup}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="all">All Donors</option>
                <option value="available">Available Only</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-red-600">{filteredDonors.length}</span> donors matching your criteria
          </p>
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <Card key={donor.id} className="border-l-4 border-red-600 hover:transform hover:scale-105 transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{donor.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-red-600">{donor.bloodGroup}</span>
                    {getAvailabilityBadge(donor.availability)}
                  </div>
                </div>
                <Droplet className="h-6 w-6 text-red-600" fill="currentColor" />
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{donor.city}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{donor.phone}</span>
                </div>
                {donor.lastDonation && (
                  <div className="text-sm text-gray-500">
                    Last donation: {new Date(donor.lastDonation).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button className="w-full" disabled={!donor.availability}>
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Donor
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <Card className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Donors Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search filters or expanding your search area.
            </p>
            <Button onClick={() => {
              setFilters({ bloodGroup: '', city: '', availability: 'all' });
              setFilteredDonors(mockDonors);
            }}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;