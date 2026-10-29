import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, ArrowDown, ChevronRight } from 'lucide-react';
import { EventDetails } from '../types/invitation';

interface HeroSectionProps {
  details: EventDetails;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ details }) => {
  // Target wedding date: November 25, 2026 11:35:00 AM (Auspicious Muhurat)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-25T11:35:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToRituals = () => {
    const el = document.getElementById('rituals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 text-center overflow-hidden bg-[#fdf9f0]">
      {/* Light Royal Palace Background Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-15 mix-blend-multiply filter blur-[0.5px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      {/* Warm Golden Ivory Sunlit Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/60 via-[#fdf8ed]/90 to-[#fbf5e6]" />

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
        {/* Auspicious Shloka & Lord Ganesha Emblem */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-600/40 bg-gradient-to-b from-[#fff6e0] to-[#fce3b8] p-3 shadow-lg">
            <span className="font-devanagari text-3xl font-bold text-red-800 drop-shadow">
              ॐ
            </span>
            <div className="absolute -inset-1.5 rounded-full border border-amber-500/30" />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/60" />
            <span className="font-devanagari text-base font-semibold tracking-wider text-red-900">
              {details.auspiciousShloka || '॥ श्री गणेशाय नमः ॥'}
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/60" />
          </div>
          <p className="font-devanagari text-sm font-bold text-amber-900 mt-1">
            शुभ विवाह सोहळा
          </p>
        </div>

        {/* Sacred Mangalashtak Quote */}
        <p className="font-devanagari text-base sm:text-lg text-amber-950 max-w-xl mx-auto font-medium">
          &ldquo;शुभमंगल सावधान! दोन मनांचे, दोन कुळांचे मंगल मीलन, सुवर्ण क्षणांचा साक्षीदार सोहळा.&rdquo;
        </p>

        {/* Couple Names - शुद्ध मराठी */}
        <div className="my-6 w-full max-w-3xl">
          <p className="font-devanagari text-base sm:text-lg text-amber-900 font-bold mb-1">
            चि. सौ. का.
          </p>
          <h1 className="font-rozha text-5xl sm:text-7xl md:text-8xl font-normal text-red-900 tracking-wide drop-shadow-sm">
            {details.brideName.replace(/चि\.\s*|सौ\.\s*|का\.\s*/g, '').trim()}
          </h1>
          {details.brideLineage && details.brideLineage.length > 0 ? (
            <div className="font-devanagari text-sm sm:text-base text-stone-800 font-medium mt-3 space-y-1 max-w-2xl mx-auto leading-relaxed">
              {details.brideLineage.map((line, idx) => (
                <p key={idx} className={idx === 2 ? 'text-amber-950 font-bold text-xs sm:text-sm pt-0.5' : ''}>
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="font-devanagari text-sm sm:text-base text-stone-700 font-semibold mt-1">
              {details.brideFamily}
            </p>
          )}

          <div className="my-6 flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
            <span className="font-devanagari text-3xl sm:text-4xl text-amber-700 font-bold leading-none">
              व
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
          </div>

          <p className="font-devanagari text-base sm:text-lg text-amber-900 font-bold mb-1">
            चि.
          </p>
          <h1 className="font-rozha text-5xl sm:text-7xl md:text-8xl font-normal text-red-900 tracking-wide drop-shadow-sm">
            {details.groomName.replace(/चि\.\s*/g, '').trim()}
          </h1>
          {details.groomLineage && details.groomLineage.length > 0 ? (
            <div className="font-devanagari text-sm sm:text-base text-stone-800 font-medium mt-3 space-y-1 max-w-2xl mx-auto leading-relaxed">
              {details.groomLineage.map((line, idx) => (
                <p key={idx} className={idx === 2 ? 'text-amber-950 font-bold text-xs sm:text-sm pt-0.5' : ''}>
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="font-devanagari text-sm sm:text-base text-stone-700 font-semibold mt-1">
              {details.groomFamily}
            </p>
          )}
        </div>

        {/* Date, Shubh Muhurat Time & Venue (शुद्ध मराठी) */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-sm sm:text-base font-devanagari text-stone-800 font-bold">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-red-800" />
            <span>{details.eventDate.replace(/\(.*?\)/g, '').trim()}</span>
          </div>
          <span className="hidden sm:inline text-amber-600">•</span>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-red-800" />
            <span>शुभ मुहूर्त: {details.muhuratTime.replace(/\(.*?\)/g, '').trim()}</span>
          </div>
          <span className="hidden sm:inline text-amber-600">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-800" />
            <span>{details.venueName.replace(/\(.*?\)/g, '').trim()}, {details.venueAddress}, {details.venueCityState.replace(/\(.*?\)/g, '').trim()}</span>
          </div>
        </div>

        {/* Muhurat Countdown Timer in Pure Marathi */}
        <div className="mb-12 w-full max-w-xl">
          <div className="mb-3 text-center">
            <span className="font-devanagari text-sm text-amber-950 font-bold">
              शुभ मुहूर्त घटिका गणना
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'दिवस', value: timeLeft.days },
              { label: 'तास', value: timeLeft.hours },
              { label: 'मिनिटे', value: timeLeft.minutes },
              { label: 'सेकंद', value: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-2xl border border-amber-600/30 bg-[#fffefc] p-3 sm:p-4 shadow-md"
              >
                <span className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-bold text-red-900">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-1 font-devanagari text-xs sm:text-sm font-bold text-stone-700">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Explore Rituals (शुद्ध मराठी) */}
        <div className="flex items-center justify-center">
          <button
            onClick={scrollToRituals}
            className="flex items-center gap-2 rounded-full border-2 border-amber-600/50 bg-white/90 px-8 py-3.5 font-devanagari text-base font-bold text-red-950 shadow-md backdrop-blur transition hover:bg-amber-100 hover:border-amber-600 active:scale-95"
          >
            <span>विधी व कार्यक्रम</span>
            <ChevronRight className="h-4 w-4 text-amber-800" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-1 opacity-70 animate-bounce cursor-pointer" onClick={scrollToRituals}>
          <span className="font-sans-montserrat text-[10px] font-semibold tracking-widest uppercase text-stone-600">
            पुढील विधी पाहण्यासाठी खाली स्क्रोल करा
          </span>
          <ArrowDown className="h-4 w-4 text-amber-800" />
        </div>
      </div>
    </section>
  );
};
