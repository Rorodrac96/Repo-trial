import React, { useState } from 'react';
import { EventDetails } from '../types/invitation';
import { Sparkles, Check, Info, Sparkle, Shirt } from 'lucide-react';

interface DressCodeSectionProps {
  details: EventDetails;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ details }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: 'Haldi Gold • हळदी पिवळा', hex: '#f59e0b', desc: 'Turmeric auspicious vibrancy' },
    { name: 'Kesariya • केशरी भगवा', hex: '#ea580c', desc: 'Royal Maratha saffron' },
    { name: 'Paithani Green • मोरपंखी', hex: '#047857', desc: 'Classic peacock silk zari' },
    { name: 'Kumkum Red • कुंकू लाल', hex: '#991b1b', desc: 'Sacred vermilion glow' },
    { name: 'Mogra Ivory • मोगरा शुभ्र', hex: '#fef3c7', desc: 'Fragrant jasmine silk' },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="attire" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-sans-montserrat text-xs tracking-[0.3em] uppercase text-amber-900 font-semibold">
            पारंपारिक पेहराव • Royal Attire
          </span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          पारंपारिक पेशवाई वेशभूषा
        </h2>
        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        <p className="font-devanagari text-base sm:text-lg text-amber-950">
          आपल्या उपस्थितीने विवाह सोहळ्यास शाही आणि पारंपारिक शोभा प्राप्त होईल!
        </p>
      </div>

      {/* Auspicious Palette Swatches in Light Sandalwood Card */}
      <div className="mb-12 rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 sm:p-8 shadow-md">
        <div className="text-center mb-6">
          <h3 className="font-devanagari text-lg text-red-950 font-bold">
            शुभ विवाह रंगसंगती • Royal Indian Festive Palette
          </h3>
          <p className="text-xs text-stone-600 mt-0.5 font-sans-montserrat">
            Tap any auspicious hue to copy hex color code for your festive attire shopping
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {colors.map((color, i) => (
            <button
              key={i}
              onClick={() => handleCopyHex(color.hex)}
              className="group flex flex-col items-center rounded-2xl p-3 transition duration-300 hover:bg-amber-50"
            >
              <div
                className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-stone-200 shadow-md transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                style={{ backgroundColor: color.hex }}
              >
                {copiedHex === color.hex && (
                  <span className="rounded-full bg-black/60 p-1.5 text-white backdrop-blur">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </div>
              <span className="mt-3 font-devanagari text-sm font-bold text-stone-900 text-center">
                {color.name}
              </span>
              <span className="font-sans-montserrat text-[10px] text-stone-500 tracking-wider">
                {color.hex}
              </span>
              <span className="text-[10px] text-amber-900/90 mt-0.5 text-center font-medium">
                {color.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Traditional Attire Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For Ladies */}
        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 border border-red-300 text-red-800">
              <Shirt className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-devanagari text-2xl font-bold text-red-950">सवाष्ण व भगिनींसाठी</h4>
              <p className="font-sans-montserrat text-[11px] tracking-wider uppercase text-amber-800 font-semibold">
                Paithani Sarees &amp; Nauvari Elegance
              </p>
            </div>
          </div>
          <p className="font-sans-montserrat text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
            पारंपारिक <strong>पैठणी साडी</strong> (Paithani), काठपदराची रेशमी साडी किंवा नऊवारी. सोबत कपाळी <strong>चंद्रकोर</strong> (Chandrakor Bindi), नाकात पारंपरिक <strong>नथ</strong> (Nath) आणि कोल्हापुरी साज!
          </p>
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
            <span>शुभ विधींसाठी काळ्या रंगाचा पेहराव टाळण्याची नम्र विनंती.</span>
          </div>
        </div>

        {/* For Gentlemen */}
        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 border border-amber-300 text-amber-800">
              <Shirt className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-devanagari text-2xl font-bold text-red-950">गृहस्थ व बांधवांसाठी</h4>
              <p className="font-sans-montserrat text-[11px] tracking-wider uppercase text-amber-800 font-semibold">
                Kurta-Dhoti, Sherwani &amp; Pheta
              </p>
            </div>
          </div>
          <p className="font-sans-montserrat text-xs sm:text-sm text-stone-700 leading-relaxed">
            पारंपारिक <strong>कुर्ता-पायजमा / रेशमी धोतर</strong>, अथवा रॉयल बंदगळा किंवा जोधपुरी शेरवानी. विवाह मुहूर्तासाठी शाही <strong>पुणेरी / पेशवाई फेटा</strong> (Puneri Pheta) व कोल्हापुरी चपला.
          </p>
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
            <span>फेटा बांधणीची व्यवस्था मुख्य विवाह मंडपात सर्व पाहुण्यांसाठी उपलब्ध आहे.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
