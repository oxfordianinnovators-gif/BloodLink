import type { Donor, BloodBank, Event } from '../types';

export const mockDonors: Donor[] = [
  {
    id: '1',
    name: 'Raj Kumar Sharma',
    bloodGroup: 'O+',
    phone: '+977-9841234567',
    email: 'raj@email.com',
    city: 'Jumla',
    availability: true,
    lastDonation: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sita Adhikari',
    bloodGroup: 'A+',
    phone: '+977-9812345678',
    email: 'sita@email.com',
    city: 'Mugu',
    availability: true,
    lastDonation: '2024-02-20'
  },
  {
    id: '3',
    name: 'Binod Thapa',
    bloodGroup: 'B-',
    phone: '+977-9823456789',
    email: 'binod@email.com',
    city: 'Dolpa',
    availability: false,
    lastDonation: '2024-03-10'
  },
  {
    id: '4',
    name: 'Anjali Gurung',
    bloodGroup: 'AB+',
    phone: '+977-9834567890',
    email: 'anjali@email.com',
    city: 'Humla',
    availability: true,
    lastDonation: '2024-01-05'
  },
  {
    id: '5',
    name: 'Ramesh Rai',
    bloodGroup: 'O-',
    phone: '+977-9845678901',
    email: 'ramesh@email.com',
    city: 'Bajura',
    availability: true,
    lastDonation: '2024-02-28'
  }
];

export const mockBloodBanks: BloodBank[] = [
  {
    id: '1',
    name: 'Red Cross Blood Bank - Jumla',
    address: 'Chandannath Road, Jumla Bazaar',
    city: 'Jumla',
    phone: '+977-87-520123',
    emergencyPhone: '+977-87-520999',
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    hours: '24/7'
  },
  {
    id: '2',
    name: 'District Hospital Blood Bank - Mugu',
    address: 'Gamgadhi, Mugu District',
    city: 'Mugu',
    phone: '+977-87-550101',
    emergencyPhone: '+977-87-550999',
    bloodGroups: ['A+', 'B+', 'O+', 'AB+'],
    hours: '8:00 AM - 6:00 PM'
  },
  {
    id: '3',
    name: 'Community Health Center - Dolpa',
    address: 'Dunai, Dolpa District',
    city: 'Dolpa',
    phone: '+977-87-560111',
    emergencyPhone: '+977-87-560888',
    bloodGroups: ['A+', 'A-', 'B+', 'O+', 'O-'],
    hours: '24/7'
  },
  {
    id: '4',
    name: 'Red Cross Center - Humla',
    address: 'Simikot, Humla District',
    city: 'Humla',
    phone: '+977-87-570101',
    emergencyPhone: '+977-87-570999',
    bloodGroups: ['A+', 'B+', 'O+', 'AB+', 'O-'],
    hours: '24/7'
  },
  {
    id: '5',
    name: 'District Hospital - Bajura',
    address: 'Martadi, Bajura District',
    city: 'Bajura',
    phone: '+977-87-580123',
    emergencyPhone: '+977-87-580999',
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
    hours: '24/7'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Rural Community Blood Drive',
    date: '2025-01-25',
    time: '10:00 AM - 4:00 PM',
    location: 'Community Hall, Jumla',
    organizer: 'Nepal Red Cross Society',
    description: 'Join us for our monthly community blood drive in Jumla. All blood types needed!'
  },
  {
    id: '2',
    title: 'Emergency Blood Collection Camp',
    date: '2025-01-28',
    time: '8:00 AM - 6:00 PM',
    location: 'District Hospital, Mugu',
    organizer: 'Red Cross - Mugu Branch',
    description: 'Urgent collection drive for critical patients. O- and AB+ donors especially needed.'
  },
  {
    id: '3',
    title: 'Village Health Fair & Blood Donation',
    date: '2025-02-02',
    time: '12:00 PM - 5:00 PM',
    location: 'Community Center, Dolpa',
    organizer: 'Nepal Red Cross Society',
    description: 'Health awareness and blood donation event for rural communities.'
  }
];

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const cities = ['Jumla', 'Mugu', 'Dolpa', 'Humla', 'Bajura'];