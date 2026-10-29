import React, { useState } from 'react';
import { EventDetails } from '../types/invitation';
import { Sparkles, MapPin, Navigation, Car, Bed, Plane, ExternalLink } from 'lucide-react';

interface VenueSectionProps {
  details: EventDetails;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ details }) => {
  const [activeZone, setActiveZone] = useState<'mandap' | 'darbar' | 'bhojan' | 'welcome'>('mandap');

  const zones = {
    mandap: {
      title: 'मुख्य विवाह मंडप',
      badge: 'शुभ विवाह',
      desc: 'पारंपारिक फुलांच्या तोरणांनी सजलेला भव्य विवाह मंडप, पवित्र हवन कुंड, तुळशी वृंदावन आणि सनई-चौघड्यांचा मंच.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    },
    darbar: {
      title: 'सुवर्ण राजदरबार',
      badge: 'साखरपुडा व संगीत',
      desc: 'भव्य झुंबर, पेशवाई खांब आणि सुवर्ण नक्षीकामाने सुशोभित वातानुकूलित सभागृह, जिथे साखरपुडा व संगीताचे कार्यक्रम रंगतील.',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80',
    },
    bhojan: {
      title: 'अन्नपूर्णा दालन',
      badge: 'पारंपारिक पंगत',
      desc: 'केळीच्या पानांवरील पारंपरिक पंगतीची उत्तम बैठक व्यवस्था व सात्विक शाही भोजनाचा आस्वाद.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    },
    welcome: {
      title: 'शाही प्रवेशद्वार व पार्किंग',
      badge: 'स्वागत कक्ष',
      desc: 'तुतारी, सनई आणि गुलाबपाणी शिंपडून पाहुण्यांचे शाही स्वागत. विस्तीर्ण व्हॅले पार्किंग व्यवस्था.',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80',
    },
  };

  const cleanVenueName = details.venueName.replace(/\(.*?\)/g, '').trim();
  const cleanCityState = details.venueCityState.replace(/\(.*?\)/g, '').trim();
  const directMapsUrl = details.mapUrl || 'https://maps.app.goo.gl/uDwC5woq1nAATGsa9';
  const googleMapsUrl = directMapsUrl;
  const appleMapsUrl = directMapsUrl;

  return (
    <section id="venue" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
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
        <p className="font-devanagari text-base sm:text-lg text-amber-950 font-medium">
          {cleanVenueName} • {details.venueAddress}, {cleanCityState}
        </p>
      </div>

      {/* Main Palace Showcase in Light Card */}
      <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 sm:p-8 shadow-md">
        {/* Left Column: Interactive Zones */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-devanagari text-lg font-bold text-red-950 mb-2">
            राजवाडा दालने
          </h3>

          {(Object.keys(zones) as Array<keyof typeof zones>).map((key) => {
            const z = zones[key];
            const isSelected = activeZone === key;
            return (
              <button
                key={key}
                onClick={() => setActiveZone(key)}
                className={`w-full text-left rounded-2xl p-4 transition-all duration-300 border ${
                  isSelected
                    ? 'border-red-700 bg-amber-50 shadow-sm'
                    : 'border-stone-200 bg-stone-50/50 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-devanagari text-base sm:text-lg text-stone-900 font-bold">
                    {z.title}
                  </span>
                  <span className="font-devanagari text-xs rounded-full bg-red-100 px-3 py-0.5 border border-red-300 text-red-800 font-bold">
                    {z.badge}
                  </span>
                </div>
                <p className="font-devanagari text-xs text-stone-700 mt-1.5 line-clamp-2">
                  {z.desc}
                </p>
              </button>
            );
          })}

          {/* Navigation Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-red-800 bg-gradient-to-r from-red-800 to-red-900 px-5 py-2.5 font-devanagari text-xs font-bold uppercase text-amber-100 shadow-md hover:from-red-700 hover:to-red-800 transition"
            >
              <Navigation className="h-3.5 w-3.5 text-amber-200" />
              <span>गुगल मॅप्सने मार्ग पहा</span>
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-amber-600/40 bg-amber-50 px-5 py-2.5 font-devanagari text-xs font-bold uppercase text-amber-900 hover:bg-amber-100 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>अ‍ॅपल मॅप्सने मार्ग पहा</span>
            </a>
          </div>
        </div>

        {/* Right Column: Zone Image */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/30 shadow-lg h-72 sm:h-96">
            <img
              src={zones[activeZone].image}
              alt={zones[activeZone].title}
              className="h-full w-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-devanagari text-xs text-amber-300 rounded-full bg-black/60 px-3 py-1 border border-amber-400 font-bold">
                {zones[activeZone].badge}
              </span>
              <h4 className="font-devanagari text-xl sm:text-2xl font-bold mt-2 text-amber-100">
                {zones[activeZone].title}
              </h4>
              <p className="font-devanagari text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                {zones[activeZone].desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accommodations & Travel Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Bed className="h-5 w-5 text-red-800" />
            <h4 className="font-devanagari text-xl font-bold text-red-950">पाहुण्यांची निवास व्यवस्था</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
            परगावाहून येणाऱ्या सर्व आप्तेष्टांसाठी राजवाडा परिसरातील हेरिटेज सुईट्समध्ये उत्तम निवास व्यवस्था करण्यात आली आहे.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Car className="h-5 w-5 text-red-800" />
            <h4 className="font-devanagari text-xl font-bold text-red-950">वाहतूक व व्हॅले पार्किंग</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
            हॉटेल व रेल्वे स्थानकावरून विशेष वातानुकूलित बस सेवा उपलब्ध असेल. स्वतःच्या वाहनांसाठी प्रशस्त व्हॅले पार्किंग उपलब्ध आहे.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Plane className="h-5 w-5 text-red-800" />
            <h4 className="font-devanagari text-xl font-bold text-red-950">प्रवास व संपर्क</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
            पुणे, नाशिक व अहिल्यानगर रेल्वे स्थानक तसेच विमानतळावरून राज्य महामार्गाने नंदनवन लॉन्स (भाळवणी) येथे वाहनाने सहज पोहोचता येते.
          </p>
        </div>
      </div>
    </section>
  );
};
