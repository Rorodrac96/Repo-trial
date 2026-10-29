import React, { useState } from 'react';
import { EventDetails, RSVPRecord } from '../types/invitation';
import {
  X,
  Users,
  Utensils,
  Music,
  Download,
  Settings,
  CheckCircle,
  XCircle,
  Palette,
  FileSpreadsheet
} from 'lucide-react';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: EventDetails;
  onUpdateDetails: (newDetails: EventDetails) => void;
  rsvpList: RSVPRecord[];
  onResetRSVPs: () => void;
  customGuestName: string;
  onUpdateGuestName: (name: string) => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  details,
  onUpdateDetails,
  rsvpList,
  onResetRSVPs,
  customGuestName,
  onUpdateGuestName,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'customize' | 'playlist'>('analytics');
  const [formData, setFormData] = useState<EventDetails>({ ...details });

  if (!isOpen) return null;

  // Analytics
  const attendingCount = rsvpList.filter((r) => r.attending === 'yes').length;
  const declinedCount = rsvpList.filter((r) => r.attending === 'no').length;
  const totalHeadcount = rsvpList.reduce((acc, curr) => acc + (curr.attending === 'yes' ? curr.partySize : 0), 0);

  // Meal breakdown
  const mealCounts: { [meal: string]: number } = {};
  rsvpList.forEach((r) => {
    if (r.attending === 'yes' && r.dietaryPreference) {
      mealCounts[r.dietaryPreference] = (mealCounts[r.dietaryPreference] || 0) + r.partySize;
    }
  });

  const songs = rsvpList.filter((r) => r.songRequest && r.songRequest.trim().length > 0);

  const handleExportCSV = () => {
    const headers = ['ID', 'Guest Name', 'Email', 'Phone', 'Attending', 'Party Headcount', 'Family Names', 'Pangat Preference', 'Song Request', 'Blessings', 'Submitted At'];
    const rows = rsvpList.map((r) => [
      `"${r.id}"`,
      `"${r.guestName}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.attending}"`,
      r.partySize,
      `"${(r.guestNames || []).join(', ')}"`,
      `"${r.dietaryPreference || 'Traditional'}"`,
      `"${(r.songRequest || '').replace(/"/g, '""')}"`,
      `"${(r.blessingMessage || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shubh_vivah_rsvps_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDetails(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border-2 border-amber-600/40 bg-[#fffdfa] p-6 sm:p-8 shadow-2xl text-stone-900 my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 border border-amber-300 text-red-900">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-devanagari text-2xl font-bold text-red-950">
              विवाह संयोजक व्यवस्थापन • Organizer Portal
            </h2>
            <p className="font-sans-montserrat text-xs text-stone-600">
              पाहुण्यांची उपस्थिती, पंगत भोजन संख्या आणि लग्नपत्रिका तपशील व्यवस्थापन
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-stone-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans-montserrat text-xs uppercase tracking-wider font-semibold transition ${
              activeTab === 'analytics'
                ? 'bg-amber-100 text-red-950 border border-amber-400'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>उपस्थिती संख्या ({rsvpList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('playlist')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans-montserrat text-xs uppercase tracking-wider font-semibold transition ${
              activeTab === 'playlist'
                ? 'bg-amber-100 text-red-950 border border-amber-400'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Music className="h-3.5 w-3.5" />
            <span>गाण्यांची फर्माईश ({songs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customize')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans-montserrat text-xs uppercase tracking-wider font-semibold transition ${
              activeTab === 'customize'
                ? 'bg-amber-100 text-red-950 border border-amber-400'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>पत्रिका संपादन • Edit</span>
          </button>
        </div>

        {/* TAB 1: Analytics & Guest List */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-stone-200 bg-amber-50/50 p-3 text-center">
                <span className="block font-marcellus text-3xl font-bold text-red-950">
                  {rsvpList.length}
                </span>
                <span className="font-sans-montserrat text-[10px] uppercase tracking-wider text-stone-600 font-semibold">
                  एकूण प्रतिसाद (Responses)
                </span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-amber-50/50 p-3 text-center">
                <span className="block font-marcellus text-3xl font-bold text-amber-800">
                  {totalHeadcount}
                </span>
                <span className="font-sans-montserrat text-[10px] uppercase tracking-wider text-stone-600 font-semibold">
                  एकूण व्यक्ती (Total Headcount)
                </span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-amber-50/50 p-3 text-center">
                <span className="block font-marcellus text-3xl font-bold text-emerald-700">
                  {attendingCount}
                </span>
                <span className="font-sans-montserrat text-[10px] uppercase tracking-wider text-stone-600 font-semibold">
                  स्वीकृती (Attending)
                </span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-amber-50/50 p-3 text-center">
                <span className="block font-marcellus text-3xl font-bold text-rose-700">
                  {declinedCount}
                </span>
                <span className="font-sans-montserrat text-[10px] uppercase tracking-wider text-stone-600 font-semibold">
                  असमर्थ (Declined)
                </span>
              </div>
            </div>

            {/* Meal / Pangat Breakdown */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
              <h4 className="font-devanagari text-sm font-bold text-red-950 mb-2 flex items-center gap-1.5">
                <Utensils className="h-4 w-4 text-red-800" />
                <span>भोजन व पंगत व्यवस्था अंदाज (Dining Headcounts)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(mealCounts).map(([m, cnt]) => (
                  <div key={m} className="flex justify-between items-center rounded-xl bg-white p-2.5 border border-stone-200">
                    <span className="text-stone-800 font-medium truncate max-w-[220px]">{m}</span>
                    <span className="font-bold text-red-900">{cnt} व्यक्ती</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Table */}
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">
              <div className="p-3 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <span className="font-devanagari text-xs font-bold text-stone-800">
                  नोंदणीकृत पाहुण्यांची यादी
                </span>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 rounded-lg bg-red-800 px-3 py-1 text-xs text-amber-100 hover:bg-red-700 transition"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Download Excel CSV</span>
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {rsvpList.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-500">
                    अद्याप कोणतीही नोंदणी झालेली नाही.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs font-sans-montserrat">
                    <thead className="bg-stone-100 text-stone-600 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-2.5">पाहुणे (Guest)</th>
                        <th className="p-2.5">उपस्थिती</th>
                        <th className="p-2.5">सदस्य</th>
                        <th className="p-2.5">पंगत पसंती</th>
                        <th className="p-2.5">संदेश</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {rsvpList.map((r) => (
                        <tr key={r.id} className="hover:bg-amber-50/50">
                          <td className="p-2.5 text-stone-900 font-semibold">
                            {r.guestName}
                            <span className="block text-[10px] text-stone-500 font-normal">{r.phone || r.email}</span>
                          </td>
                          <td className="p-2.5">
                            {r.attending === 'yes' ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                                <CheckCircle className="h-3 w-3" /> होय
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                                <XCircle className="h-3 w-3" /> नाही
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 font-bold text-stone-800">{r.partySize}</td>
                          <td className="p-2.5 text-amber-900 font-medium">{r.dietaryPreference}</td>
                          <td className="p-2.5 text-stone-600 italic truncate max-w-[150px]">{r.blessingMessage || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onResetRSVPs}
                className="text-xs text-rose-700 hover:text-rose-800 underline font-medium"
              >
                Reset to sample RSVPs
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 rounded-full border border-amber-600 bg-red-800 px-4 py-2 text-xs text-amber-100 font-semibold shadow"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Guest List CSV</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Playlist Requests */}
        {activeTab === 'playlist' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 max-h-80 overflow-y-auto">
              {songs.length === 0 ? (
                <p className="text-xs text-stone-500 text-center py-8">
                  अद्याप कोणत्याही गाण्याची फर्माईश आलेली नाही.
                </p>
              ) : (
                <div className="space-y-2">
                  {songs.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-amber-50/70 p-3 border border-amber-200"
                    >
                      <div className="flex items-center gap-3">
                        <Music className="h-4 w-4 text-red-800" />
                        <div>
                          <p className="font-devanagari text-base font-bold text-red-950">
                            {s.songRequest}
                          </p>
                          <p className="text-[10px] text-stone-600 font-sans-montserrat">
                            फर्माईश: {s.guestName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Customize Details */}
        {activeTab === 'customize' && (
          <form onSubmit={handleSaveCustomization} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  वधूचे नाव (Bride&apos;s Name)
                </label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  वराचे नाव (Groom&apos;s Name)
                </label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  वधूचे कुटुंब (Bride&apos;s Family Details)
                </label>
                <input
                  type="text"
                  value={formData.brideFamily}
                  onChange={(e) => setFormData({ ...formData, brideFamily: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  वराचे कुटुंब (Groom&apos;s Family Details)
                </label>
                <input
                  type="text"
                  value={formData.groomFamily}
                  onChange={(e) => setFormData({ ...formData, groomFamily: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  विवाह दिनांक (Date)
                </label>
                <input
                  type="text"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  शुभ मुहूर्त (Muhurat Time)
                </label>
                <input
                  type="text"
                  value={formData.muhuratTime}
                  onChange={(e) => setFormData({ ...formData, muhuratTime: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  राजमुद्रा चिन्ह (Monogram)
                </label>
                <input
                  type="text"
                  value={formData.monogram}
                  onChange={(e) => setFormData({ ...formData, monogram: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  विवाह स्थळ (Venue Name)
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  शहर व पत्ता (City / State)
                </label>
                <input
                  type="text"
                  value={formData.venueCityState}
                  onChange={(e) => setFormData({ ...formData, venueCityState: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                  RSVP व्हॉट्सॲप नंबर (Coordinator WhatsApp No.)
                </label>
                <input
                  type="text"
                  value={formData.coordinatorWhatsApp || ''}
                  onChange={(e) => setFormData({ ...formData, coordinatorWhatsApp: e.target.value })}
                  placeholder="उदा. 919822012345 (कंट्री कोडसह)"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50/50 py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
                <p className="text-[10px] text-stone-500 mt-0.5">
                  पाहुण्यांनी RSVP भरल्यावर या नंबरवर व्हॉट्सॲप संदेश प्राप्त होईल.
                </p>
              </div>
            </div>

            {/* Personalized Guest Link & WhatsApp Sharing Tool */}
            <div className="pt-3 border-t border-stone-200 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <label className="block text-xs font-sans-montserrat tracking-wider uppercase text-amber-900 font-bold mb-1">
                पाहुण्यांसाठी वैयक्तिक लिंक व व्हॉट्सॲप आमंत्रण (Personalized Link Generator)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customGuestName}
                  onChange={(e) => onUpdateGuestName(e.target.value)}
                  placeholder="उदा. श्री. व सौ. कुलकर्णी आणि परिवार"
                  className="flex-1 rounded-xl border border-stone-300 bg-white py-2 px-3 text-sm text-stone-900 focus:border-red-700 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const baseUrl = window.location.origin + window.location.pathname;
                    const personalizedUrl = `${baseUrl}?guest=${encodeURIComponent(customGuestName)}`;
                    navigator.clipboard.writeText(personalizedUrl);
                    alert(`वैयक्तिक लिंक कॉपी केली:\n${personalizedUrl}`);
                  }}
                  className="rounded-xl border border-amber-600 bg-white px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition whitespace-nowrap"
                >
                  लिंक कॉपी करा
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const baseUrl = window.location.origin + window.location.pathname;
                    const personalizedUrl = `${baseUrl}?guest=${encodeURIComponent(customGuestName)}`;
                    const shareText = `॥ श्री गणेशाय नमः ॥\n\nसस्नेह निमंत्रण!\n*चि. सौ. का. ${details.brideName.split('(')[0].trim()} संग चि. ${details.groomName.split('(')[0].trim()}*\n\nआदरणीय ${customGuestName},\nआमच्या विवाह सोहळ्यास आपण सहकुटुंब, सहपरिवार उपस्थित राहून वधू-वरांस शुभाशीर्वाद द्यावेत ही नम्र प्रार्थना.\n\nदिनांक: ${details.eventDate}\nशुभ मुहूर्त: ${details.muhuratTime}\nस्थळ: ${details.venueName}, ${details.venueCityState}\n\nडिजिटल लग्नपत्रिका पाहण्यासाठी खालील लिंक उघडा:\n${personalizedUrl}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
                  }}
                  className="rounded-xl bg-[#25D366] text-white px-3.5 py-2 text-xs font-bold hover:bg-[#20ba59] transition whitespace-nowrap shadow-sm"
                >
                  WhatsApp वर पाठवा
                </button>
              </div>
              <p className="text-[11px] text-stone-600 mt-2 font-medium">
                पाहुण्याचे नाव टाईप करून &ldquo;WhatsApp वर पाठवा&rdquo; वर क्लिक करताच त्यांच्या नावाच्या वैयक्तिक पत्रिकेसह मेसेज तयार होतो!
              </p>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-stone-300 px-5 py-2 text-xs text-stone-700 font-semibold"
              >
                रद्द करा • Cancel
              </button>
              <button
                type="submit"
                className="rounded-full border border-amber-600 bg-gradient-to-r from-red-800 to-red-900 px-6 py-2 font-sans-montserrat text-xs tracking-wider uppercase text-amber-100 font-bold hover:from-red-700 hover:to-red-800"
              >
                बदल जतन करा • Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
