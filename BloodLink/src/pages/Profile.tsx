import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Droplet, Calendar, QrCode as QrCodeIcon, Edit2, Check, X, LogOut } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { QRCodeCanvas } from 'qrcode.react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  // Load data from localStorage or use default
  const loadUserData = () => {
    const savedData = localStorage.getItem('donorProfile');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

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
        setEditedData({
          ...editedData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationLoading(false);
        console.log('Location updated:', position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLocationError('Unable to retrieve location. Please enable location services.');
        setLocationLoading(false);
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const [userData, setUserData] = useState(loadUserData());
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Redirect to registration if no user data
  useEffect(() => {
    if (!userData) {
      navigate('/register');
    }
  }, [userData, navigate]);

  // Don't render if no userData
  if (!userData) {
    return null;
  }

  // Generate QR code data
  const qrCodeData = JSON.stringify({
    name: userData.name,
    bloodGroup: userData.bloodGroup,
    phone: userData.phone,
    address: userData.address
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    console.log('=== PROFILE UPDATE ===');
    console.log('Previous data:', userData);
    console.log('Updated data:', editedData);
    setUserData(editedData);
    localStorage.setItem('donorProfile', JSON.stringify(editedData));
    setIsEditing(false);
    console.log('Profile updated successfully and saved to localStorage');
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const toggleAvailability = () => {
    const newStatus = !userData.available;
    console.log('=== AVAILABILITY STATUS CHANGE ===');
    console.log(`Donor: ${userData.name}`);
    console.log(`Blood Group: ${userData.bloodGroup}`);
    console.log(`Location: ${userData.address}`);
    console.log(`Previous Status: ${userData.available ? 'Available' : 'Not Available'}`);
    console.log(`New Status: ${newStatus ? 'Available' : 'Not Available'}`);
    console.log('===================================');
    
    const updatedData = { ...userData, available: newStatus };
    setUserData(updatedData);
    setEditedData({ ...editedData, available: newStatus });
    localStorage.setItem('donorProfile', JSON.stringify(updatedData));
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleLogout = () => {
    console.log('=== LOGOUT ===');
    console.log('Clearing donor profile data');
    localStorage.removeItem('donorProfile');
    console.log('Logged out successfully');
    navigate('/register');
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const link = document.createElement('a');
      link.download = `${userData.name}-qr-code.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your donor information and availability</p>
        </div>

        <>
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                {!isEditing ? (
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit2 className="w-5 h-5 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="primary" onClick={handleSave}>
                      <Check className="w-5 h-5 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-gray-600 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-gray-600 mb-2">
                    <Droplet className="w-4 h-4 mr-2" />
                    Blood Group
                  </label>
                  {isEditing ? (
                    <select
                      value={editedData.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.bloodGroup}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-gray-600 mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-gray-600 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    GPS Location
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Button 
                        type="button"
                        variant={editedData.latitude ? "primary" : "outline"}
                        onClick={captureLocation}
                        disabled={locationLoading}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        {locationLoading ? 'Getting Location...' : editedData.latitude ? 'Update Location' : 'Capture Location'}
                      </Button>
                      {editedData.latitude && editedData.longitude && (
                        <p className="text-sm text-green-600">
                          {editedData.latitude.toFixed(4)}, {editedData.longitude.toFixed(4)}
                        </p>
                      )}
                      {locationError && (
                        <p className="text-sm text-red-600">{locationError}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        GPS location enables distance-based blood request matching
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-800 font-medium">
                      {userData.latitude && userData.longitude
                        ? `${userData.latitude.toFixed(4)}, ${userData.longitude.toFixed(4)}`
                        : 'Not set - Enable location for better matching'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.dateOfBirth}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.address}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Donation History Card */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Donation History</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Total Donations</p>
                  <p className="text-3xl font-bold text-red-600">{userData.totalDonations}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Last Donation</p>
                  <p className="text-xl font-semibold text-gray-800">{userData.lastDonation}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">Eligible to Donate</p>
                  <p className="text-xl font-semibold text-green-600">Yes</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Availability and QR Code */}
          <div className="space-y-6">
            {/* Availability Status Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Availability Status</h2>
              <div className="text-center">
                <div className={`inline-flex items-center px-6 py-3 rounded-full mb-4 ${
                  userData.available 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    userData.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="font-semibold">
                    {userData.available ? 'Available to Donate' : 'Not Available'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {userData.available 
                    ? 'You will receive notifications for emergency blood requests' 
                    : 'You will not receive emergency notifications'}
                </p>

                <Button
                  variant={userData.available ? 'outline' : 'primary'}
                  onClick={toggleAvailability}
                  className="w-full"
                >
                  {userData.available ? 'Mark as Unavailable' : 'Mark as Available'}
                </Button>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-700">
                    Change your status when you're temporarily unable to donate
                  </p>
                </div>
              </div>
            </Card>

            {/* QR Code Card */}
            <Card className="p-6">
              <div className="text-center">
                <QrCodeIcon className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your QR Code</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Show this QR code at Red Cross camps for quick registration
                </p>
                
                <div className="bg-white p-4 rounded-lg inline-block border-2 border-gray-200">
                  <QRCodeCanvas
                    value={qrCodeData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadQRCode}
                  className="mt-4 w-full"
                >
                  Download QR Code
                </Button>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    Red Cross volunteers can scan this code to access your donor information
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        </>
      </div>
    </div>
  );
};

export default Profile;
