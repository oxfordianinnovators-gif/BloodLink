export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  email: string;
  city: string;
  availability: boolean;
  lastDonation?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  hospital: string;
  city: string;
  contactPhone: string;
  unitsNeeded: number;
  requestDate: string;
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  bloodGroups: string[];
  hours: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'donor' | 'seeker';
}