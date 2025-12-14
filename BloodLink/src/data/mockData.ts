import type { Donor, BloodBank, Event } from '../types';

export const mockDonors: Donor[] = [
  { id: '1', name: 'Asha Koirala', bloodGroup: 'A+', phone: '+977-9801000001', email: 'asha.koirala@example.com', city: 'Jumla', availability: true, lastDonation: '2024-01-10' },
  { id: '2', name: 'Bikram Shrestha', bloodGroup: 'A+', phone: '+977-9801000002', email: 'bikram.shrestha@example.com', city: 'Mugu', availability: true, lastDonation: '2024-02-14' },
  { id: '3', name: 'Chandra Gurung', bloodGroup: 'A+', phone: '+977-9801000003', email: 'chandra.gurung@example.com', city: 'Dolpa', availability: false, lastDonation: '2024-03-30' },
  { id: '4', name: 'Deepa Thapa', bloodGroup: 'A+', phone: '+977-9801000004', email: 'deepa.thapa@example.com', city: 'Humla', availability: true, lastDonation: '2024-04-05' },
  { id: '5', name: 'Eshan Khatri', bloodGroup: 'A+', phone: '+977-9801000005', email: 'eshan.khatri@example.com', city: 'Bajura', availability: true, lastDonation: '2024-02-01' },

  { id: '6', name: 'Fiza Lama', bloodGroup: 'A-', phone: '+977-9801000011', email: 'fiza.lama@example.com', city: 'Jumla', availability: true, lastDonation: '2024-01-20' },
  { id: '7', name: 'Gopal Rana', bloodGroup: 'A-', phone: '+977-9801000012', email: 'gopal.rana@example.com', city: 'Mugu', availability: false, lastDonation: '2024-03-01' },
  { id: '8', name: 'Himanshu Bista', bloodGroup: 'A-', phone: '+977-9801000013', email: 'himanshu.bista@example.com', city: 'Dolpa', availability: true, lastDonation: '2024-02-11' },
  { id: '9', name: 'Ishani Chettri', bloodGroup: 'A-', phone: '+977-9801000014', email: 'ishani.chettri@example.com', city: 'Humla', availability: true, lastDonation: '2024-04-12' },
  { id: '10', name: 'Jitendra Tamang', bloodGroup: 'A-', phone: '+977-9801000015', email: 'jitendra.tamang@example.com', city: 'Bajura', availability: false, lastDonation: '2024-03-18' },

  { id: '11', name: 'Kiran Bhandari', bloodGroup: 'B+', phone: '+977-9801000021', email: 'kiran.bhandari@example.com', city: 'Jumla', availability: true, lastDonation: '2024-02-02' },
  { id: '12', name: 'Laxmi Adhikari', bloodGroup: 'B+', phone: '+977-9801000022', email: 'laxmi.adhikari@example.com', city: 'Mugu', availability: true, lastDonation: '2024-01-25' },
  { id: '13', name: 'Mohan KC', bloodGroup: 'B+', phone: '+977-9801000023', email: 'mohan.kc@example.com', city: 'Dolpa', availability: true, lastDonation: '2024-03-05' },
  { id: '14', name: 'Nisha Rai', bloodGroup: 'B+', phone: '+977-9801000024', email: 'nisha.rai@example.com', city: 'Humla', availability: false, lastDonation: '2024-04-01' },
  { id: '15', name: 'Om Prasad', bloodGroup: 'B+', phone: '+977-9801000025', email: 'om.prasad@example.com', city: 'Bajura', availability: true, lastDonation: '2024-02-28' },

  { id: '16', name: 'Pooja KC', bloodGroup: 'B-', phone: '+977-9801000031', email: 'pooja.kc@example.com', city: 'Jumla', availability: true, lastDonation: '2024-01-08' },
  { id: '17', name: 'Rajan Shahi', bloodGroup: 'B-', phone: '+977-9801000032', email: 'rajan.shahi@example.com', city: 'Mugu', availability: true, lastDonation: '2024-02-19' },
  { id: '18', name: 'Sarita KC', bloodGroup: 'B-', phone: '+977-9801000033', email: 'sarita.kc@example.com', city: 'Dolpa', availability: false, lastDonation: '2024-03-22' },
  { id: '19', name: 'Tara Magar', bloodGroup: 'B-', phone: '+977-9801000034', email: 'tara.magar@example.com', city: 'Humla', availability: true, lastDonation: '2024-04-10' },
  { id: '20', name: 'Umesh Karki', bloodGroup: 'B-', phone: '+977-9801000035', email: 'umesh.karki@example.com', city: 'Bajura', availability: true, lastDonation: '2024-02-06' },

  { id: '21', name: 'Vijaya Sharma', bloodGroup: 'AB+', phone: '+977-9801000041', email: 'vijaya.sharma@example.com', city: 'Jumla', availability: true, lastDonation: '2024-01-12' },
  { id: '22', name: 'Waseem Ale', bloodGroup: 'AB+', phone: '+977-9801000042', email: 'waseem.ale@example.com', city: 'Mugu', availability: false, lastDonation: '2024-03-02' },
  { id: '23', name: 'Xena Kc', bloodGroup: 'AB+', phone: '+977-9801000043', email: 'xena.kc@example.com', city: 'Dolpa', availability: true, lastDonation: '2024-02-27' },
  { id: '24', name: 'Yogesh Bhandari', bloodGroup: 'AB+', phone: '+977-9801000044', email: 'yogesh.bhandari@example.com', city: 'Humla', availability: true, lastDonation: '2024-04-15' },
  { id: '25', name: 'Zara Thapa', bloodGroup: 'AB+', phone: '+977-9801000045', email: 'zara.thapa@example.com', city: 'Bajura', availability: true, lastDonation: '2024-02-09' },

  { id: '26', name: 'Arjun Gurung', bloodGroup: 'AB-', phone: '+977-9801000051', email: 'arjun.gurung@example.com', city: 'Jumla', availability: false, lastDonation: '2024-03-12' },
  { id: '27', name: 'Bina Lama', bloodGroup: 'AB-', phone: '+977-9801000052', email: 'bina.lama@example.com', city: 'Mugu', availability: true, lastDonation: '2024-01-30' },
  { id: '28', name: 'Chetan Malla', bloodGroup: 'AB-', phone: '+977-9801000053', email: 'chetan.malla@example.com', city: 'Dolpa', availability: true, lastDonation: '2024-02-16' },
  { id: '29', name: 'Dipa Sharma', bloodGroup: 'AB-', phone: '+977-9801000054', email: 'dipa.sharma@example.com', city: 'Humla', availability: true, lastDonation: '2024-04-03' },
  { id: '30', name: 'Eklavya Rai', bloodGroup: 'AB-', phone: '+977-9801000055', email: 'eklavya.rai@example.com', city: 'Bajura', availability: false, lastDonation: '2024-03-25' },

  { id: '31', name: 'Fidel Gurung', bloodGroup: 'O+', phone: '+977-9801000061', email: 'fidel.gurung@example.com', city: 'Jumla', availability: true, lastDonation: '2024-01-05' },
  { id: '32', name: 'Gita KC', bloodGroup: 'O+', phone: '+977-9801000062', email: 'gita.kc@example.com', city: 'Mugu', availability: true, lastDonation: '2024-02-07' },
  { id: '33', name: 'Hira Pradhan', bloodGroup: 'O+', phone: '+977-9801000063', email: 'hira.pradhan@example.com', city: 'Dolpa', availability: true, lastDonation: '2024-03-09' },
  { id: '34', name: 'Indra Lama', bloodGroup: 'O+', phone: '+977-9801000064', email: 'indra.lama@example.com', city: 'Humla', availability: false, lastDonation: '2024-03-28' },
  { id: '35', name: 'Jyoti Rai', bloodGroup: 'O+', phone: '+977-9801000065', email: 'jyoti.rai@example.com', city: 'Bajura', availability: true, lastDonation: '2024-02-18' },

  { id: '36', name: 'Kumar Thapa', bloodGroup: 'O-', phone: '+977-9801000071', email: 'kumar.thapa@example.com', city: 'Jumla', availability: true, lastDonation: '2024-01-22' },
  { id: '37', name: 'Lila Adhikari', bloodGroup: 'O-', phone: '+977-9801000072', email: 'lila.adhikari@example.com', city: 'Mugu', availability: false, lastDonation: '2024-03-04' },
  { id: '38', name: 'Manish Koirala', bloodGroup: 'O-', phone: '+977-9801000073', email: 'manish.koirala@example.com', city: 'Dolpa', availability: true, lastDonation: '2024-02-12' },
  { id: '39', name: 'Nirmala Shrestha', bloodGroup: 'O-', phone: '+977-9801000074', email: 'nirmala.shrestha@example.com', city: 'Humla', availability: true, lastDonation: '2024-04-08' },
  { id: '40', name: 'Omisha Bhandari', bloodGroup: 'O-', phone: '+977-9801000075', email: 'omisha.bhandari@example.com', city: 'Bajura', availability: true, lastDonation: '2024-02-04' }
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
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const cities = ['Jumla', 'Mugu', 'Dolpa', 'Humla', 'Bajura'];