import React from 'react';
import { SiteData } from '../data/siteData';
import { CheckIcon } from './Icons';

interface AboutSectionProps {
  data: SiteData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Brand Story & Pillars */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="clean-badge bg-blush-100 text-charcoal border-blush-300">
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

              {/* 4 Pillars */}
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
            </div>

            {/* Quick Stat Bar */}
            <div className="p-4 sm:p-5 rounded-2xl border border-charcoal/10 grid grid-cols-2 gap-3.5 sm:gap-4 text-center bg-sky-100/70 mt-6">
              {data.story.stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white/60 rounded-xl border border-charcoal/5 flex flex-col justify-center overflow-hidden"
                >
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-charcoal truncate">
                    {s.value}
                  </span>
                  <span className="text-xs font-semibold text-charcoal/70 truncate whitespace-nowrap mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Editorial Visual Card filling full column height */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-charcoal/15 shadow-md bg-cream-100 group min-h-[380px] sm:min-h-[460px] flex flex-col justify-end">
              <img
                src="/images/about-story.jpg"
                alt="Scooty Training Session"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />
              
              {/* Visual Overlay Caption */}
              <div className="relative z-10 p-5 sm:p-6 text-white space-y-1">
                <span className="clean-badge bg-white/90 text-charcoal text-[11px] font-bold">
                  Safe Neighborhood Roads
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-medium">
                  1-on-1 practical training arranged near your home with patient female trainers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
