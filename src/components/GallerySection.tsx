import React, { useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      caption: 'चि. जसराज व चि. सौ. का. अंकिता - पारंपारिक शुभ क्षण',
      category: 'क्षणचित्रे',
    },
    {
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      caption: 'शुभ मुहूर्त आणि मंगलाष्टकांचा पवित्र सोहळा',
      category: 'विधी',
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: 'झेंडूच्या फुलांनी आणि दिव्यांनी सजलेला मुख्य विवाह मंडप',
      category: 'मंडप सजावट',
    },
    {
      url: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      caption: 'पारंपारिक पैठणी, कोल्हापुरी साज आणि नथीचे सौंदर्य',
      category: 'दागिने व पेहराव',
    },
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      caption: 'सप्तपदी व अक्षतांचा मंगल वर्षाव',
      category: 'सप्तपदी',
    },
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      caption: 'राजवाड्याची भव्य रोषणाई व सनई-चौघडे',
      category: 'स्वागत',
    },
  ];

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-devanagari text-xs tracking-wider uppercase text-amber-900 font-bold">
            क्षणचित्रे
          </span>
          <Sparkles className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="font-rozha text-4xl sm:text-5xl font-normal text-red-950">
          सुवर्ण क्षणांची झलक
        </h2>
        <div className="my-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        <p className="font-devanagari text-base sm:text-lg text-amber-950 font-medium">
          हळदीचा रंग, मेंदीचा सुगंध आणि मंगलाष्टकांचे मंजुळ सूर!
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, i) => (
          <div
            key={i}
            onClick={() => setActivePhotoIndex(i)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-amber-600/30 bg-[#ffffff] p-2 shadow-md transition-all duration-500 hover:border-amber-600 hover:-translate-y-1.5"
          >
            <div className="relative h-72 w-full overflow-hidden rounded-2xl">
              <img
                src={photo.url}
                alt={photo.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="font-devanagari text-xs text-amber-300 font-bold">
                  {photo.category}
                </span>
                <p className="font-devanagari text-base font-bold text-amber-100 mt-1">
                  {photo.caption}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-200">
                  <Eye className="h-3.5 w-3.5" />
                  <span className="font-devanagari text-xs font-bold">मोठे करून पहा</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={photos[activePhotoIndex].url}
              alt={photos[activePhotoIndex].caption}
              className="max-h-[72vh] w-auto rounded-xl shadow-2xl object-contain border-2 border-amber-400"
            />
            <div className="mt-4 text-center">
              <span className="font-devanagari text-xs text-amber-300 font-bold">
                {photos[activePhotoIndex].category}
              </span>
              <p className="font-devanagari text-lg text-white font-bold mt-1">
                {photos[activePhotoIndex].caption}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
};
