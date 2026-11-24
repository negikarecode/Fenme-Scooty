import React from 'react';
import { SiteData, Benefit } from '../data/siteData';
import { UsersIcon, SparklesIcon, MapPinIcon, AwardIcon, CalendarIcon, ShieldCheckIcon } from './Icons';

interface WhyChooseUsProps {
  data: SiteData;
  isMen?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ data, isMen = false }) => {
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
    if (isMen) {
      const tints = [
        'bg-slateBlue-100 border-slateBlue-200',
        'bg-sage-100 border-sage-200',
        'bg-sky-100 border-sky-200',
        'bg-slateBlue-100 border-slateBlue-200',
        'bg-sage-100 border-sage-200',
        'bg-sky-100 border-sky-200',
      ];
      return tints[index % tints.length];
    }

    const tints = [
      'bg-blush-100 border-blush-200',
      'bg-sky-100 border-sky-200',
      'bg-sage-100 border-sage-200',
      'bg-blush-100 border-blush-200',
      'bg-sky-100 border-sky-200',
      'bg-sage-100 border-sage-200',
    ];
    return tints[index % tints.length];
  };

  return (
    <section id="why-us" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-1.5 clean-badge ${
              isMen
                ? 'bg-slateBlue-100 text-charcoal border-slateBlue-300'
                : 'bg-sage-100 text-charcoal border-sage-300'
            } mx-auto`}
          >
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            {isMen ? 'Why Choose Femme Scooty Men' : 'Why Choose Femme Scooty'}
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            {isMen
              ? 'Designed for complete safety, comfort, and real-road confidence for all ages.'
              : 'Designed for complete safety, comfort, and real-road confidence for women.'}
          </p>
        </div>

        {/* Balanced 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {data.benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl border border-charcoal/10 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${getPillTint(index)} border flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs`}>
                    {renderIcon(benefit.iconName)}
                  </div>
                  <span className="font-serif italic text-sm font-bold text-charcoal/30">
                    0{index + 1}
                  </span>
                </div>

                {/* Title in Clean 50-50 English/Hinglish */}
                <h3 className="font-sans text-lg sm:text-xl font-bold text-charcoal mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
