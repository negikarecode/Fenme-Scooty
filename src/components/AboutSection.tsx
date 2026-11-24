import React from 'react';
import { siteData } from '../data/siteData';
import { CheckIcon, ScooterIcon } from './Icons';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story & 4 Clean Checkmarks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="tape-badge bg-blush-200 text-charcoal">
              <ScooterIcon className="w-3.5 h-3.5" />
              <span>THE FEMME SCOOTY STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
              Scooty Freedom <br className="hidden sm:inline" />
              <span className="font-serif italic font-bold">Starts Right Here.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              <p className="font-medium text-charcoal">
                Born from a simple, empowering question: <em className="font-serif italic font-semibold text-charcoal">"{siteData.story.mission}"</em>
              </p>
              <p>
                {siteData.story.founderStory}
              </p>
              <p>
                {siteData.story.milestoneText}
              </p>
            </div>

            {/* 4 Clean Pillars with Unified Vector Checkmarks */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteData.story.corePillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-charcoal/15 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sage-200 border border-charcoal/20 flex items-center justify-center shrink-0">
                      <CheckIcon className="w-3 h-3 text-charcoal" />
                    </span>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-charcoal">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed pl-7">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Stat Bar */}
            <div className="p-4 rounded-xl bg-sky-100/70 border border-charcoal/15 flex flex-wrap items-center justify-around gap-4 text-center">
              {siteData.story.stats.map((s, idx) => (
                <div key={idx} className="px-2">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-charcoal">{s.value}</span>
                  <span className="text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Editorial Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Corner Badge */}
              <div className="absolute -top-4 -left-3 z-20">
                <span className="tape-badge bg-sky-200 text-charcoal shadow-sm -rotate-2">
                  EST. 2024 • FOUNDER KAJAL KAUR
                </span>
              </div>

              {/* Training Image Container */}
              <div className="rounded-card overflow-hidden border-2 border-charcoal shadow-elevated bg-cream-100 relative group">
                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80"
                  alt="Femme Scooty Training Session"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                
                {/* Visual Overlay Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-blush-200 block">
                    Zero Intimidation Guarantee
                  </span>
                  <p className="font-serif italic text-lg sm:text-xl font-medium leading-snug">
                    "Pehle din se hi tension khatam. Didi itne aaram se sikhati hain ki darr nikal jata hai."
                  </p>
                </div>
              </div>

              {/* Bottom Decorative Tape Badge */}
              <div className="absolute -bottom-4 -right-2 z-20">
                <span className="tape-badge bg-sage-200 text-charcoal shadow-sm rotate-2">
                  100% FEMALE MENTORS
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
