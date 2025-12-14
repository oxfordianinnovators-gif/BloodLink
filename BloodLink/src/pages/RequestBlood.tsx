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
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notificationResults, setNotificationResults] = useState<any>(null);

  const urgencyLevels = [
    { value: 'low', label: 'Low - Within 7 days', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Within 3 days', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Within 24 hours', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical - Immediate', color: 'text-red-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Send emergency notifications and log to console
    const results = sendEmergencyNotifications({
      patientName: formData.patientName,
      bloodGroup: formData.bloodGroup,
      city: formData.city,
      urgency: formData.urgency,
      contactPhone: formData.contactPhone,
      hospital: formData.hospital,
      unitsNeeded: formData.unitsNeeded
    });
    
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
                  Donors Contacted in {formData.city}
                </h3>
                <div className="text-blue-800">
                  <p className="font-semibold text-2xl mb-2">{notificationResults?.donorsNotified || 0} Compatible Donors</p>
                  <p className="text-sm">! SMS sent to all donors !</p>
                  <p className="text-sm">! Email notifications delivered !</p>
                  <p className="text-sm">! Auto-calls initiated !</p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Blood Banks Contacted in {formData.city}
                </h3>
                <div className="text-purple-800">
                  <p className="font-semibold text-2xl mb-2">{notificationResults?.bloodBanksNotified || 0} Blood Banks</p>
                  <p className="text-sm">! Emergency lines contacted</p>
                  <p className="text-sm">! Inventory check requested</p>
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
                 For life-threatening emergencies, call 911 or your local emergency number immediately.
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
              For life-threatening emergencies, call 911 first, then use this form to find additional blood sources.
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