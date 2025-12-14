import React, { useState, useRef, useEffect } from 'react';
import { Droplet, User, Phone, Mail, MapPin, Calendar, QrCode, Camera, X } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { bloodGroups, cities } from '../data/mockData';
import { Html5QrcodeScanner } from 'html5-qrcode';

const DonorRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    city: '',
    dateOfBirth: '',
    weight: '',
    lastDonation: '',
    medicalConditions: '',
    availability: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState<'manual' | 'qr'>('manual');
  const [cameraError, setCameraError] = useState('');
  const [scanSuccess, setScanSuccess] = useState(false);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store donor data in localStorage
    const donorData = {
      name: formData.fullName,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      email: formData.email,
      address: formData.city,
      dateOfBirth: formData.dateOfBirth,
      weight: formData.weight,
      lastDonation: formData.lastDonation || '2024-01-15',
      totalDonations: 5,
      available: formData.availability,
      medicalConditions: formData.medicalConditions
    };
    
    localStorage.setItem('donorProfile', JSON.stringify(donorData));
    console.log('Donor data saved to profile:', donorData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onScanSuccess = async (decodedText: string) => {
    console.log('\n ========================== QR CODE SCANNED ==========================');
    console.log('QR Code Data:', decodedText);
    
    let scannedData;
    
    try {
      // Parse QR code data (assuming JSON format from Red Cross cards)
      const donorData = JSON.parse(decodedText);
      
      console.log('Donor Information Retrieved:');
      console.log(`   Name: ${donorData.fullName || donorData.name}`);
      console.log(`   Blood Group: ${donorData.bloodGroup}`);
      console.log(`   Phone: ${donorData.phone}`);
      console.log(`   City: ${donorData.city || donorData.address}`);
      console.log('======================================================================\n');
      
      scannedData = {
        fullName: donorData.fullName || donorData.name || '',
        email: donorData.email || '',
        phone: donorData.phone || '',
        bloodGroup: donorData.bloodGroup || '',
        city: donorData.city || donorData.address || '',
        dateOfBirth: donorData.dateOfBirth || donorData.dob || '',
        weight: donorData.weight || '',
        lastDonation: '',
        medicalConditions: '',
        availability: true
      };
    } catch (error) {
      // If not JSON, treat as simple donor ID and use demo data
      console.log('Using demo data for QR code:', decodedText);
      console.log('Donor Information Retrieved:');
      console.log('   Name: Ram Prasad Sharma');
      console.log('   Blood Group: O+');
      console.log('   Phone: +977 9841234567');
      console.log('   City: Jumla');
      console.log('======================================================================\n');
      
      scannedData = {
        fullName: 'Ram Prasad Sharma',
        email: 'ram.sharma@example.com',
        phone: '+977 9841234567',
        bloodGroup: 'O+',
        city: 'Jumla',
        dateOfBirth: '1995-05-15',
        weight: '65',
        lastDonation: '',
        medicalConditions: '',
        availability: true
      };
    }
    
    setFormData(scannedData);
    setScanSuccess(true);
    setRegistrationMethod('qr');
    
    // Stop scanner and close modal
    if (qrScannerRef.current) {
      qrScannerRef.current.clear();
      qrScannerRef.current = null;
    }
    
    setTimeout(() => {
      setShowQRScanner(false);
      setScanSuccess(false);
    }, 1500);

    // Auto-submit the form after QR scan
    console.log('Auto-submitting registration from QR scan...');
    setIsSubmitting(true);
    
    // Store donor data in localStorage
    const donorData = {
      name: scannedData.fullName,
      bloodGroup: scannedData.bloodGroup,
      phone: scannedData.phone,
      email: scannedData.email,
      address: scannedData.city,
      dateOfBirth: scannedData.dateOfBirth,
      weight: scannedData.weight,
      lastDonation: scannedData.lastDonation || '2024-01-15',
      totalDonations: 5,
      available: scannedData.availability,
      medicalConditions: scannedData.medicalConditions
    };
    
    localStorage.setItem('donorProfile', JSON.stringify(donorData));
    console.log('Donor data saved to profile:', donorData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const onScanError = (errorMessage: string) => {
    // Silent error handling - only log significant errors
    if (errorMessage.includes('NotAllowedError')) {
      setCameraError('Camera permission denied. Please allow camera access.');
    }
  };

  const startQRScanner = () => {
    setShowQRScanner(true);
    setCameraError('');
    
    // Initialize scanner after modal is shown
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        { 
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );
      
      scanner.render(onScanSuccess, onScanError);
      qrScannerRef.current = scanner;
    }, 100);
  };

  const closeScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear();
      qrScannerRef.current = null;
    }
    setShowQRScanner(false);
    setCameraError('');
    setScanSuccess(false);
  };

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
      }
    };
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center border-l-4 border-red-600">
            <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Droplet className="h-10 w-10 text-white" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to BloodLink!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for registering as a blood donor. You're now part of our life-saving community.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">
                You'll receive notifications when your blood type is needed in your area.
              </p>
            </div>
            <Button onClick={() => setSubmitted(false)}>
              Register Another Donor
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* QR Code Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-red-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <QrCode className="h-6 w-6" />
                <h3 className="text-xl font-bold">Scan Your Donor Card QR Code</h3>
              </div>
              <button
                onClick={closeScanner}
                className="p-2 hover:bg-red-700 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {scanSuccess ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-bold text-xl mb-2">QR Code Scanned!</p>
                  <p className="text-gray-600">Loading your information...</p>
                </div>
              ) : cameraError ? (
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-red-600 mx-auto mb-4" />
                  <p className="text-red-600 font-semibold mb-2">Camera Access Required</p>
                  <p className="text-gray-600 mb-4">{cameraError}</p>
                  <Button onClick={closeScanner} variant="outline">
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  {/* QR Scanner Container */}
                  <div id="qr-reader" className="rounded-lg overflow-hidden mb-4"></div>
                  
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">
                      Position the QR code from your Red Cross donor card within the frame
                    </p>
                    <p className="text-sm text-gray-500">
                      Tip: Hold steady and ensure good lighting for best results
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplet className="h-10 w-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Life Saver</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Register as a blood donor and join our community of heroes. Your donation can save up to 3 lives.
          </p>
        </div>

        {/* Registration Method Selection */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Registration Method</h2>
              <p className="text-gray-600">
                Have a Red Cross donor card? Scan your QR code for instant registration!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* QR Code Option */}
              <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                registrationMethod === 'qr' 
                  ? 'border-red-600 bg-red-50' 
                  : 'border-gray-300 hover:border-red-400 bg-white'
              }`}>
                <div className="text-center">
                  <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Scan QR Code</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Quick registration for Red Cross campaign participants
                  </p>
                  <Button 
                    type="button"
                    onClick={startQRScanner}
                    loading={showQRScanner}
                    className="w-full"
                    variant={registrationMethod === 'qr' ? 'primary' : 'outline'}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    {showQRScanner ? 'Scanning...' : 'Scan Your Card'}
                  </Button>
                  
                  {registrationMethod === 'qr' && (
                    <div className="mt-3 flex items-center justify-center space-x-2 text-green-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold">QR Code Scanned!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Registration Option */}
              <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                registrationMethod === 'manual' 
                  ? 'border-red-600 bg-red-50' 
                  : 'border-gray-300 hover:border-red-400 bg-white'
              }`}
              onClick={() => setRegistrationMethod('manual')}>
                <div className="text-center">
                  <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Manual Registration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Fill out the form below with your information
                  </p>
                  <Button 
                    type="button"
                    variant={registrationMethod === 'manual' ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => setRegistrationMethod('manual')}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Register Manually
                  </Button>
                </div>
              </div>
            </div>

            {/* Red Cross Campaign Info */}
            <div className="mt-6 bg-white border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Droplet className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Red Cross Rural Campaign</h4>
                  <p className="text-sm text-gray-600">
                    Nepal Red Cross Society conducts blood group testing campaigns in rural areas. 
                    If you participated in our village campaign and received a donor card with a QR code, 
                    use it for instant registration with all your details pre-filled!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Registration Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-red-200 pb-2">
                  Personal Information
                </h3>
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-red-200 pb-2">
                  Medical Information
                </h3>

                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  >
                    <option value="">Select your blood group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    >
                      <option value="">Select your city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    required
                    min="45"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Minimum 45kg required"
                  />
                </div>

                <div>
                  <label htmlFor="lastDonation" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    id="lastDonation"
                    name="lastDonation"
                    value={formData.lastDonation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank if first-time donor</p>
                </div>

                <div>
                  <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions
                  </label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    rows={3}
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="List any medical conditions or medications (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-8">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  I am currently available to donate and agree to be contacted for urgent requests.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                size="lg" 
                loading={isSubmitting}
                className="w-full"
              >
                <Droplet className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Registering...' : 'Register as Donor'}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DonorRegistration;