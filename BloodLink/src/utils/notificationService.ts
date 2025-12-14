import { mockDonors, mockBloodBanks } from '../data/mockData';

interface BloodRequest {
  patientName: string;
  bloodGroup: string;
  city: string;
  urgency: string;
  contactPhone: string;
  hospital: string;
  unitsNeeded: string;
}

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

export const sendEmergencyNotifications = (request: BloodRequest) => {
  console.log('\n🚨 ========================== EMERGENCY BLOOD REQUEST ==========================');
  console.log('📋 REQUEST DETAILS:');
  console.log(`   Patient: ${request.patientName}`);
  console.log(`   Blood Group Needed: ${request.bloodGroup}`);
  console.log(`   Units Required: ${request.unitsNeeded}`);
  console.log(`   Location: ${request.hospital}, ${request.city}`);
  console.log(`   Urgency Level: ${request.urgency.toUpperCase()}`);
  console.log(`   Contact: ${request.contactPhone}`);
  console.log('================================================================================\n');

  console.log('🔍 SEARCHING FOR COMPATIBLE DONORS...');
  console.log(`   📍 Search Location: ${request.city} ONLY`);
  console.log(`   🩸 Blood Type Needed: ${request.bloodGroup}`);
  console.log(`   📊 Total Donors in Database: ${mockDonors.length}`);
  
  // Show filtering process
  const donorsInCity = mockDonors.filter(donor => donor.city === request.city);
  console.log(`   ✓ Donors in ${request.city}: ${donorsInCity.length}`);
  
  const availableDonorsInCity = donorsInCity.filter(donor => donor.availability);
  console.log(`   ✓ Available donors in ${request.city}: ${availableDonorsInCity.length}`);

  // Find compatible donors
  const compatibleDonors = mockDonors.filter(donor => {
    const donorCanDonate = bloodCompatibility[donor.bloodGroup]?.includes(request.bloodGroup);
    const sameCity = donor.city === request.city;
    const isAvailable = donor.availability;
    
    return donorCanDonate && sameCity && isAvailable;
  });

  console.log(`   ✓ Compatible blood type donors in ${request.city}: ${compatibleDonors.length}`);
  console.log('--------------------------------------------------------------------------------\n');

  // Find blood banks in the same city
  console.log('🏥 SEARCHING FOR BLOOD BANKS...');
  console.log(`   📍 Search Location: ${request.city} ONLY`);
  console.log(`   📊 Total Blood Banks in Database: ${mockBloodBanks.length}`);
  
  const banksInCity = mockBloodBanks.filter(bank => bank.city === request.city);
  console.log(`   ✓ Blood banks in ${request.city}: ${banksInCity.length}`);
  
  const nearbyBloodBanks = mockBloodBanks.filter(bank => 
    bank.city === request.city && bank.bloodGroups.includes(request.bloodGroup)
  );
  
  console.log(`   ✓ Blood banks with ${request.bloodGroup} in ${request.city}: ${nearbyBloodBanks.length}`);
  console.log('--------------------------------------------------------------------------------\n');

  console.log(`🎯 SENDING NOTIFICATIONS TO DONORS IN ${request.city}:`);
  console.log('================================================================================');
  
  if (compatibleDonors.length === 0) {
    console.log(`   ⚠️  No compatible donors found in ${request.city}.`);
    console.log('   ℹ️  Only searching within the requested city for location accuracy.');
    console.log('   💡 Recommendation: Expand search to nearby districts or contact blood banks.\n');
  } else {
    compatibleDonors.forEach((donor, index) => {
      console.log(`\n   ${index + 1}. ${donor.name}`);
      console.log(`      Blood Group: ${donor.bloodGroup}`);
      console.log(`      Phone: ${donor.phone}`);
      console.log(`      Email: ${donor.email}`);
      console.log(`      Last Donation: ${donor.lastDonation}`);
      console.log(`      Location: ${donor.city} ✓ (Same as request)`);
      
      console.log(`      📱 Sending SMS to ${donor.phone}...`);
      console.log(`      ✉️  Sending Email to ${donor.email}...`);
      console.log(`      📞 Initiating Auto-Call...`);
      console.log(`      ✅ Notifications sent successfully!`);
    });
  }

  console.log('\n================================================================================');
  console.log(`🏥 CONTACTING BLOOD BANKS IN ${request.city}:`);
  console.log('================================================================================');
  
  if (nearbyBloodBanks.length === 0) {
    console.log(`   ⚠️  No blood banks with ${request.bloodGroup} found in ${request.city}.\n`);
  } else {
    nearbyBloodBanks.forEach((bank, index) => {
      console.log(`\n   ${index + 1}. ${bank.name}`);
      console.log(`      Address: ${bank.address}`);
      console.log(`      City: ${bank.city} ✓ (Same as request)`);
      console.log(`      Phone: ${bank.phone}`);
      console.log(`      Emergency Line: ${bank.emergencyPhone}`);
      console.log(`      Available Blood Groups: ${bank.bloodGroups.join(', ')}`);
      console.log(`      Hours: ${bank.hours}`);
      
      console.log(`      📞 Calling emergency line ${bank.emergencyPhone}...`);
      console.log(`      ✅ Blood bank notified!`);
    });
  }

  console.log('\n================================================================================');
  console.log('📊 NOTIFICATION SUMMARY:');
  console.log(`   🎯 Search Scope: ${request.city} ONLY (Location-based filtering)`);
  console.log(`   ✅ ${compatibleDonors.length} donors in ${request.city} notified via SMS, Email & Phone Call`);
  console.log(`   ✅ ${nearbyBloodBanks.length} blood banks in ${request.city} contacted`);
  console.log(`   ⏱️  Response expected within 5-10 minutes`);
  console.log('   ℹ️  Only people/banks in the same city were contacted for accuracy');
  console.log('================================================================================\n');

  // Return summary for UI
  return {
    donorsNotified: compatibleDonors.length,
    bloodBanksNotified: nearbyBloodBanks.length,
    compatibleDonors,
    nearbyBloodBanks
  };
};
