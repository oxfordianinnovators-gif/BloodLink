import React from 'react';
import { MapPin, Phone, Clock, Droplet, Navigation } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { mockBloodBanks } from '../data/mockData';

const BloodBanks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplet className="h-10 w-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Banks Directory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find blood banks near you with real-time availability and emergency contact information.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Emergency Blood Needed?</h3>
              <p className="text-red-100">
                Call our 24/7 emergency hotline for immediate assistance with critical blood requests.
              </p>
            </div>
            <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50 border-white">
              <Phone className="h-4 w-4 mr-2" />
              102 / 103
            </Button>
          </div>
        </div>

        {/* Blood Banks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockBloodBanks.map((bank) => (
            <Card key={bank.id} className="border-l-4 border-red-600">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{bank.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{bank.city}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  bank.hours === '24/7' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {bank.hours}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>{bank.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Hours: {bank.hours}</span>
                </div>
              </div>

              {/* Available Blood Groups */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Blood Types</h4>
                <div className="flex flex-wrap gap-2">
                  {bank.bloodGroups.map((group) => (
                    <span key={group} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {group}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href={`tel:${bank.emergencyPhone}`}>
                  <Button className="w-full" variant="danger">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Call
                  </Button>
                </a>
                <a href={`tel:${bank.phone}`}>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    General Inquiry
                  </Button>
                </a>
              </div>

              <div className="mt-3">
                <Button variant="secondary" className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-blue-50 border border-blue-200">
            <Clock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Operating Hours</h3>
            <p className="text-gray-600">
              Most blood banks operate during regular business hours, but many offer 24/7 emergency services. 
              Always call ahead for urgent needs.
            </p>
          </Card>

          <Card className="bg-green-50 border border-green-200">
            <Droplet className="h-12 w-12 text-green-600 mb-4" fill="currentColor" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Donation Requirements</h3>
            <p className="text-gray-600">
              Must be 18-65 years old, weigh at least 45kg, and be in good health. 
              Wait 8 weeks between whole blood donations.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BloodBanks;