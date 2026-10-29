import React, { useState } from 'react';
import { EventDetails, RSVPRecord } from '../types/invitation';
import {
  X,
  Heart,
  CheckCircle,
  Sparkles,
  Music,
  Utensils,
  User,
  Mail,
  Phone,
  MessageSquare,
  QrCode,
  AlertCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RSVPModalProps {
  details: EventDetails;
  isOpen: boolean;
  onClose: () => void;
  onRSVPSubmit: (record: RSVPRecord) => void;
  existingRSVP?: RSVPRecord | null;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  details,
  isOpen,
  onClose,
  onRSVPSubmit,
  existingRSVP,
}) => {
  const [step, setStep] = useState<number>(existingRSVP ? 5 : 1);

  // Form State
  const [guestName, setGuestName] = useState(existingRSVP?.guestName || '');
  const [email, setEmail] = useState(existingRSVP?.email || '');
  const [phone, setPhone] = useState(existingRSVP?.phone || '');
  const [attending, setAttending] = useState<'yes' | 'no'>(existingRSVP?.attending || 'yes');
  const [partySize, setPartySize] = useState<number>(existingRSVP?.partySize || 2);
  const [plusOneNames, setPlusOneNames] = useState<string[]>(
    existingRSVP?.guestNames || ['']
  );
  const [dietaryPreference, setDietaryPreference] = useState<'Traditional Maharashtrian Pangat' | 'Jain Sattvik' | 'Allergies/Special'>(
    existingRSVP?.dietaryPreference || 'Traditional Maharashtrian Pangat'
  );
  const [songRequest, setSongRequest] = useState(existingRSVP?.songRequest || '');
  const [blessingMessage, setBlessingMessage] = useState(existingRSVP?.blessingMessage || '');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePartySizeChange = (newSize: number) => {
    setPartySize(newSize);
    const updatedNames = [...plusOneNames];
    while (updatedNames.length < newSize - 1) {
      updatedNames.push('');
    }
    setPlusOneNames(updatedNames.slice(0, newSize - 1));
  };

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!guestName.trim()) {
        setErrorMsg('कृपया आपले पूर्ण नाव प्रविष्ट करा (Please enter your name).');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('कृपया योग्य ईमेल पत्ता द्या (Please enter a valid email).');
        return;
      }
      if (attending === 'no') {
        setStep(4); // Skip to blessings
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const record: RSVPRecord = {
      id: existingRSVP?.id || `rsvp_${Date.now()}`,
      guestName,
      email,
      phone,
      attending,
      partySize: attending === 'yes' ? partySize : 0,
      guestNames: attending === 'yes' ? plusOneNames : [],
      dietaryPreference: attending === 'yes' ? dietaryPreference : 'Traditional Maharashtrian Pangat',
      songRequest,
      blessingMessage,
      submittedAt: new Date().toISOString(),
    };

    onRSVPSubmit(record);

    // Celebratory Marigold and saffron confetti
    if (attending === 'yes') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#f59e0b', '#991b1b', '#fef08a'],
      });
    }

    setStep(5);
  };

  const handleSendWhatsAppConfirmation = () => {
    const messageLines = [
      '॥ श्री गणेशाय नमः ॥',
      `*शुभ विवाह उपस्थिती नोंदणी*`,
      `वधू: ${details.brideName} • वर: ${details.groomName}`,
      '',
      `• पाहुण्याचे नाव: ${guestName}`,
      `• उपस्थिती: ${attending === 'yes' ? 'होय, आम्ही नक्की उपस्थित राहणार!' : 'उपस्थित राहणे शक्य नाही, मनःपूर्वक सदिच्छा.'}`,
      attending === 'yes' ? `• एकूण सदस्य: ${partySize} व्यक्ती` : '',
      attending === 'yes' && plusOneNames.filter(Boolean).length > 0 ? `• सोबत: ${plusOneNames.filter(Boolean).join(', ')}` : '',
      attending === 'yes' ? `• पंगत भोजन: ${dietaryPreference}` : '',
      attending === 'yes' && songRequest ? `• संगीतासाठी फर्माईश: ${songRequest}` : '',
      blessingMessage ? `• सदिच्छा संदेश: "${blessingMessage}"` : '',
      '',
      `स्थळ: ${details.venueName}, ${details.venueCityState}`,
      `मुहूर्त: ${details.eventDate} (${details.muhuratTime})`,
    ].filter(Boolean);

    const text = messageLines.join('\n');
    const phoneNum = (details.coordinatorWhatsApp || '').replace(/[^0-9]/g, '');
    const url = phoneNum
      ? `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border-2 border-amber-600/40 bg-[#fffdfa] p-6 sm:p-8 shadow-2xl text-stone-900 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500 bg-amber-50 text-red-900">
            <span className="font-devanagari text-xl font-bold">ॐ</span>
          </div>
          <span className="font-sans-montserrat text-[10px] tracking-[0.25em] uppercase text-amber-900 font-bold">
            शुभ विवाह उपस्थिती नोंदणी
          </span>
          <h2 className="font-rozha text-3xl font-normal text-red-950 mt-1">
            {step === 5 ? 'आपला शाही आमंत्रण पास' : 'उपस्थिती नोंदवा • RSVP'}
          </h2>
          <p className="font-sans-montserrat text-xs text-stone-600 mt-0.5">
            कृपया १५ नोव्हेंबर २०२६ पर्यंत आपली नोंदणी पूर्ण करावी
          </p>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="mb-6 flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-red-800'
                    : s < step
                    ? 'w-4 bg-amber-500'
                    : 'w-4 bg-stone-200'
                }`}
              />
            ))}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-300 p-3 text-xs text-red-900">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-700" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Basic Info & Attendance */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1.5">
                आपले पूर्ण नाव (Full Name) *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="उदा. श्री. राजेश व सौ. अनिता कुलकर्णी"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1.5">
                  ईमेल पत्ता (Email) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kulkarni@example.com"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-red-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1.5">
                  मोबाईल / व्हॉट्सॲप (Mobile)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98220 XXXXX"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-red-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Attendance Choice */}
            <div className="pt-2">
              <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-2">
                विवाह सोहळ्यास उपस्थिती (Attendance Confirmation) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                    attending === 'yes'
                      ? 'border-red-700 bg-amber-50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className={`flex h-5 w-5 rounded-full items-center justify-center border ${attending === 'yes' ? 'border-red-700 bg-red-700 text-white' : 'border-stone-400'}`}>
                    {attending === 'yes' && <CheckCircle className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <span className="block font-devanagari text-base font-bold text-red-950">
                      नक्की उपस्थित राहणार
                    </span>
                    <span className="text-[11px] text-stone-600 font-medium">
                      Attending with family
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                    attending === 'no'
                      ? 'border-red-700 bg-red-50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className={`flex h-5 w-5 rounded-full items-center justify-center border ${attending === 'no' ? 'border-red-700 bg-red-700 text-white' : 'border-stone-400'}`}>
                    {attending === 'no' && <CheckCircle className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <span className="block font-devanagari text-base font-bold text-stone-900">
                      उपस्थित राहणे शक्य नाही
                    </span>
                    <span className="text-[11px] text-stone-600 font-medium">
                      Unable to attend
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full border border-amber-600 bg-gradient-to-r from-red-800 to-red-900 px-6 py-2.5 font-sans-montserrat text-xs tracking-wider uppercase text-amber-100 font-semibold hover:from-red-700 hover:to-red-800 transition"
              >
                <span>{attending === 'no' ? 'सदिच्छा संदेश द्या • Next' : 'पुढील: कुटुंब सदस्य • Next'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Party Size & Companion Names */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-2">
                उपस्थित राहणाऱ्या सदस्यांची संख्या (Number of Family Members):
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handlePartySizeChange(size)}
                    className={`flex-1 rounded-xl py-3 text-center border font-marcellus text-lg font-bold transition ${
                      partySize === size
                        ? 'border-red-700 bg-amber-100 text-red-950 shadow-sm'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {size} {size === 1 ? 'व्यक्ती' : 'सदस्य'}
                  </button>
                ))}
              </div>
            </div>

            {partySize > 1 && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold">
                  सोबत येणाऱ्या कुटुंबियांची नावे (Accompanying Family Names):
                </label>
                {plusOneNames.map((name, idx) => (
                  <div key={idx} className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        const updated = [...plusOneNames];
                        updated[idx] = e.target.value;
                        setPlusOneNames(updated);
                      }}
                      placeholder={`सदस्य ${idx + 2} चे पूर्ण नाव`}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-red-700 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 rounded-full border border-stone-300 px-5 py-2.5 text-xs text-stone-700 hover:bg-stone-100"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>मागे • Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full border border-amber-600 bg-gradient-to-r from-red-800 to-red-900 px-6 py-2.5 font-sans-montserrat text-xs tracking-wider uppercase text-amber-100 font-semibold hover:from-red-700 hover:to-red-800 transition"
              >
                <span>पुढील: भोजन व्यवस्था • Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Maharashtrian Pangat Dining Preference */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-red-950 font-bold">
              <Utensils className="h-4 w-4 text-red-800" />
              <span className="font-devanagari text-base">
                पारंपारिक पंगत व भोजन पसंती (Dining Preference)
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'Traditional Maharashtrian Pangat' as const,
                  title: 'पारंपारिक मराठमोळी पंगत (Traditional Maharashtrian)',
                  desc: 'पुरणपोळी, साजूक तूप, श्रीखंड-पुरी, कांदा-भजी, मसाले भात, आमटी व सोलकढी.',
                },
                {
                  id: 'Jain Sattvik' as const,
                  title: 'जैन सात्विक पंगत (Jain Sattvik Meal)',
                  desc: 'कांदा, लसूण व कंदमुळे विरहित १००% शुद्ध सात्विक शाकाहारी भोजन.',
                },
                {
                  id: 'Allergies/Special' as const,
                  title: 'ज्येष्ठ नागरिक / पथ्य भोजन (Mild / Diabetic Friendly)',
                  desc: 'कमी तेल-मसाल्यांचे, मधुमेही व ज्येष्ठ नागरिकांसाठी हलके जेवण.',
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  onClick={() => setDietaryPreference(opt.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                    dietaryPreference === opt.id
                      ? 'border-red-700 bg-amber-50/90 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="dietary"
                    checked={dietaryPreference === opt.id}
                    onChange={() => setDietaryPreference(opt.id)}
                    className="mt-1 text-red-800 focus:ring-0"
                  />
                  <div>
                    <span className="font-devanagari text-base text-stone-900 font-bold block">
                      {opt.title}
                    </span>
                    <span className="text-xs text-stone-600 font-sans-montserrat block mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1 rounded-full border border-stone-300 px-5 py-2.5 text-xs text-stone-700 hover:bg-stone-100"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>मागे • Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full border border-amber-600 bg-gradient-to-r from-red-800 to-red-900 px-6 py-2.5 font-sans-montserrat text-xs tracking-wider uppercase text-amber-100 font-semibold hover:from-red-700 hover:to-red-800 transition"
              >
                <span>पुढील: सदिच्छा संदेश • Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Sangeet Song Request & Blessing Note */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {attending === 'yes' && (
              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1.5 flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-red-800" />
                  <span>संगीतासाठी गाण्याची फर्माईश (Song Request for Sangeet)</span>
                </label>
                <input
                  type="text"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder="उदा. झिंगाट / नवरी नटली / कोई मिल गया"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2.5 px-4 text-xs text-stone-900 placeholder:text-stone-400 focus:border-red-700 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-red-800" />
                <span>वधू-वरांसाठी शुभाशीर्वाद व सदिच्छा संदेश (Blessings for Couple)</span>
              </label>
              <textarea
                rows={3}
                value={blessingMessage}
                onChange={(e) => setBlessingMessage(e.target.value)}
                placeholder="आपल्या शुभ सदिच्छा व मंगल आशीर्वाद येथे लिहा..."
                className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2.5 px-4 text-xs text-stone-900 placeholder:text-stone-400 focus:border-red-700 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(attending === 'no' ? 1 : 3)}
                className="flex items-center gap-1 rounded-full border border-stone-300 px-5 py-2.5 text-xs text-stone-700 hover:bg-stone-100"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>मागे • Back</span>
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full border-2 border-amber-500 bg-gradient-to-r from-red-800 via-red-900 to-[#7f1d1d] px-8 py-3 font-sans-montserrat text-xs tracking-wider uppercase text-amber-100 font-bold shadow-xl hover:from-red-700 hover:to-red-800 transition hover:scale-105"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>उपस्थिती निश्चित करा • Confirm RSVP</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Auspicious Royal Guest Pass with WhatsApp Confirmation */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="rounded-3xl border-2 border-amber-600/40 bg-gradient-to-b from-[#fffefc] via-[#fffaf0] to-[#fff5e3] p-6 shadow-xl relative overflow-hidden">
              <div className="rounded-2xl border-2 border-dashed border-amber-600/30 p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full border border-amber-500 bg-red-800 flex items-center justify-center text-amber-200">
                    <span className="font-devanagari text-xs font-bold">ॐ</span>
                  </div>
                  <span className="font-sans-montserrat text-[10px] uppercase tracking-wider text-red-900 font-bold">
                    शाही विवाह प्रवेश पास • Royal Guest Pass
                  </span>
                </div>

                <h3 className="font-rozha text-2xl font-normal text-red-950 mt-2">
                  {guestName}
                </h3>
                <p className="font-sans-montserrat text-xs text-amber-800 font-bold mt-0.5">
                  {attending === 'yes'
                    ? `उपस्थिती निश्चित • ${partySize} सदस्य (${dietaryPreference.split('(')[0]})`
                    : 'उपस्थित राहण्यास असमर्थ, मनःपूर्वक सदिच्छा'}
                </p>

                <div className="my-3 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

                <div className="space-y-1 text-xs text-stone-700 font-sans-montserrat">
                  <p className="font-bold text-stone-900">{details.eventDate} • शुभ मुहूर्त: {details.muhuratTime}</p>
                  <p>{details.venueName}, {details.venueCityState}</p>
                  <p className="text-amber-900 font-semibold">पेहराव: {details.dressCodeTitle}</p>
                </div>

                {attending === 'yes' && (
                  <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center">
                      <QrCode className="h-16 w-16 text-red-900" />
                      <span className="text-[10px] font-sans-montserrat uppercase tracking-wider text-stone-600 mt-1 font-semibold">
                        Pass Code: SHUBH-{Date.now().toString().slice(-5)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Direct Dispatch Button for Vercel Hosting */}
            <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 text-center space-y-2">
              <p className="text-xs text-emerald-950 font-semibold">
                नोंदणीची माहिती कुटुंबीयांना व्हॉट्सॲपवर त्वरित पाठवा:
              </p>
              <button
                type="button"
                onClick={handleSendWhatsAppConfirmation}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-5 font-sans-montserrat text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition active:scale-95"
              >
                <span>व्हॉट्सॲपवर पाठवा • Send Confirmation via WhatsApp</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 font-sans-montserrat text-xs uppercase tracking-wider text-stone-700 hover:bg-stone-100 transition font-semibold"
              >
                <span>माहिती बदला • Edit Details</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center gap-2 rounded-full border border-amber-600 bg-gradient-to-r from-red-800 to-red-900 px-7 py-2.5 font-sans-montserrat text-xs uppercase tracking-wider text-amber-100 hover:from-red-700 hover:to-red-800 transition font-semibold"
              >
                <span>पूर्ण झाले • Done</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
