import React from 'react';
import { EventDetails } from '../types/invitation';
import { Sparkles, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface VenueSectionProps {
  details: EventDetails;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ details }) => {
  const cleanVenueName = details.venueName.replace(/\(.*?\)/g, '').trim();
  const cleanCityState = details.venueCityState.replace(/\(.*?\)/g, '').trim();
  const directMapsUrl = details.mapUrl || 'https://maps.app.goo.gl/uDwC5woq1nAATGsa9';
  const googleMapsUrl = directMapsUrl;
  const appleMapsUrl = directMapsUrl;

  return (
    <section id="venue" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-devanagari text-xs tracking-wider uppercase text-amber-900 font-bold">
            विवाह स्थळ
          </span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          {cleanVenueName}
        </h2>
        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
      </div>

      {/* Royal Venue Card with Location Buttons */}
      <div className="relative rounded-3xl border-2 border-amber-600/30 bg-[#ffffff] p-8 sm:p-12 shadow-lg backdrop-blur">
        {/* Auspicious Location Crest */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 text-red-900 shadow">
          <MapPin className="h-8 w-8 text-red-800" />
        </div>

        <h3 className="font-rozha text-3xl sm:text-4xl text-red-950 font-normal mb-2">
          {cleanVenueName}
        </h3>

        <p className="font-devanagari text-base sm:text-lg text-amber-950 font-semibold mb-6">
          {details.venueAddress}, {cleanCityState}
        </p>

        <p className="font-devanagari text-sm sm:text-base text-stone-700 max-w-lg mx-auto mb-8 font-medium">
          विवाह सोहळ्यास सहकुटुंब उपस्थित राहून नवदाम्पत्यास शुभाशीर्वाद द्यावेत. स्थळावर सहज पोहोचण्यासाठी खालील बटणावर स्पर्श करा.
        </p>

        {/* Location Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-red-800 bg-gradient-to-r from-red-800 to-red-900 px-6 py-3 font-devanagari text-sm font-bold uppercase text-amber-100 shadow-md hover:from-red-700 hover:to-red-800 transition"
          >
            <Navigation className="h-4 w-4 text-amber-200" />
            <span>गुगल मॅप्सने मार्ग पहा</span>
          </a>
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-amber-600/40 bg-amber-50 px-6 py-3 font-devanagari text-sm font-bold uppercase text-amber-900 shadow-sm hover:bg-amber-100 transition"
          >
            <ExternalLink className="h-4 w-4 text-amber-800" />
            <span>अ‍ॅपल मॅप्सने मार्ग पहा</span>
          </a>
        </div>
      </div>
    </section>
  );
};
