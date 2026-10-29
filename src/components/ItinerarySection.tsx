import React from 'react';
import { ScheduleItem } from '../types/invitation';
import { Sparkles, MapPin, Sun, Music, Heart, Utensils, Award } from 'lucide-react';

export const ItinerarySection: React.FC = () => {
  const schedule: ScheduleItem[] = [
    {
      id: 'gandh',
      marathiTitle: 'गंध समारंभ (संपन्न)',
      time: 'रविवार, १३ सप्टेंबर २०२६ • संपन्न',
      location: 'कौटुंबिक सोहळा',
      description: 'गंध व हळदी-कुंकवाचा मांगलिक विधी दोन्ही कुटुंबीय व आप्तेष्टांच्या उपस्थितीत सानंद संपन्न झाला.',
      icon: 'puja',
    },
    {
      id: 'haldi',
      marathiTitle: 'हळद समारंभ',
      time: 'मंगळवार, २४ नोव्हेंबर • संध्याकाळी ०४:३० वा.',
      location: 'सुवर्ण प्रांगण',
      description: 'सुवासिक हळद, चंदन उटी, ढोल-ताशांचा गजर, झेंडूच्या फुलांचा वर्षाव आणि पारंपारिक हळदीचा मंगल सोहळा.',
      icon: 'haldi',
    },
    {
      id: 'sangeet',
      marathiTitle: 'संगीत रजनी व मेंदी सोहळा',
      time: 'मंगळवार, २४ नोव्हेंबर • संध्याकाळी ०७:०० वा.',
      location: 'भव्य राजदरबार',
      description: 'वधूच्या हातांवर सुबक मेंदी, पारंपारिक लोकगीते आणि सहकुटुंब संगीताची रंगतदार मैफल.',
      icon: 'sangeet',
    },
    {
      id: 'seemant',
      marathiTitle: 'सीमांत पूजन व रुखवत प्रदर्शन',
      time: 'बुधवार, २५ नोव्हेंबर • सकाळी ०९:०० वा.',
      location: 'तोरण दालन',
      description: 'वर-वऱ्हाडींचे पारंपारिक स्वागत, व्याहीभेट आणि पारंपारिक मराठमोळ्या रुखवताचे विलोभनीय प्रदर्शन.',
      icon: 'puja',
    },
    {
      id: 'sakharpuda',
      marathiTitle: 'साखरपुडा सोहळा',
      time: 'बुधवार, २५ नोव्हेंबर • शुभ मुहूर्तापूर्वी',
      location: 'मुख्य विवाह मंडप',
      description: 'साखरपुड्याचा गोडवा, सुवर्ण मुद्रिका प्रदान व वधू-वरांचा साखरपुडा सोहळा.',
      icon: 'award',
    },
    {
      id: 'vivah',
      marathiTitle: 'शुभ विवाह मुहूर्त (सप्तपदी व कन्यादान)',
      time: 'बुधवार, २५ नोव्हेंबर • दुपारी ११:३५ वा.',
      location: 'मुख्य विवाह मंडप',
      description: 'अंतरपाट, मंगलाष्टकांचे मंजुळ स्वर (शुभमंगल सावधान), कन्यादान, पवित्र अग्नीभोवती सप्तपदी आणि मंगळसूत्र बंधन.',
      icon: 'vivah',
    },
    {
      id: 'pangat',
      marathiTitle: 'पारंपारिक पंगत (शाही भोजन)',
      time: 'बुधवार, २५ नोव्हेंबर • दुपारी ०१:०० वा.',
      location: 'अन्नपूर्णा भोजन दालन',
      description: 'केळीच्या पानांवर साजूक तुपातील गरमागरम पुरणपोळी, श्रीखंड-पुरी, मसाले भात, आमटी आणि थंडगार सोलकढीची पंगत.',
      icon: 'puja',
    },
    {
      id: 'vaarat',
      marathiTitle: 'भव्य वरात (सवाद्य मिरवणूक)',
      time: 'बुधवार, २५ नोव्हेंबर • संध्याकाळी ०५:३० वा.',
      location: 'नंदनवन लॉन्स परिसर',
      description: 'ढोल-ताशांचा गजर, सनई-चौघडा, आतषबाजी आणि नवदाम्पत्याची सवाद्य व उत्साही भव्य वरात.',
      icon: 'sangeet',
    },
    {
      id: 'reception',
      marathiTitle: 'सत्यनारायण पूजा व भव्य स्वागत समारंभ',
      time: 'बुधवार, २५ नोव्हेंबर • संध्याकाळी ०७:०० वा.',
      location: 'राजप्रासाद उपवन',
      description: 'श्री सत्यनारायण महापूजा, पाहुण्यांचे स्वागत, नवदाम्पत्यास शुभाशीर्वाद आणि शाही भोजन सोहळा.',
      icon: 'reception',
    },
  ];

  const getIcon = (type: ScheduleItem['icon']) => {
    switch (type) {
      case 'haldi':
        return <Sun className="h-5 w-5 text-amber-600" />;
      case 'sangeet':
        return <Music className="h-5 w-5 text-amber-600" />;
      case 'vivah':
        return <Heart className="h-5 w-5 text-red-700" />;
      case 'award':
      case 'reception':
        return <Award className="h-5 w-5 text-amber-600" />;
      case 'puja':
        return <Utensils className="h-5 w-5 text-amber-600" />;
    }
  };

  return (
    <section id="rituals" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-devanagari text-xs tracking-wider uppercase text-amber-900 font-bold">
            विधी व सोहळा
          </span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          विवाह विधी व शुभ मुहूर्त
        </h2>
        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        <p className="font-devanagari text-base sm:text-lg text-amber-950 font-medium">
          पारंपारिक मराठमोळ्या पद्धतीनुसार संपन्न होणाऱ्या मंगल विधींची रूपरेषा
        </p>
      </div>

      {/* Rituals Timeline Cards in Light Sandalwood / Ivory */}
      <div className="relative border-l-2 border-amber-600/30 ml-4 sm:ml-40 pl-6 sm:pl-10 space-y-10">
        {schedule.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Icon with Kumkum / Gold border */}
            <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-500 bg-[#fffdf9] shadow-md group-hover:scale-110 transition duration-300">
              {getIcon(item.icon)}
            </div>

            {/* Time label for desktop on the left (मराठी) */}
            <div className="hidden sm:block absolute -left-44 top-2 text-right w-36 font-devanagari text-xs font-bold text-amber-950">
              {item.time.split('•')[1] || item.time}
            </div>

            {/* Content Card */}
            <div className="rounded-2xl border border-amber-600/25 bg-[#ffffff] p-6 shadow-sm transition duration-300 hover:border-amber-600/60 hover:shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="sm:hidden font-devanagari text-xs font-bold text-red-900">
                  {item.time}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-900 font-devanagari font-bold">
                  <MapPin className="h-3.5 w-3.5 text-red-700" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-devanagari text-xl sm:text-2xl font-bold text-red-950">
                  {item.marathiTitle}
                </h3>
                {item.id === 'gandh' && (
                  <span className="rounded-full bg-emerald-100 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-devanagari font-bold text-emerald-800">
                    सस्नेह संपन्न
                  </span>
                )}
              </div>

              <p className="font-devanagari text-sm text-stone-700 leading-relaxed font-normal">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-devanagari text-amber-900 font-bold">
                <span>पारंपारिक विधी पोशाख</span>
                <span className="text-red-900">{item.time.split('•')[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
