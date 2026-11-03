import React, { useState } from 'react';
import { Eye, X, Image as ImageIcon } from 'lucide-react';

interface ExtendedMilestone {
  chapterLabel?: string;
  sources: string[];
  year?: string;
  title: string;
  description: string;
  quote?: string;
}

const StoryPhotoDisplay: React.FC<{
  sources: string[];
  alt: string;
  className?: string;
}> = ({ sources, alt, className = '' }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  const currentSrc = sources[srcIndex];

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-b from-[#fffefc] to-[#fbf4e2] border border-dashed border-amber-600/30 text-center p-6 select-none ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100/80 text-amber-800 mb-2 shadow-sm">
          <ImageIcon className="h-6 w-6 text-amber-700" />
        </div>
        <p className="font-devanagari text-sm font-bold text-red-950">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};

export const StorySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const milestones: ExtendedMilestone[] = [
    {
      chapterLabel: 'अध्याय ०१',
      sources: ['/assets/aistudio/Story1_9a0c0032.jpeg', '/story1.jpeg', '/story1.jpg'],
      year: 'पहिला संवाद • २०२२',
      title: 'पहिल्या भेटीची गोड आठवण',
      description:
        'पुण्याच्या ऐतिहासिक वातावरणात, आदरणीय कुटुंबीयांच्या साक्षीने झालेली पहिली औपचारिक भेट.',
      quote: '',
    },
    {
      chapterLabel: 'साक्षगंध सोहळा',
      sources: ['/assets/aistudio/Story2_81e7c643.jpeg', '/story2.jpeg', '/story2.jpg'],
      year: '१३ सप्टेंबर',
      title: 'साक्षगंध सोहळा',
      description:
        'वडिलधाऱ्यांच्या मंगल आशीर्वादाने व आप्तेष्टांच्या साक्षीने साक्षगंध सोहळा आनंदी वातावरणात संपन्न झाला.',
      quote: '',
    },
    {
      chapterLabel: 'अध्याय ०३',
      sources: ['/story3_web.jpg', '/assets/aistudio/Story3_30947c13.jpg', '/story3.jpg'],
      year: '',
      title: 'दोन कुळांचे मंगल मीलन',
      description:
        'वडिलधाऱ्यांचे पवित्र आशीर्वाद, मंगलाष्टकांचे मंजुळ स्वर आणि पवित्र अग्नीच्या साक्षिने होणारा सप्तपदीचा सोहळा. एका नव्या अध्यायाचा सुवर्ण प्रारंभ!',
      quote: '',
    },
  ];

  return (
    <section id="story" className="relative pt-4 pb-2 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          कशी जुळली ही रेशीमगाठ?
        </h2>
        <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
      </div>

      {/* Story Timeline in Light Palette */}
      <div className="space-y-10">
        {milestones.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={index}
              className={`flex flex-col ${
                isEven ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-8 md:gap-12`}
            >
              {/* Photo Card with Click to View Modal */}
              <div
                className="w-full md:w-1/2 group cursor-pointer"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/30 p-2 bg-[#ffffff] shadow-md transition duration-500 hover:border-amber-600 hover:shadow-xl">
                  <div className="relative h-72 sm:h-84 w-full overflow-hidden rounded-xl bg-amber-50/40">
                    <StoryPhotoDisplay
                      sources={item.sources}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Hover eye icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-amber-200 backdrop-blur-sm border border-amber-400/40 shadow-lg">
                        <Eye className="h-5 w-5" />
                      </div>
                    </div>

                    {item.year && (
                      <span className="absolute bottom-4 left-4 font-devanagari text-xs tracking-wider rounded-full bg-[#fff9eb]/95 px-3 py-1 border border-amber-500 text-red-950 font-bold shadow">
                        {item.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Story Details in Rich Sandalwood */}
              <div className="w-full md:w-1/2 text-left space-y-3">
                <span className="font-sans-montserrat text-xs tracking-widest uppercase text-amber-800 font-bold">
                  {item.chapterLabel || `अध्याय ०${index + 1}`}
                </span>
                <h3 className="font-devanagari text-2xl sm:text-3xl font-bold text-red-950">
                  {item.title}
                </h3>
                <p className="font-sans-montserrat text-sm leading-relaxed text-stone-700 font-normal">
                  {item.description}
                </p>
                {item.quote && (
                  <div className="pt-2 border-l-2 border-amber-600 pl-4 my-2">
                    <p className="font-devanagari text-base text-red-900 font-semibold italic">
                      {item.quote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Photo Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <div className="max-h-[80vh] w-auto overflow-hidden rounded-xl shadow-2xl border-2 border-amber-400 bg-black">
              <StoryPhotoDisplay
                sources={milestones[selectedPhotoIndex].sources}
                alt={milestones[selectedPhotoIndex].title}
                className="max-h-[80vh] w-auto object-contain min-w-[280px]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
