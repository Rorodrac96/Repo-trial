import React from 'react';
import { EventDetails } from '../types/invitation';
import { MapPin, Navigation } from 'lucide-react';

interface VenueSectionProps {
  details: EventDetails;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ details }) => {
  const cleanVenueName = details.venueName.replace(/\(.*?\)/g, '').trim();
  const cleanCityState = details.venueCityState.replace(/\(.*?\)/g, '').trim();
  const googleMapsUrl = details.mapUrl || 'https://maps.app.goo.gl/uDwC5woq1nAATGsa9';

  return (
    <section id="venue" className="relative pt-2 pb-4 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Royal Venue Card with Location Buttons */}
      <div className="relative rounded-3xl border-2 border-amber-600/30 bg-[#ffffff] p-6 sm:p-10 shadow-lg backdrop-blur">
        {/* Auspicious Location Crest */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 text-red-900 shadow">
          <MapPin className="h-7 w-7 text-red-800" />
        </div>

        <h3 className="font-rozha text-3xl sm:text-4xl text-red-950 font-normal mb-2">
          {cleanVenueName}
        </h3>

        <p className="font-devanagari text-base sm:text-lg text-amber-950 font-semibold mb-4">
          {details.venueAddress}, {cleanCityState}
        </p>

        <p className="font-devanagari text-sm sm:text-base text-stone-700 max-w-lg mx-auto mb-6 font-medium">
          विवाह सोहळ्यास सहकुटुंब उपस्थित राहून नवदाम्पत्यास शुभाशीर्वाद द्यावेत. स्थळावर सहज पोहोचण्यासाठी खालील बटणावर स्पर्श करा.
        </p>

        {/* Location Action Button (Only Google Maps) */}
        <div className="flex items-center justify-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-red-800 bg-gradient-to-r from-red-800 to-red-900 px-6 py-3 font-devanagari text-sm font-bold uppercase text-amber-100 shadow-md hover:from-red-700 hover:to-red-800 transition"
          >
            <Navigation className="h-4 w-4 text-amber-200" />
            <span>गुगल मॅप्सने मार्ग पहा</span>
          </a>
        </div>
      </div>
    </section>
  );
};
