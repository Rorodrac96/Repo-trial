import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Eye, Image as ImageIcon } from 'lucide-react';

interface GalleryPhotoItem {
  id: number;
  sources: string[];
  label: string;
}

const GALLERY_ITEMS: GalleryPhotoItem[] = [
  {
    id: 1,
    sources: ['/pic1_web.jpg', '/assets/aistudio/pic1_bfd7f940.jpg', '/pic1.jpg'],
    label: 'फोटो १',
  },
  {
    id: 2,
    sources: ['/pic2_web.jpg', '/assets/aistudio/pic2_d24561a8.jpg', '/pic2.jpg'],
    label: 'फोटो २',
  },
  {
    id: 3,
    sources: ['/pic3_web.jpg', '/assets/aistudio/pic3_d4928e6b.jpg', '/pic3.jpg'],
    label: 'फोटो ३',
  },
  {
    id: 4,
    sources: ['/pic4_web.jpg', '/assets/aistudio/pic4_0c7a63f0.jpg', '/pic4.jpg'],
    label: 'फोटो ४',
  },
  {
    id: 5,
    sources: ['/pic5_web.jpg', '/assets/aistudio/pic5_778e54dd.jpg', '/pic5.jpg'],
    label: 'फोटो ५',
  },
  {
    id: 6,
    sources: ['/pic6_web.jpg', '/assets/aistudio/pic6_77ec65cf.jpg', '/pic6.jpg'],
    label: 'फोटो ६',
  },
  {
    id: 7,
    sources: ['/pic7_web.jpg', '/assets/aistudio/Pic7_ecdb9a9e.jpg', '/pic7.jpg'],
    label: 'फोटो ७',
  },
];

const PhotoDisplay: React.FC<{
  item: GalleryPhotoItem;
  className?: string;
  inModal?: boolean;
}> = ({ item, className = '', inModal = false }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (srcIndex < item.sources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  const currentSrc = item.sources[srcIndex];

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-b from-[#fffefc] to-[#fbf4e2] border border-dashed border-amber-600/30 text-center p-6 select-none ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100/80 text-amber-800 mb-2 shadow-sm">
          <ImageIcon className="h-6 w-6 text-amber-700" />
        </div>
        <span className="font-sans-montserrat text-xs text-amber-800/80 font-medium mt-0.5">
          {item.label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt=""
      onError={handleError}
      className={className}
      loading={inModal ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
        );
      }
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const pic7 = GALLERY_ITEMS[6];
  const first6Pics = GALLERY_ITEMS.slice(0, 6);

  return (
    <section id="gallery" className="relative pt-4 pb-6 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
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
      </div>

      {/* Standout Featured Frame for Pic 7 (Larger frame to stand out) */}
      <div className="max-w-xl sm:max-w-2xl mx-auto mb-10">
        <div
          onClick={() => setActivePhotoIndex(6)}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border-3 border-amber-600/60 bg-gradient-to-b from-[#fffdf8] to-[#fcf6e8] p-3 sm:p-4 shadow-xl transition-all duration-500 hover:border-amber-600 hover:shadow-2xl hover:-translate-y-1.5 ring-4 ring-amber-400/25"
        >
          {/* Inner royal decorative border frame */}
          <div className="relative h-96 sm:h-[480px] md:h-[520px] w-full overflow-hidden rounded-2xl bg-amber-50/40 border border-amber-500/30">
            <PhotoDisplay
              item={pic7}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Clean hover state - only eye zoom icon, strictly NO text */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-amber-200 backdrop-blur-sm border border-amber-400/40 shadow-xl">
                <Eye className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Photos Grid (Pic 1 to Pic 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {first6Pics.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setActivePhotoIndex(i)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-amber-600/30 bg-[#ffffff] p-2 shadow-md transition-all duration-500 hover:border-amber-600 hover:-translate-y-1.5"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-amber-50/40">
              <PhotoDisplay
                item={item}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Clean hover state - only eye zoom icon, strictly NO text */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-amber-200 backdrop-blur-sm border border-amber-400/40 shadow-lg">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Click and browse all 7 photos with NO text captions) */}
      {activePhotoIndex !== null && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <div className="max-h-[82vh] w-auto overflow-hidden rounded-xl shadow-2xl border-2 border-amber-400 bg-black">
              <PhotoDisplay
                item={GALLERY_ITEMS[activePhotoIndex]}
                inModal={true}
                className="max-h-[82vh] w-auto object-contain min-w-[280px]"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
};
