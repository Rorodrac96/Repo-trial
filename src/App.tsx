import React, { useState } from 'react';
import { EventDetails } from './types/invitation';
import { PetalCanvas } from './components/PetalCanvas';
import { EnvelopeEntrance } from './components/EnvelopeEntrance';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ItinerarySection } from './components/ItinerarySection';
import { StorySection } from './components/StorySection';
import { VenueSection } from './components/VenueSection';
import { GallerySection } from './components/GallerySection';
import { RSVPSection } from './components/RSVPSection';
import { FooterSection } from './components/FooterSection';

const DEFAULT_INDIAN_DETAILS: EventDetails = {
  auspiciousShloka: '॥ श्री गणेशाय नमः ॥',
  brideName: 'चि. सौ. का. अंकिता',
  brideFamily: 'श्री. सखाहरी रामजी निर्मळ यांची नात व सौ. उषा व श्री. भाऊसाहेब सखाहरी निर्मळ यांची धाकटी कन्या (रा. पिंपरी निर्मळ, ता. राहता, जि. अ.नगर)',
  brideLineage: [
    'श्री. सखाहरी रामजी निर्मळ यांचे नातू',
    'व सौ. उषा व श्री. भाऊसाहेब सखाहरी निर्मळ यांची धाकटी कन्या',
    'रा. पिंपरी निर्मळ, ता. राहता, जि. अ.नगर',
  ],
  groomName: 'चि. जसराज',
  groomFamily: 'सौ. सुमन व श्री. लक्ष्मण शंकर चतुर यांचे नातू व सौ. विजया व श्री. तुषार लक्ष्मण चतुर यांचे ज्येष्ठ सुपुत्र (रा. जुन्नर, ता. जुन्नर, जि. पुणे)',
  groomLineage: [
    'सौ. सुमन व श्री. लक्ष्मण शंकर चतुर यांचे नातू',
    'व सौ. विजया व श्री. तुषार लक्ष्मण चतुर यांचे ज्येष्ठ सुपुत्र',
    'रा. जुन्नर, ता. जुन्नर, जि. पुणे',
  ],
  monogram: 'शुभ',
  eventDate: 'बुधवार, २५ नोव्हेंबर २०२६',
  muhuratTime: 'दुपारी ११:३५ वा.',
  venueName: 'नंदनवन लॉन्स',
  venueAddress: 'भाळवणी',
  venueCityState: 'अहिल्यानगर, महाराष्ट्र',
  mapUrl: 'https://maps.app.goo.gl/uDwC5woq1nAATGsa9',
  blessingQuote: 'दोन मनांचे, दोन कुळांचे मंगल मीलन, सुवर्ण क्षणांचा साक्षीदार सोहळा.',
  themeStyle: 'royal-maratha',
  dressCodeTitle: 'पारंपारिक पैठणी व पेशवाई पेहराव',
  dressCodeDescription: 'पारंपारिक पैठणी व पेशवाई पोशाख',
  colors: [],
  blessingNote: 'आपली उपस्थिती व शुभाशीर्वाद हाच आमचा खरा आहेर!',
};

export default function App() {
  const [details] = useState<EventDetails>(DEFAULT_INDIAN_DETAILS);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(true);

  // Custom guest name from URL ?guest=... or default
  const [customGuestName] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('guest');
      if (guest) return guest;
    }
    return 'आदरणीय आप्तेष्ट व परिवार';
  });

  // Handle envelope opened: smooth silent unroll
  const handleEnvelopeOpen = () => {
    setEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] text-stone-900 font-sans-montserrat selection:bg-amber-300 selection:text-red-950 relative">
      {/* Auspicious Marigold (झेंडू) and Mogra Petals Canvas */}
      <PetalCanvas active={petalsActive} />

      {/* Royal Patrika Wax Seal / Rajmudra Envelope Entrance */}
      {!envelopeOpen && (
        <EnvelopeEntrance
          details={details}
          guestName={customGuestName}
          onOpen={handleEnvelopeOpen}
        />
      )}

      {/* Main Royal Indian Maharashtrian Palace Invitation (Visible once envelope opens) */}
      <div className={`transition-opacity duration-1000 ${envelopeOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Navigation Bar (No music, no settings, no RSVP) */}
        <Navbar
          details={details}
          petalsActive={petalsActive}
          onTogglePetals={() => setPetalsActive(!petalsActive)}
        />

        {/* Hero Section (Auspicious Shloka, Couple Names, Date, Muhurat, Countdown, View Ceremonies button) */}
        <HeroSection details={details} />

        {/* Auspicious Ceremonies & Shubh Muhurat Timeline */}
        <ItinerarySection />

        {/* Our Journey / रेशीमगाठ */}
        <StorySection />

        {/* Palace Grounds & Venue Logistics */}
        <VenueSection details={details} />

        {/* Royal Gallery & Lightbox */}
        <GallerySection />

        {/* Royal Invitation Section (No red button) */}
        <RSVPSection details={details} />

        {/* Footer (No settings, no copyright line) */}
        <FooterSection
          details={details}
          onReopenEnvelope={() => setEnvelopeOpen(false)}
        />
      </div>
    </div>
  );
}
