import React from 'react';
import { SiteData } from '../data/siteData';
import { CheckIcon } from './Icons';

interface AboutSectionProps {
  data: SiteData;
  isMen?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data, isMen = false }) => {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story & 4 Clean Checkmarks */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`clean-badge ${
                isMen
                  ? 'bg-slateBlue-100 text-charcoal border-slateBlue-300'
                  : 'bg-blush-100 text-charcoal border-blush-300'
              }`}
            >
              <span>About Us (Hamare Baare Mein)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
              Hamari Kahani — <br className="hidden sm:inline" />
              <span className="font-serif italic font-bold">Scooty Freedom Starts Here!</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              <p>
                {data.story.founderStory}
              </p>
              <p>
                {data.story.mission}
              </p>
            </div>

            {/* 4 Clean Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.story.corePillars.map((pillar, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white border border-charcoal/10 shadow-sm space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sage-200 border border-charcoal/20 flex items-center justify-center shrink-0">
                      <CheckIcon className="w-3 h-3 text-charcoal" />
                    </span>
                    <h4 className="font-bold text-sm text-charcoal">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed pl-7">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Stat Bar */}
            <div
              className={`p-4 sm:p-5 rounded-xl border border-charcoal/10 flex flex-wrap items-center justify-around gap-4 text-center ${
                isMen ? 'bg-slateBlue-100/70' : 'bg-sky-100/70'
              }`}
            >
              {data.story.stats.map((s, idx) => (
                <div key={idx} className="px-2">
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-charcoal">{s.value}</span>
                  <span className="text-xs font-semibold text-charcoal/70">{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Clean Editorial Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Training Image Container */}
              <div className="rounded-2xl overflow-hidden border border-charcoal/15 shadow-md bg-cream-100 relative group">
                <img
                  src={isMen ? '/images/men-about-story.jpg' : '/images/about-story.jpg'}
                  alt="Scooty Training Session"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                
                {/* Visual Overlay Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      isMen ? 'text-slateBlue-200' : 'text-blush-200'
                    }`}
                  >
                    Zero Tension Guarantee
                  </span>
                  <p className="font-serif italic text-base sm:text-lg font-medium leading-snug">
                    {isMen
                      ? '"Pehle din se hi tension khatam. Trainer itne patience se sikhate hain ki bina kisi jhijhak ke aaram se seekh sakte hain."'
                      : '"Pehle din se hi tension khatam. Didi itne aaram se sikhati hain ki darr bilkul nikal jata hai."'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
