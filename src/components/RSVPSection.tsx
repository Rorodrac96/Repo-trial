import React from 'react';
import { EventDetails } from '../types/invitation';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface RSVPSectionProps {
  details: EventDetails;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ details }) => {
  return (
    <section id="invitation" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Light Sandalwood / Paithani Border Callout Card */}
      <div className="relative rounded-3xl border-2 border-amber-600/35 bg-[#ffffff] p-8 sm:p-14 shadow-lg backdrop-blur">
        {/* Top Auspicious Crest */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 text-red-900 shadow">
          <span className="font-devanagari text-2xl font-bold">
            ॐ
          </span>
        </div>

        <span className="font-devanagari text-xs tracking-wider uppercase text-amber-900 font-bold">
          सस्नेह आमंत्रण
        </span>

        <h2 className="font-rozha text-4xl sm:text-6xl font-normal text-red-950 my-3">
          आपली उपस्थिती प्रार्थनीय आहे
        </h2>

        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

        <p className="font-devanagari text-lg sm:text-xl text-amber-950 max-w-lg mx-auto leading-relaxed">
          वधू-वरांना शुभाशीर्वाद देण्यासाठी आपण सहकुटुंब, सहपरिवार उपस्थित राहून सोहळ्याची शोभा वाढवावी ही नम्र विनंती.
        </p>

        {/* Traditional Royal Details Block without Red Button */}
        <div className="mt-8 mx-auto max-w-md rounded-2xl border border-amber-500/30 bg-amber-50/60 p-6 text-center space-y-2.5">
          <p className="font-devanagari text-base font-bold text-red-950">
            {details.brideName} संग {details.groomName}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-stone-800 font-devanagari font-bold pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-red-800" />
              <span>{details.eventDate}</span>
            </div>
            <span className="hidden sm:inline text-amber-600">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-red-800" />
              <span>शुभ मुहूर्त: {details.muhuratTime}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-amber-950 font-devanagari font-bold pt-1">
            <MapPin className="h-3.5 w-3.5 text-red-800" />
            <span>{details.venueName}, {details.venueAddress}, {details.venueCityState}</span>
          </div>

          <div className="pt-2">
            <a
              href={details.mapUrl || 'https://maps.app.goo.gl/uDwC5woq1nAATGsa9'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-100/70 px-4 py-1.5 font-devanagari text-xs font-bold text-red-950 hover:bg-amber-200 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-red-800" />
              <span>गुगल मॅप्सवर स्थान पहा (नंदनवन लॉन्स)</span>
            </a>
          </div>

          <p className="text-xs font-devanagari text-stone-700 pt-3 border-t border-amber-200 font-semibold">
            निमंत्रक: समस्त निर्मळ व चतुर परिवार आणि आप्तस्वकीय
          </p>
        </div>
      </div>
    </section>
  );
};
