import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Calendar, Clock, User, Droplet } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  unitsNeeded: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  hospital: string;
  city: string;
  contactPerson: string;
  contactPhone: string;
  requiredBy: string;
  postedTime: string;
  status: 'active' | 'fulfilled' | 'expired';
}

const ActiveRequests: React.FC = () => {
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  
  const mockRequests: BloodRequest[] = [
    {
      id: '1',
      patientName: 'Sita Devi Sharma',
      bloodGroup: 'O+',
      unitsNeeded: '2',
      urgency: 'critical',
      hospital: 'District Hospital',
      city: 'Jumla',
      contactPerson: 'Ram Sharma',
      contactPhone: '+977-9841234567',
      requiredBy: '2025-12-14',
      postedTime: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      patientName: 'Binod Thapa',
      bloodGroup: 'A+',
      unitsNeeded: '1',
      urgency: 'high',
      hospital: 'Community Health Center',
      city: 'Mugu',
      contactPerson: 'Maya Thapa',
      contactPhone: '+977-9812345678',
      requiredBy: '2025-12-15',
      postedTime: '5 hours ago',
      status: 'active'
    },
    {
      id: '3',
      patientName: 'Anjali Gurung',
      bloodGroup: 'B-',
      unitsNeeded: '3',
      urgency: 'critical',
      hospital: 'Red Cross Health Post',
      city: 'Dolpa',
      contactPerson: 'Prakash Gurung',
      contactPhone: '+977-9823456789',
      requiredBy: '2025-12-14',
      postedTime: '1 hour ago',
      status: 'active'
    },
    {
      id: '4',
      patientName: 'Ramesh Rai',
      bloodGroup: 'AB+',
      unitsNeeded: '2',
      urgency: 'medium',
      hospital: 'District Hospital',
      city: 'Humla',
      contactPerson: 'Sunita Rai',
      contactPhone: '+977-9834567890',
      requiredBy: '2025-12-16',
      postedTime: '3 hours ago',
      status: 'active'
    },
    {
      id: '5',
      patientName: 'Krishna Adhikari',
      bloodGroup: 'O-',
      unitsNeeded: '1',
      urgency: 'high',
      hospital: 'Red Cross Health Center',
      city: 'Bajura',
      contactPerson: 'Laxmi Adhikari',
      contactPhone: '+977-9845678901',
      requiredBy: '2025-12-15',
      postedTime: '4 hours ago',
      status: 'active'
    }
  ];

  const urgencyColors = {
    low: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500' },
    medium: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-500' },
    high: { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700', badge: 'bg-orange-500' },
    critical: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', badge: 'bg-red-500' }
  };

  const cities = [...new Set(mockRequests.map(r => r.city))];

  const filteredRequests = mockRequests.filter(request => {
    if (selectedUrgency !== 'all' && request.urgency !== selectedUrgency) return false;
    if (selectedCity !== 'all' && request.city !== selectedCity) return false;
    return true;
  });

  const handleDonate = (request: BloodRequest) => {
    console.log('\n ========================== DONOR RESPONSE ==========================');
    console.log(' Donor is responding to blood request:');
    console.log(`   Request ID: ${request.id}`);
    console.log(`   Patient: ${request.patientName}`);
    console.log(`   Blood Group: ${request.bloodGroup}`);
    console.log(`   Hospital: ${request.hospital}`);
    console.log(`   Contact Person: ${request.contactPerson}`);
    console.log(`   Contact Phone: ${request.contactPhone}`);
    console.log('\nInitiating contact with requester...');
    console.log(`   Calling ${request.contactPhone}...`);
    console.log('======================================================================\n');
    
    alert(`Connecting you with ${request.contactPerson} at ${request.contactPhone}\n\nThank you for your willingness to donate!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Active Blood Requests</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            People in need are waiting for your help. View active blood requests and respond immediately.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Urgency
                </label>
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Urgency Levels</option>
                  <option value="critical">Critical - Immediate</option>
                  <option value="high">High - Within 24 hours</option>
                  <option value="medium">Medium - Within 3 days</option>
                  <option value="low">Low - Within 7 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 font-medium">
                    {filteredRequests.length} Active Request{filteredRequests.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Requests List */}
        {filteredRequests.length === 0 ? (
          <Card className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Requests Found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more blood requests.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((request) => (
              <Card 
                key={request.id} 
                className={`border-l-4 ${urgencyColors[request.urgency].border} hover:shadow-xl transition-shadow`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Request Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">{request.patientName}</h3>
                          <span className={`${urgencyColors[request.urgency].badge} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                            {request.urgency}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Posted {request.postedTime}
                        </p>
                      </div>
                      <div className={`${urgencyColors[request.urgency].bg} ${urgencyColors[request.urgency].text} px-6 py-3 rounded-lg text-center border-2 ${urgencyColors[request.urgency].border}`}>
                        <Droplet className="h-8 w-8 mx-auto mb-1" fill="currentColor" />
                        <p className="text-2xl font-bold">{request.bloodGroup}</p>
                        <p className="text-xs font-semibold">{request.unitsNeeded} units</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-semibold">{request.hospital}</p>
                          <p className="text-sm text-gray-600">{request.city}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <User className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-semibold">{request.contactPerson}</p>
                          <p className="text-sm text-gray-600">Contact Person</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-semibold">{request.contactPhone}</p>
                          <p className="text-sm text-gray-600">Phone Number</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-semibold">{request.requiredBy}</p>
                          <p className="text-sm text-gray-600">Required By</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => handleDonate(request)}
                      size="lg"
                      className="w-full lg:w-auto whitespace-nowrap"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      I Can Donate
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12">
          <Card className="bg-blue-50 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">How to Respond to a Request</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>Click "I Can Donate" on any request you can fulfill</li>
                  <li>You'll be connected with the contact person immediately</li>
                  <li>Coordinate directly with them about donation time and location</li>
                  <li>Check your browser console (F12) to see connection logs</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActiveRequests;
