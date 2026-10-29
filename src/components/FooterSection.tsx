import React from 'react';
import { EventDetails } from '../types/invitation';
import { ArrowUp, Mail } from 'lucide-react';

interface FooterSectionProps {
  details: EventDetails;
  onReopenEnvelope: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  details,
  onReopenEnvelope,
}) => {
  return (
    <footer className="relative border-t border-amber-600/20 bg-[#f9f4e8] py-16 px-4 text-center">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        {/* Monogram Crest */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 shadow-md">
          <span className="font-devanagari text-xl font-bold text-red-900">
            {details.monogram || 'शुभ'}
          </span>
        </div>

        <h3 className="font-rozha text-3xl sm:text-4xl font-normal text-red-950">
          {details.brideName} संग {details.groomName}
        </h3>

        <p className="font-devanagari text-xs tracking-[0.25em] uppercase text-amber-900 font-bold mt-1">
          शुभ विवाह सोहळा
        </p>

        <div className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />

        <p className="font-devanagari text-base text-stone-700 max-w-md mx-auto mb-8 font-medium">
          ॥ शतायुषी भव । अखंड सौभाग्यवती भव ॥<br />
          आपल्या उपस्थितीने आणि आशीर्वादाने आमच्या आनंदात सहभागी व्हावे ही नम्र प्रार्थना!
        </p>

        {/* Footer actions without settings and without copyright line */}
        <div className="flex items-center justify-center gap-5 text-xs font-devanagari text-stone-700 font-bold">
          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1.5 hover:text-red-900 transition"
          >
            <Mail className="h-3.5 w-3.5 text-amber-700" />
            <span>लग्नपत्रिका पुन्हा पहा</span>
          </button>

          <span>•</span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 hover:text-red-900 transition"
          >
            <ArrowUp className="h-3.5 w-3.5 text-amber-700" />
            <span>वर जा</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
