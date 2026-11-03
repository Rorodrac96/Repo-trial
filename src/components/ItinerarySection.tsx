import React from 'react';
import { ScheduleItem } from '../types/invitation';
import { Sparkles, MapPin, Sun, Music, Heart, Utensils, Award } from 'lucide-react';

export const ItinerarySection: React.FC = () => {
  const schedule: ScheduleItem[] = [
    {
      id: 'sakharpuda',
      marathiTitle: 'साखरपुडा, हळद, मेंदी व संगीत सोहळा',
      time: 'मंगळवार, २४ नोव्हेंबर • संध्याकाळी ०६:०० वा.',
      location: 'राहते घर, पिंपरी निर्मळ',
      description: 'साखरपुडा (सुवर्ण मुद्रिका प्रदान सोहळा), सुवासिक हळद, हातांवर सुबक मेंदी आणि सहकुटुंब संगीताची रंगतदार मैफल.',
      icon: 'award',
    },
    {
      id: 'vivah',
      marathiTitle: 'शुभ विवाह मुहूर्त (सप्तपदी व कन्यादान)',
      time: 'बुधवार, २५ नोव्हेंबर • दुपारी ०१:५५ वा.',
      location: 'मुख्य विवाह मंडप (नंदनवन लॉन्स)',
      description: 'अंतरपाट, मंगलाष्टकांचे मंजुळ स्वर (शुभमंगल सावधान), कन्यादान, पवित्र अग्नीभोवती सप्तपदी आणि मंगळसूत्र बंधन.',
      icon: 'vivah',
    },
    {
      id: 'pangat',
      marathiTitle: 'पारंपारिक पंगत (शाही भोजन)',
      time: 'बुधवार, २५ नोव्हेंबर • सकाळी ११:०० ते दुपारी ०२:०० वा.',
      location: 'अन्नपूर्णा भोजन दालन',
      description: 'केळीच्या पानांवर साजूक तुपातील गरमागरम पुरणपोळी, श्रीखंड-पुरी, मसाले भात, आमटी आणि थंडगार सोलकढीची पंगत.',
      icon: 'puja',
    },
    {
      id: 'vaarat',
      marathiTitle: 'भव्य वरात (सवाद्य मिरवणूक)',
      time: 'बुधवार, २५ नोव्हेंबर • संध्याकाळी ०७:०० वा.',
      location: 'जुन्नर',
      description: 'ढोल-ताशांचा गजर, सनई-चौघडा, आतषबाजी आणि नवदाम्पत्याची सवाद्य व उत्साही भव्य वरात.',
      icon: 'sangeet',
    },
    {
      id: 'reception',
      marathiTitle: 'श्री सत्यनारायण पूजा व स्वागत समारंभ',
      time: 'गुरुवार, २६ नोव्हेंबर • संध्याकाळी ०६:०० वा.',
      location: 'जुन्नर',
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
    <section id="rituals" className="relative pt-16 pb-4 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
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
      <div className="relative border-l-2 border-amber-600/30 ml-4 sm:ml-40 pl-6 sm:pl-10 space-y-8">
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
              </div>

              <p className="font-devanagari text-sm text-stone-700 leading-relaxed font-normal">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-devanagari text-amber-900 font-bold">
                <span>{item.id !== 'vaarat' ? 'पारंपारिक विधी सोहळा' : ''}</span>
                <span className="text-red-900">{item.time.split('•')[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
