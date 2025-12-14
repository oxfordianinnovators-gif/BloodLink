import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Users, MapPin, Calendar, Phone, ArrowRight, User } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Landing: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Active Donors', value: '2,500+' },
    { icon: Droplet, label: 'Lives Saved', value: '10,000+' },
    { icon: MapPin, label: 'Rural Districts Covered', value: '25+' },
    { icon: Calendar, label: 'Village Camps', value: '150+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Connecting Rural Nepal
                <span className="block text-red-200">One Drop at a Time</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-red-100">
                Bridging the gap between blood donors and rural communities. 
                Bringing hope to remote areas where every drop counts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/active-requests">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Droplet className="h-6 w-6 mr-2" />
                    Donate Now
                  </Button>
                </Link>
                <Link to="/request">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white ">
                    Request Blood
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                <div className="text-center">
                  <Droplet className="h-24 w-24 text-red-300 mx-auto mb-4" fill="currentColor" />
                  <h3 className="text-2xl font-bold mb-2">Serving Rural Communities</h3>
                  <p className="text-red-100">
                    Reaching remote villages and ensuring no one is left behind in times of need
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-red-100">
                      In Collaboration with <span className="font-bold text-white">Nepal Red Cross Society</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Cross Campaign Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-red-600 text-white px-6 py-3 rounded-full mb-6">
              <Droplet className="h-6 w-6" fill="currentColor" />
              <span className="font-bold text-lg">Red Cross Rural Campaign</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Know Your Blood, Save Lives</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Nepal Red Cross Society conducts blood group testing campaigns in rural areas across Nepal. 
              Get your blood group tested for free and receive a personalized donor card with your details and a unique QR code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card className="text-center border-t-4 border-red-600 bg-white">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Visit Campaign</h3>
              <p className="text-gray-600 text-sm">
                Red Cross teams visit rural villages and remote areas for free blood group testing.
              </p>
            </Card>

            <Card className="text-center border-t-4 border-red-600 bg-white">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Get Tested</h3>
              <p className="text-gray-600 text-sm">
                Medical professionals check your blood group and verify your eligibility to donate.
              </p>
            </Card>

            <Card className="text-center border-t-4 border-red-600 bg-white">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Receive Card</h3>
              <p className="text-gray-600 text-sm">
                Get your donor card with name, contact, address, blood group, and a unique QR code.
              </p>
            </Card>

            <Card className="text-center border-t-4 border-red-600 bg-white">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-red-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v3h-3v-3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">4. Scan & Join</h3>
              <p className="text-gray-600 text-sm">
                Use your QR code to instantly register on BloodLink and start saving lives.
              </p>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Already Have Your Donor Card?</h3>
                <p className="text-gray-600 mb-4">
                  If you received your card from our rural campaign, simply scan your QR code on the registration page to instantly join BloodLink with all your details pre-filled!
                </p>
                <div className="flex items-center space-x-2 text-red-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v3h-3v-3z"/>
                  </svg>
                  <span className="font-semibold">Quick QR Code Sign In Available</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link to="/register">
                  <Button size="lg" className="whitespace-nowrap">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v3h-3v-3z"/>
                    </svg>
                    Scan QR Code Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Reaching Every Corner of Nepal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From bustling cities to remote mountain villages, we connect donors with those in need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-l-4 border-red-600">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Register as Donor</h3>
              <p className="text-gray-600">
                Sign up with your blood type and contact information. Join our community of life savers.
              </p>
            </Card>

            <Card className="text-center border-l-4 border-red-600">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Get Matched</h3>
              <p className="text-gray-600">
                We connect you with donors in your district, even in remote areas where access is limited.
              </p>
            </Card>

            <Card className="text-center border-l-4 border-red-600">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Save Lives</h3>
              <p className="text-gray-600">
                Connect directly and coordinate donation. Every donation can save up to 3 lives.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="bg-red-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Phone className="h-8 w-8 text-white" />
            <h2 className="text-3xl font-bold text-white">24/7 Emergency Support</h2>
          </div>
          <p className="text-xl text-red-100 mb-6">
            Need blood urgently? Our emergency team is available around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request">
              <Button variant="outline" size="lg" className="bg-white text-red-600 hover:bg-red-50 border-white">
                Request Blood Now
              </Button>
            </Link>
            <a href="tel:102" className="inline-block">
              <Button variant="secondary" size="lg">
                <Phone className="h-5 w-5 mr-2" />
                Call Emergency (102)
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Help Us Reach Every Village</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our mission to bring life-saving blood services to rural Nepal. Your donation could save a life in a remote community.
          </p>
          <Link to="/register">
            <Button size="lg" className="text-xl px-12 py-4">
              <Droplet className="h-6 w-6 mr-2" />
              Start Saving Lives Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;