import React from 'react';
import { siteData } from '../data/siteData';
import { StarIcon } from './Icons';

export const TestimonialsSection: React.FC = () => {
  const testimonials = siteData.testimonials;

  return (
    <section id="reviews" className="w-full py-16 sm:py-24 bg-pink-graph-grid border-b border-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block">
            <span className="clean-badge bg-blush-200 text-charcoal border-blush-300">
              Riders Ki Zubani
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Hamari Riders Ki Zubani
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 max-w-md mx-auto font-sans leading-relaxed">
            Dekhiye kaise alag-alag umar ki mahilaon ne aaram se scooty chalana seekha.
          </p>
        </div>

        {/* Clean Static 3-Column Grid without misleading carousel arrows or dots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col h-full bg-white rounded-2xl border border-charcoal/10 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4 text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Properly Punctuated Quote in Comfortable 16px Font */}
              <blockquote className="text-base text-charcoal/90 leading-relaxed font-sans flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              {/* Author Footer with Circular Portrait */}
              <div className="pt-4 border-t border-charcoal/10 flex items-center gap-3.5 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-charcoal/15 bg-cream-100 shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-charcoal">
                    {t.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal/70 font-medium">
                    {t.role} • <span className="text-blush-700 font-semibold">{t.city}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
