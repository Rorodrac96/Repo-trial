import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { EventDetails } from '../types/invitation';

interface EnvelopeEntranceProps {
  details: EventDetails;
  guestName: string;
  onOpen: () => void;
}

export const EnvelopeEntrance: React.FC<EnvelopeEntranceProps> = ({
  details,
  guestName,
  onOpen,
}) => {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleBreakSeal = () => {
    if (opening || opened) return;
    setOpening(true);
    setTimeout(() => {
      setOpened(true);
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 900);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#fdf9f0] px-4 transition-opacity duration-1000 ${opened ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Background Royal Silk / Saffron Ivory glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fff7e6] via-[#fcf5e5] to-[#f5ebcf] opacity-95" />

      {/* Traditional Marigold & Saffron ambient orbs */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-80 w-80 rounded-full bg-red-500/15 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
        {/* Auspicious Shloka & Lord Ganesha Symbol */}
        <div className="mb-5 flex flex-col items-center text-center">
          {/* Ganesha Crest */}
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-600/40 bg-gradient-to-b from-[#fff2d6] to-[#fce4b3] p-2 shadow-md">
            <span className="font-devanagari text-2xl font-bold text-red-800 drop-shadow-sm">
              ॐ
            </span>
          </div>
          <p className="font-devanagari text-base font-semibold tracking-wider text-red-900">
            {details.auspiciousShloka || '॥ श्री गणेशाय नमः ॥'}
          </p>
          <p className="font-devanagari text-sm tracking-wider text-amber-900 font-bold mt-0.5">
            शुभ विवाह सोहळा
          </p>
        </div>

        {/* Royal Patrika / Invitation Envelope */}
        <div
          onClick={handleBreakSeal}
          className={`group relative w-full cursor-pointer rounded-2xl border-2 border-amber-500/40 bg-[#fffdf9] p-7 shadow-2xl transition-all duration-700 hover:border-amber-600 hover:shadow-amber-500/20 ${
            opening ? 'scale-105' : 'hover:scale-[1.02]'
          }`}
          style={{
            boxShadow: '0 20px 40px -10px rgba(184, 134, 11, 0.25), 0 0 0 1px rgba(217, 119, 6, 0.15)',
          }}
        >
          {/* Paithani Gold Zari Border Frame */}
          <div className="rounded-xl border-2 border-dashed border-amber-600/30 p-6 text-center bg-gradient-to-b from-[#fffefc] via-[#fffaf0] to-[#fff5e3]">
            {/* Auspicious Mangalashtak line */}
            <p className="font-devanagari text-xs tracking-wider text-amber-900/90 font-medium">
              ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>

            <div className="my-5">
              <span className="text-xs font-devanagari text-red-900 font-bold">
                शुभ विवाह आमंत्रण
              </span>
              <h2 className="font-rozha text-3xl sm:text-4xl text-red-900 mt-2 font-normal">
                {details.brideName}
              </h2>
              <div className="my-1.5 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-amber-600/40" />
                <span className="font-devanagari text-xl text-amber-700 font-bold">व</span>
                <div className="h-px w-8 bg-amber-600/40" />
              </div>
              <h2 className="font-rozha text-3xl sm:text-4xl text-red-900 font-normal">
                {details.groomName}
              </h2>
            </div>

            <div className="my-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

            {/* Recipient Guest Label */}
            <div className="space-y-1">
              <p className="font-devanagari text-xs font-bold text-amber-800">
                सस्नेह निमंत्रण
              </p>
              <p className="font-devanagari text-lg sm:text-xl font-bold text-stone-900">
                {guestName || 'आदरणीय आप्तेष्ट व परिवार'}
              </p>
            </div>

            <p className="mt-4 font-devanagari text-xs tracking-wider text-stone-800 font-bold">
              {details.eventDate} • {details.venueName}, {details.venueAddress}
            </p>
          </div>

          {/* Royal Seal / Rajmudra Monogram Button */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#b91c1c] via-[#dc2626] to-[#991b1b] p-1 shadow-2xl ring-4 ring-[#fdf9f0] transition-transform duration-500 ${
                opening ? 'scale-125 rotate-12' : 'group-hover:scale-110'
              }`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-[#991b1b] to-[#7f1d1d] shadow-inner text-center">
                <span className="font-devanagari text-base font-bold text-amber-200 drop-shadow">
                  {details.monogram || 'शुभ'}
                </span>
              </div>

              {/* Gentle saffron pulse ring */}
              <span className="absolute -inset-1 animate-ping rounded-full bg-amber-500/25 duration-1000" />
            </div>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-12 flex items-center gap-2 text-center text-xs tracking-widest font-bold text-amber-900 animate-pulse font-devanagari">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span>राजमुद्रा स्पर्श करा • लग्नपत्रिका उघडा</span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>

        <p className="mt-2 text-xs text-stone-700 font-devanagari font-semibold">
          शुभ विवाह आमंत्रण
        </p>
      </div>
    </div>
  );
};
