import React, { useState } from 'react';
import { EventDetails } from '../types/invitation';
import { Sparkles, Heart, Copy, Check, QrCode, Trees, Gift } from 'lucide-react';

interface WishingWellSectionProps {
  details: EventDetails;
}

export const WishingWellSection: React.FC<WishingWellSectionProps> = ({ details }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="blessings" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-sans-montserrat text-xs tracking-[0.3em] uppercase text-amber-900 font-semibold">
            शुभाशीर्वाद व कृपाभिलाषी • Sacred Blessings
          </span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          आपली उपस्थिती हाच आमचा आहेर
        </h2>
        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        <p className="font-devanagari text-base sm:text-lg text-amber-950 max-w-xl mx-auto">
          &ldquo;आहेराची कोणतीही अपेक्षा नाही, वधू-वरांस आपले शुभाशीर्वाद व मंगल सदिच्छा हेच सर्वश्रेष्ठ आहेर आहेत.&rdquo;
        </p>
      </div>

      {/* Cards: Traditional Krupabhilashi & Optional Digital Shagun / Annadaan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Krupabhilashi & Family Note */}
        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 border border-red-300 text-red-800">
                <Heart className="h-5 w-5 fill-red-800/20 text-red-800" />
              </div>
              <div>
                <h3 className="font-devanagari text-2xl font-bold text-red-950">कृपाभिलाषी व स्नेहीजन</h3>
                <p className="font-sans-montserrat text-[11px] tracking-wider uppercase text-amber-800 font-semibold">
                  With Heartfelt Respect from Both Families
                </p>
              </div>
            </div>
            <p className="font-sans-montserrat text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
              समस्त पाटील व देशमुख परिवार, आप्तस्वकीय, स्नेहीजन व मित्रपरिवार यांच्या वतीने आपणास आग्रहाचे निमंत्रण. आपल्या पवित्र उपस्थितीने सोहळ्याचे सार्थक होईल.
            </p>
          </div>

          <div className="pt-4 border-t border-amber-100 text-xs font-devanagari text-stone-800 space-y-1">
            <p className="font-bold text-red-900">• निमंत्रक: समस्त पाटील व देशमुख परिवार</p>
            <p>• कार्यस्थळ: {details.venueName}, {details.venueCityState}</p>
          </div>
        </div>

        {/* Digital Shagun / Anna Daan Token (Indian Wedding Practice) */}
        <div className="rounded-3xl border border-amber-600/25 bg-[#ffffff] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 border border-amber-300 text-amber-800">
                <Gift className="h-5 w-5 text-amber-800" />
              </div>
              <div>
                <h3 className="font-devanagari text-2xl font-bold text-red-950">डिजिटल सदिच्छा व शगुन</h3>
                <p className="font-sans-montserrat text-[11px] tracking-wider uppercase text-amber-800 font-semibold">
                  Optional Blessing Token / UPI Shagun
                </p>
              </div>
            </div>
            <p className="font-sans-montserrat text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
              परगावाहून आशीर्वाद पाठवू इच्छिणाऱ्या आदरणीय आप्तेष्टांसाठी, आपण डिजिटल सदिच्छा (Shagun) किंवा वधू-वरांच्या नावे अन्नदान निधीस सहकार्य करू शकता.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-amber-100">
            <div className="flex items-center justify-between rounded-2xl bg-amber-50/70 p-3 border border-amber-200">
              <div>
                <span className="block text-[10px] font-sans-montserrat uppercase tracking-wider text-stone-500 font-semibold">
                  UPI / GPay / PhonePe ID
                </span>
                <span className="font-sans-montserrat text-xs text-red-950 font-bold">
                  shubhvivah.aadityasai@upi
                </span>
              </div>
              <button
                onClick={() => handleCopy('upi', 'shubhvivah.aadityasai@upi')}
                className="flex items-center gap-1 rounded-xl bg-red-800 px-3 py-1.5 text-xs text-amber-100 hover:bg-red-700 transition"
              >
                {copiedKey === 'upi' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === 'upi' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
