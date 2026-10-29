import React from 'react';
import { Sparkles } from 'lucide-react';
import { EventDetails } from '../types/invitation';

interface NavbarProps {
  details: EventDetails;
  petalsActive: boolean;
  onTogglePetals: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  details,
  petalsActive,
  onTogglePetals,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-amber-600/20 bg-[#fffdf9]/95 backdrop-blur-md transition-all shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Monogram Crest */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2.5 text-left transition"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber-600/40 bg-gradient-to-br from-red-800 to-red-900 shadow">
            <span className="font-devanagari text-xs font-bold text-amber-200">
              {details.monogram || 'शुभ'}
            </span>
          </div>
          <div>
            <div className="font-devanagari text-base leading-tight font-bold text-red-950 group-hover:text-red-800">
              {details.brideName.replace(/चि\.\s*|सौ\.\s*|का\.\s*/g, '').trim()} व {details.groomName.replace(/चि\.\s*/g, '').trim()}
            </div>
            <div className="font-devanagari text-[10px] tracking-wider text-amber-800 font-bold">
              शुभ विवाह सोहळा
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links (शुद्ध मराठी) */}
        <div className="hidden md:flex items-center gap-7 font-devanagari text-sm tracking-wide font-bold text-stone-800">
          <button onClick={() => scrollTo('rituals')} className="hover:text-red-900 transition">
            विधी व मुहूर्त
          </button>
          <button onClick={() => scrollTo('story')} className="hover:text-red-900 transition">
            कथा
          </button>
          <button onClick={() => scrollTo('venue')} className="hover:text-red-900 transition">
            विवाहस्थळ
          </button>
          <button onClick={() => scrollTo('gallery')} className="hover:text-red-900 transition">
            क्षणचित्रे
          </button>
        </div>

        {/* Petals Animation Control (Icon only button) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePetals}
            aria-label={petalsActive ? 'फुलांचा वर्षाव' : 'फुलांचा वर्षाव बंद'}
            title={petalsActive ? 'फुलांचा वर्षाव' : 'फुलांचा वर्षाव बंद'}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all shadow-sm ${
              petalsActive
                ? 'border-amber-500 bg-amber-100 text-amber-900 hover:bg-amber-200'
                : 'border-stone-300 bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};
