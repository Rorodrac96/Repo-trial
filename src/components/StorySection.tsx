import React from 'react';
import { StoryMilestone } from '../types/invitation';
import { Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  const milestones: StoryMilestone[] = [
    {
      year: 'पहिला संवाद • २०२२',
      title: 'पहिल्या भेटीची गोड आठवण',
      description:
        'पुण्याच्या ऐतिहासिक वातावरणात, आदरणीय कुटुंबीयांच्या साक्षीने झालेली पहिली औपचारिक भेट. एका क्षणात विचारांचे सूर जुळले आणि नवीन प्रवासाची सुंदर सुरुवात झाली.',
      imageUrl:
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      quote: '“एक क्षण, एक भेट आणि आयुष्यभराचा अतूट विश्वास.”',
    },
    {
      year: 'साखरपुडा • १३ सप्टेंबर',
      title: 'साखरपुडा सोहळा (संपन्न)',
      description:
        'पारंपारिक पेढ्यांचा गोडवा, सोन्याची अंगठी आणि दोन्ही घराण्यांच्या आशीर्वादाने जुळलेली जन्मोजन्मीची रेशीमगाठ. १३ सप्टेंबर रोजी दोन्ही कुटुंबीयांच्या उपस्थितीत साखरपुड्याचा मंगल विधी सानंद संपन्न झाला.',
      imageUrl:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      quote: '“दोन मनांची स्पंदने एकाच तालात धडकू लागली.”',
    },
    {
      year: 'शुभ विवाह • २०२६',
      title: 'दोन कुळांचे मंगल मीलन',
      description:
        'वडिलधाऱ्यांचे पवित्र आशीर्वाद, मंगलाष्टकांचे मंजुळ स्वर आणि पवित्र अग्नीच्या साक्षिने होणारा सप्तपदीचा सोहळा. एका नव्या अध्यायाचा सुवर्ण प्रारंभ!',
      imageUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      quote: '“शुभमंगल सावधान! साता जन्मांची साथ.”',
    },
  ];

  return (
    <section id="story" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-devanagari text-xs tracking-wider uppercase text-amber-900 font-bold">
            कथा रेशीमगाठीची
          </span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          कशी जुळली ही रेशीमगाठ?
        </h2>
        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        <p className="font-devanagari text-base sm:text-lg text-amber-950">
          दोन जीवांचा सुखद प्रवास, संस्कारांचा आणि अतूट प्रेमाचा संगम
        </p>
      </div>

      {/* Story Timeline in Light Palette */}
      <div className="space-y-16">
        {milestones.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={index}
              className={`flex flex-col ${
                isEven ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-8 md:gap-12`}
            >
              {/* Photo Card with Paithani Gold Zari Border */}
              <div className="w-full md:w-1/2 group">
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/30 p-2 bg-[#ffffff] shadow-md transition duration-500 hover:border-amber-600 hover:shadow-xl">
                  <div className="relative h-72 sm:h-84 w-full overflow-hidden rounded-xl">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 font-devanagari text-xs tracking-wider rounded-full bg-[#fff9eb]/95 px-3 py-1 border border-amber-500 text-red-950 font-bold shadow">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Details in Rich Sandalwood */}
              <div className="w-full md:w-1/2 text-left space-y-3">
                <span className="font-sans-montserrat text-xs tracking-widest uppercase text-amber-800 font-bold">
                  अध्याय ०{index + 1}
                </span>
                <h3 className="font-devanagari text-2xl sm:text-3xl font-bold text-red-950">
                  {item.title}
                </h3>
                <p className="font-sans-montserrat text-sm leading-relaxed text-stone-700 font-normal">
                  {item.description}
                </p>
                <div className="pt-2 border-l-2 border-amber-600 pl-4 my-2">
                  <p className="font-devanagari text-base text-red-900 font-semibold italic">
                    {item.quote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
