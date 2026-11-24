import React from 'react';
import { SiteData } from '../data/siteData';
import { StarIcon } from './Icons';

interface TestimonialsSectionProps {
  data: SiteData;
  isMen?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data, isMen = false }) => {
  const testimonials = data.testimonials;

  return (
    <section
      id="reviews"
      className={`w-full py-16 sm:py-24 ${
        isMen ? 'bg-slate-graph-grid' : 'bg-pink-graph-grid'
      } border-b border-charcoal/10 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block">
            <span
              className={`clean-badge ${
                isMen
                  ? 'bg-slateBlue-200 text-charcoal border-slateBlue-300'
                  : 'bg-blush-200 text-charcoal border-blush-300'
              }`}
            >
              Rider Reviews (Riders Ki Zubani)
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            {isMen ? 'Meet Our Riders — Hamare Riders Ki Zubani' : 'Meet Our Riders — Hamari Riders Ki Zubani'}
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 max-w-md mx-auto font-sans leading-relaxed">
            Read how learners of all ages gained two-wheeler independence with complete confidence.
          </p>
        </div>

        {/* Clean Static 3-Column Grid with aligned dividers and bottom quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col h-full bg-white rounded-2xl border border-charcoal/10 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Author Header with consistent min-height so divider is aligned across all cards */}
              <div className="flex items-center gap-3.5 min-h-[52px] sm:min-h-[58px]">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-charcoal/15 bg-cream-100 shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-charcoal truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal/70 font-medium leading-snug line-clamp-2">
                    {t.role} •{' '}
                    <span className={isMen ? 'text-slateBlue-700 font-semibold' : 'text-blush-700 font-semibold'}>
                      {t.city}
                    </span>
                  </p>
                </div>
              </div>

              {/* Aligned Horizontal Divider */}
              <div className="pt-4 border-t border-charcoal/10 my-1" />

              {/* Card Body with flex-col flex-1 mt-auto containing star rating and bottom quote */}
              <div className="flex flex-col flex-1 mt-auto">
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-base text-charcoal/90 leading-relaxed font-sans flex-1">
                  "{t.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
