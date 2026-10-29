export interface EventDetails {
  auspiciousShloka: string;
  brideName: string;
  brideFamily: string;
  brideLineage?: string[];
  groomName: string;
  groomFamily: string;
  groomLineage?: string[];
  monogram: string;
  eventDate: string;
  muhuratTime: string;
  venueName: string;
  venueAddress: string;
  venueCityState: string;
  mapUrl?: string;
  blessingQuote: string;
  themeStyle: 'royal-maratha' | 'paithani-gold' | 'haldi-kesariya';
  dressCodeTitle: string;
  dressCodeDescription: string;
  colors: { name: string; hex: string; desc: string }[];
  blessingNote: string;
  coordinatorWhatsApp?: string;
}

export interface RSVPRecord {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  partySize: number;
  guestNames?: string[];
  dietaryPreference: 'Traditional Maharashtrian Pangat' | 'Jain Sattvik' | 'Allergies/Special';
  songRequest: string;
  blessingMessage: string;
  submittedAt: string;
}

export interface ScheduleItem {
  id: string;
  marathiTitle: string;
  time: string;
  location: string;
  description: string;
  icon: 'haldi' | 'sangeet' | 'vivah' | 'reception' | 'puja';
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  quote: string;
}

