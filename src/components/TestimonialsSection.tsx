import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = siteData.testimonials;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="w-full py-16 sm:py-24 bg-pink-graph-grid border-b border-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Editorial Pill Heading matching "Meet our members" in reference */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block">
            <span className="tape-badge bg-blush-300 text-charcoal font-bold text-xs uppercase tracking-widest px-4 py-1.5 shadow-sm">
              REAL STORIES • REAL RIDERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Meet our riders
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 max-w-md mx-auto font-sans leading-relaxed">
            Read how women of all ages—from 16-year-old school students to 60-year-old mothers—gained independence on two wheels.
          </p>
        </div>

        {/* Desktop View: 3 Equal-Height White Cards Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`flex flex-col h-full bg-white rounded-card border-2 border-charcoal p-6 sm:p-7 shadow-editorial hover:translate-y-[-2px] hover:shadow-elevated transition-all duration-300 relative ${
                idx === activeIndex ? 'ring-2 ring-blush-400' : ''
              }`}
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4 text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Properly Punctuated Quote */}
              <blockquote className="text-sm sm:text-[15px] font-serif italic text-charcoal/90 leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              {/* Author Footer with Circular Portrait */}
              <div className="pt-4 border-t border-charcoal/10 flex items-center gap-3.5 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-charcoal/20 bg-cream-100 shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-charcoal">
                    {t.name}
                  </h4>
                  <p className="text-xs text-charcoal/70 font-medium">
                    {t.role} • <span className="text-blush-700 font-semibold">{t.city}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Carousel View */}
        <div className="lg:hidden">
          <div className="bg-white rounded-card border-2 border-charcoal p-6 sm:p-8 shadow-editorial relative flex flex-col justify-between min-h-[320px]">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3 text-amber-500">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-sm sm:text-base font-serif italic text-charcoal leading-relaxed my-auto">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="pt-5 border-t border-charcoal/10 flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-charcoal/20 bg-cream-100 shrink-0">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-charcoal">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-xs text-charcoal/70">
                    {testimonials[activeIndex].role} • <span className="text-blush-700 font-semibold">{testimonials[activeIndex].city}</span>
                  </p>
                </div>
              </div>

              {/* Indicator */}
              <span className="text-xs font-mono font-bold text-charcoal/50">
                0{activeIndex + 1} / 0{testimonials.length}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Control Buttons (Circular Pink Buttons matching reference) */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-11 h-11 rounded-full bg-blush-300 hover:bg-blush-400 active:bg-blush-500 border border-charcoal flex items-center justify-center text-charcoal shadow-sm hover:scale-105 active:scale-95 transition-all focus:outline-none"
          >
            <ChevronLeftIcon className="w-5 h-5 text-charcoal" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to review ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all focus:outline-none ${
                  idx === activeIndex
                    ? 'w-6 bg-charcoal'
                    : 'w-2.5 bg-charcoal/30 hover:bg-charcoal/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-11 h-11 rounded-full bg-blush-300 hover:bg-blush-400 active:bg-blush-500 border border-charcoal flex items-center justify-center text-charcoal shadow-sm hover:scale-105 active:scale-95 transition-all focus:outline-none"
          >
            <ChevronRightIcon className="w-5 h-5 text-charcoal" />
          </button>
        </div>

      </div>
    </section>
  );
};
