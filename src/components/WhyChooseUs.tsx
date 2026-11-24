import React from 'react';
import { siteData, Benefit } from '../data/siteData';
import { UsersIcon, SparklesIcon, MapPinIcon, AwardIcon, CalendarIcon, ShieldCheckIcon } from './Icons';

export const WhyChooseUs: React.FC = () => {
  const renderIcon = (iconName: Benefit['iconName']) => {
    switch (iconName) {
      case 'users':
        return <UsersIcon className="w-5 h-5 text-charcoal" />;
      case 'sparkles':
        return <SparklesIcon className="w-5 h-5 text-charcoal" />;
      case 'mapPin':
        return <MapPinIcon className="w-5 h-5 text-charcoal" />;
      case 'award':
        return <AwardIcon className="w-5 h-5 text-charcoal" />;
      case 'calendar':
        return <CalendarIcon className="w-5 h-5 text-charcoal" />;
      case 'shield':
        return <ShieldCheckIcon className="w-5 h-5 text-charcoal" />;
    }
  };

  const getPillTint = (index: number) => {
    const tints = [
      'bg-blush-200 border-blush-300',
      'bg-sky-200 border-sky-300',
      'bg-sage-200 border-sage-300',
      'bg-blush-200 border-blush-300',
      'bg-sky-200 border-sky-300',
      'bg-sage-200 border-sage-300',
    ];
    return tints[index % tints.length];
  };

  return (
    <section id="why-us" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 tape-badge bg-sage-200 text-charcoal mx-auto">
            <span>THE FEMME SCOOTY ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Why Choose Femme Scooty
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 font-medium max-w-xl mx-auto leading-relaxed">
            We redesigned two-wheeler education from the ground up for women's comfort, privacy, and confidence.
          </p>
        </div>

        {/* Balanced 6-Card Grid (3x2 Desktop, 2x3 Tablet, 1x6 Mobile) - No Orphan Grid Items! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {siteData.benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-white rounded-card border-2 border-charcoal/15 hover:border-charcoal p-6 sm:p-7 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${getPillTint(index)} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                    {renderIcon(benefit.iconName)}
                  </div>
                  <span className="font-serif italic text-sm font-bold text-charcoal/40">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg sm:text-xl font-bold text-charcoal mb-1">
                  {benefit.title}
                </h3>

                {/* Hinglish Subtitle Pill */}
                <div className="inline-block mb-3">
                  <span className="text-xs font-serif italic text-blush-700 bg-blush-50 px-2 py-0.5 rounded border border-blush-200">
                    "{benefit.hinglishHeadline}"
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-charcoal/60">
                <span>Safe & Certified</span>
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 group-hover:bg-charcoal transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
