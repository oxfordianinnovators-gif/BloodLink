import { mockDonors, mockBloodBanks } from '../data/mockData';

interface BloodRequest {
  patientName: string;
  bloodGroup: string;
  city: string;
  latitude?: number;
  longitude?: number;
  urgency: string;
  contactPhone: string;
  hospital: string;
  unitsNeeded: string;
}

// Calculate distance between two GPS coordinates using Haversine formula
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number): number => deg * (Math.PI / 180);
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Blood group compatibility map
const bloodCompatibility: { [key: string]: string[] } = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

export const sendEmergencyNotifications = (request: BloodRequest, maxDistance: number = 50) => {
  const useGeoLocation = !!(request.latitude && request.longitude);
  
  console.log('\n=== EMERGENCY BLOOD REQUEST ===');
  console.log('REQUEST DETAILS:');
  console.log(`   Patient: ${request.patientName}`);
  console.log(`   Blood Group Needed: ${request.bloodGroup}`);
  console.log(`   Units Required: ${request.unitsNeeded}`);
  console.log(`   Location: ${request.hospital}, ${request.city}`);
  if (useGeoLocation) {
    console.log(`   GPS Coordinates: ${request.latitude?.toFixed(4)}, ${request.longitude?.toFixed(4)}`);
    console.log(`   Search Radius: ${maxDistance} km`);
  }
  console.log(`   Urgency Level: ${request.urgency.toUpperCase()}`);
  console.log(`   Contact: ${request.contactPhone}`);
  console.log('================================================================================\n');

  console.log('SEARCHING FOR COMPATIBLE DONORS...');
  if (useGeoLocation) {
    console.log(`   Search Method: DISTANCE-BASED (within ${maxDistance} km)`);
    console.log(`   Total Donors in Database: ${mockDonors.length}`);
  } else {
    console.log(`   Search Method: CITY-BASED (${request.city} only)`);
    console.log(`   Total Donors in Database: ${mockDonors.length}`);
  }
  console.log(`   Blood Type Needed: ${request.bloodGroup}`);
  
  // Find compatible donors with distance calculation
  const compatibleDonorsWithDistance = mockDonors
    .filter(donor => {
      const donorCanDonate = bloodCompatibility[donor.bloodGroup]?.includes(request.bloodGroup);
      const isAvailable = donor.availability;
      
      if (!donorCanDonate || !isAvailable) return false;
      
      // If geolocation available for both, use distance
      if (useGeoLocation && donor.latitude && donor.longitude) {
        const distance = calculateDistance(
          request.latitude!,
          request.longitude!,
          donor.latitude,
          donor.longitude
        );
        return distance <= maxDistance;
      }
      
      // Fallback to city-based filtering
      return donor.city === request.city;
    })
    .map(donor => {
      let distance: number | null = null;
      if (useGeoLocation && donor.latitude && donor.longitude) {
        distance = calculateDistance(
          request.latitude!,
          request.longitude!,
          donor.latitude,
          donor.longitude
        );
      }
      return { ...donor, distance };
    })
    .sort((a, b) => {
      // Sort by distance if available
      if (a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    });

  if (useGeoLocation) {
    const donorsWithLocation = mockDonors.filter(d => d.latitude && d.longitude).length;
    console.log(`   Donors with GPS location: ${donorsWithLocation}`);
    console.log(`   Donors within ${maxDistance} km: ${compatibleDonorsWithDistance.length}`);
  } else {
    const donorsInCity = mockDonors.filter(donor => donor.city === request.city);
    console.log(`   Donors in ${request.city}: ${donorsInCity.length}`);
    const availableDonorsInCity = donorsInCity.filter(donor => donor.availability);
    console.log(`   Available donors in ${request.city}: ${availableDonorsInCity.length}`);
  }

  console.log(`   Compatible donors found: ${compatibleDonorsWithDistance.length}`);
  console.log('--------------------------------------------------------------------------------\n');

  // Find blood banks in the same city or within distance
  console.log('SEARCHING FOR BLOOD BANKS...');
  if (useGeoLocation) {
    console.log(`   Search Method: DISTANCE-BASED (within ${maxDistance} km)`);
  } else {
    console.log(`   Search Method: CITY-BASED (${request.city} only)`);
  }
  console.log(`   Total Blood Banks in Database: ${mockBloodBanks.length}`);
  
  const nearbyBloodBanks = mockBloodBanks
    .filter(bank => {
      if (!bank.bloodGroups.includes(request.bloodGroup)) return false;
      
      if (useGeoLocation && bank.latitude && bank.longitude) {
        const distance = calculateDistance(
          request.latitude!,
          request.longitude!,
          bank.latitude,
          bank.longitude
        );
        return distance <= maxDistance;
      }
      
      return bank.city === request.city;
    });
  
  if (useGeoLocation) {
    console.log(`   Blood banks within ${maxDistance} km with ${request.bloodGroup}: ${nearbyBloodBanks.length}`);
  } else {
    const banksInCity = mockBloodBanks.filter(bank => bank.city === request.city);
    console.log(`   Blood banks in ${request.city}: ${banksInCity.length}`);
    console.log(`   Blood banks with ${request.bloodGroup} in ${request.city}: ${nearbyBloodBanks.length}`);
  }
  console.log('--------------------------------------------------------------------------------\n');

  const searchMethod = useGeoLocation ? `within ${maxDistance} km radius` : `in ${request.city}`;
  console.log(`SENDING NOTIFICATIONS TO DONORS ${searchMethod.toUpperCase()}:`);
  console.log('================================================================================');
  
  if (compatibleDonorsWithDistance.length === 0) {
    console.log(`   No compatible donors found ${searchMethod}.`);
    if (!useGeoLocation) {
      console.log('   Only searching within the requested city.');
      console.log('   Recommendation: Enable location services for distance-based search.\n');
    } else {
      console.log(`   Recommendation: Expand search radius beyond ${maxDistance} km or contact blood banks.\n`);
    }
  } else {
    compatibleDonorsWithDistance.forEach((donor, index) => {
      console.log(`\n   ${index + 1}. ${donor.name}`);
      console.log(`      Blood Group: ${donor.bloodGroup}`);
      console.log(`      Phone: ${donor.phone}`);
      console.log(`      Email: ${donor.email}`);
      console.log(`      Last Donation: ${donor.lastDonation}`);
      console.log(`      Location: ${donor.city}`);
      if (donor.distance !== null) {
        console.log(`      Distance: ${donor.distance.toFixed(2)} km away`);
      }
      
      console.log(`      Sending SMS to ${donor.phone}...`);
      console.log(`      Sending Email to ${donor.email}...`);
      console.log(`      Initiating Auto-Call...`);
      console.log(`      Notifications sent successfully!`);
    });
  }

  console.log('\n================================================================================');
  console.log(`CONTACTING BLOOD BANKS ${searchMethod.toUpperCase()}:`);
  console.log('================================================================================');
  
  if (nearbyBloodBanks.length === 0) {
    console.log(`   No blood banks with ${request.bloodGroup} found ${searchMethod}.\n`);
  } else {
    nearbyBloodBanks.forEach((bank, index) => {
      console.log(`\n   ${index + 1}. ${bank.name}`);
      console.log(`      Address: ${bank.address}`);
      console.log(`      City: ${bank.city}`);
      console.log(`      Phone: ${bank.phone}`);
      console.log(`      Emergency Line: ${bank.emergencyPhone}`);
      console.log(`      Available Blood Groups: ${bank.bloodGroups.join(', ')}`);
      console.log(`      Hours: ${bank.hours}`);
      
      console.log(`      Calling emergency line ${bank.emergencyPhone}...`);
      console.log(`      Blood bank notified!`);
    });
  }

  console.log('\n================================================================================');
  console.log('NOTIFICATION SUMMARY:');
  console.log(`   Search Method: ${useGeoLocation ? `DISTANCE-BASED (${maxDistance} km radius)` : `CITY-BASED (${request.city})`}`);
  console.log(`   ${compatibleDonorsWithDistance.length} donors notified via SMS, Email & Phone Call`);
  console.log(`   ${nearbyBloodBanks.length} blood banks contacted`);
  if (compatibleDonorsWithDistance.length > 0 && compatibleDonorsWithDistance[0].distance !== null) {
    console.log(`   Nearest donor: ${compatibleDonorsWithDistance[0].distance.toFixed(2)} km away`);
  }
  console.log(`   Response expected within 5-10 minutes`);
  if (!useGeoLocation) {
    console.log('   Enable location services for better distance-based matching');
  }
  console.log('================================================================================\n');

  // Return summary for UI
  return {
    donorsNotified: compatibleDonorsWithDistance.length,
    bloodBanksNotified: nearbyBloodBanks.length,
    compatibleDonors: compatibleDonorsWithDistance,
    nearbyBloodBanks
  };
};
