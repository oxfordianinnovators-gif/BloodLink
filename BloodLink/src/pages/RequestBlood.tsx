import React, { useState } from 'react';
import { User, Phone, MapPin, AlertTriangle, Hash, CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { bloodGroups, cities } from '../data/mockData';
import { sendEmergencyNotifications } from '../utils/notificationService';

const RequestBlood: React.FC = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    contactPerson: '',
    contactPhone: '',
    bloodGroup: '',
    urgency: '',
    unitsNeeded: '',
    hospital: '',
    city: '',
    latitude: null as number | null,
    longitude: null as number | null,
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notificationResults, setNotificationResults] = useState<any>(null);
  const [searchRadius, setSearchRadius] = useState(50);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const urgencyLevels = [
    { value: 'low', label: 'Low - Within 7 days', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Within 3 days', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Within 24 hours', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical - Immediate', color: 'text-red-600' }
  ];

  const captureLocation = () => {
    setLocationLoading(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser');
      setLocationLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationLoading(false);
        console.log('Request location captured:', position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLocationError('Unable to retrieve location. Please enable location services.');
        setLocationLoading(false);
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let results;
    let effectiveRadius = searchRadius;
    const radiusOptions = [10, 25, 50, 100, 200];
    
    // If location is available, try progressive radius expansion
    if (formData.latitude && formData.longitude) {
      // Get the index of current search radius
      let radiusIndex = radiusOptions.indexOf(searchRadius);
      
      // Try with initial radius
      results = sendEmergencyNotifications({
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        city: formData.city,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
        urgency: formData.urgency,
        contactPhone: formData.contactPhone,
        hospital: formData.hospital,
        unitsNeeded: formData.unitsNeeded
      }, effectiveRadius);
      
      // If no donors found, progressively expand radius
      while (results.donorsNotified === 0 && radiusIndex < radiusOptions.length - 1) {
        radiusIndex++;
        effectiveRadius = radiusOptions[radiusIndex];
        
        console.log(`\n No donors found within ${radiusOptions[radiusIndex - 1]} km. Expanding search to ${effectiveRadius} km...`);
        
        results = sendEmergencyNotifications({
          patientName: formData.patientName,
          bloodGroup: formData.bloodGroup,
          city: formData.city,
          latitude: formData.latitude || undefined,
          longitude: formData.longitude || undefined,
          urgency: formData.urgency,
          contactPhone: formData.contactPhone,
          hospital: formData.hospital,
          unitsNeeded: formData.unitsNeeded
        }, effectiveRadius);
      }
      
      // Update search radius to show what was actually used
      setSearchRadius(effectiveRadius);
    } else {
      // No location - use city-based search
      results = sendEmergencyNotifications({
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        city: formData.city,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
        urgency: formData.urgency,
        contactPhone: formData.contactPhone,
        hospital: formData.hospital,
        unitsNeeded: formData.unitsNeeded
      }, effectiveRadius);
    }
    
    setNotificationResults(results);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-l-4 border-green-600">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Emergency Alert Sent Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Your blood request has been sent to compatible donors and blood banks in <span className="font-bold text-red-600">{formData.city}</span> only.
            </p>
            
            {/* Location Filter Notice */}
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-purple-900 mb-1">Location-Based Filtering Active</h3>
                  <p className="text-sm text-purple-800">
                    Our system only contacted people and blood banks in <strong>{formData.city}</strong> to ensure quick response time and location accuracy. No one outside your city was notified.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Notification Results */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Donors Contacted {formData.latitude ? `within ${searchRadius} km` : `in ${formData.city}`}
                </h3>
                <div className="text-blue-800">
                  <p className="font-semibold text-2xl mb-2">{notificationResults?.donorsNotified || 0} Compatible Donors</p>
                  {notificationResults?.compatibleDonors?.[0]?.distance !== null && notificationResults?.compatibleDonors?.[0]?.distance !== undefined && (
                    <p className="text-sm font-medium mb-2">
                      Nearest donor: {notificationResults.compatibleDonors[0].distance.toFixed(1)} km away
                    </p>
                  )}
                  <p className="text-sm">SMS sent to all donors !</p>
                  <p className="text-sm">Email notifications delivered !</p>
                  <p className="text-sm">Auto-calls initiated !</p>
                  {formData.latitude && (
                    <p className="text-xs mt-2 text-blue-600">Using GPS-based distance matching</p>
                  )}
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Blood Banks Contacted {formData.latitude ? `within ${searchRadius} km` : `in ${formData.city}`}
                </h3>
                <div className="text-purple-800">
                  <p className="font-semibold text-2xl mb-2">{notificationResults?.bloodBanksNotified || 0} Blood Banks</p>
                  <p className="text-sm">Emergency lines contacted</p>
                  <p className="text-sm">Inventory check requested</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Expected Response Time
                </h3>
                <div className="text-green-800">
                  <p className="font-semibold text-2xl mb-2">5-10 Minutes</p>
                  <p className="text-sm">You should start receiving responses shortly</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
              <p className="text-yellow-800 font-medium text-sm">
                 <strong>Check your browser console (F12)</strong> to see detailed notification logs for demonstration purposes.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">
                 For life-threatening emergencies, call 102 or your local emergency number immediately.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => { setSubmitted(false); setNotificationResults(null); }} variant="outline">
                Submit Another Request
              </Button>
              <Button>
                View Active Requests
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Blood</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Submit an urgent blood request and connect with compatible donors in your area immediately.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-8 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <p className="text-red-800 font-medium">
              For life-threatening emergencies, call 102 first, then use this form to find additional blood sources.
            </p>
          </div>
        </div>

        {/* Request Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-red-200 pb-2">
                  Patient Information
                </h3>
                
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      required
                      value={formData.patientName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Patient's full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group Required *
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  >
                    <option value="">Select blood group needed</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="unitsNeeded" className="block text-sm font-medium text-gray-700 mb-2">
                    Units Needed *
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      id="unitsNeeded"
                      name="unitsNeeded"
                      required
                      min="1"
                      max="10"
                      value={formData.unitsNeeded}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Number of units"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  >
                    <option value="">Select urgency level</option>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact & Location */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-red-200 pb-2">
                  Contact & Location
                </h3>

                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Your name or family member"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      required
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital/Medical Center *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="hospital"
                      name="hospital"
                      required
                      value={formData.hospital}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Hospital name and address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPS Location (Recommended for Better Matching)
                  </label>
                  <Button 
                    type="button"
                    variant={formData.latitude ? "primary" : "outline"}
                    onClick={captureLocation}
                    className="w-full"
                    disabled={locationLoading}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    {locationLoading ? 'Getting Location...' : formData.latitude ? 'Location Captured' : 'Capture Hospital Location'}
                  </Button>
                  {formData.latitude && formData.longitude && (
                    <p className="text-sm text-green-600 mt-2">
                      Location: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                    </p>
                  )}
                  {locationError && (
                    <p className="text-sm text-red-600 mt-2">{locationError}</p>
                  )}
                  {!formData.latitude && (
                    <p className="text-xs text-gray-500 mt-1">
                      Enable for distance-based donor search (finds donors within radius)
                    </p>
                  )}
                </div>

                {formData.latitude && formData.longitude && (
                  <div>
                    <label htmlFor="searchRadius" className="block text-sm font-medium text-gray-700 mb-2">
                      Search Radius
                    </label>
                    <select
                      id="searchRadius"
                      value={searchRadius}
                      onChange={(e) => setSearchRadius(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    >
                      <option value={10}>Within 10 km (Nearby only)</option>
                      <option value={25}>Within 25 km</option>
                      <option value={50}>Within 50 km (Recommended)</option>
                      <option value={100}>Within 100 km</option>
                      <option value={200}>Within 200 km (Wide search)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Any additional details about the patient's condition or special requirements..."
              />
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                size="lg" 
                loading={isSubmitting}
                className="w-full"
                variant="danger"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Submitting Request...' : 'Submit Blood Request'}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Your request will be immediately sent to all compatible donors in your area.
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestBlood;