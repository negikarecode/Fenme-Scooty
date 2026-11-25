import React from 'react';
import { SiteData, Course } from '../data/siteData';
import { CheckIcon } from './Icons';

interface CoursesSectionProps {
  data: SiteData;
  onSelectCourse?: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  data,
  onSelectCourse,
}) => {
  const handleEnrollClick = (courseId: string) => {
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
    const form = document.getElementById('hero-booking-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      const select = form.querySelector('select[name="course"]') as HTMLSelectElement | null;
      if (select) {
        select.value = courseId;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  const getCardTheme = (color: Course['accentColor']) => {
    switch (color) {
      case 'blush':
        return {
          cardBg: 'bg-blush-50/80',
          border: 'border-blush-200',
          badgeBg: 'bg-blush-200 text-charcoal',
          pillBtnBg: 'bg-white hover:bg-blush-100 text-charcoal border-charcoal/20',
          checkBg: 'bg-blush-200 text-charcoal',
        };
      case 'sky':
        return {
          cardBg: 'bg-sky-50/80',
          border: 'border-sky-200',
          badgeBg: 'bg-sky-200 text-charcoal',
          pillBtnBg: 'bg-white hover:bg-sky-100 text-charcoal border-charcoal/20',
          checkBg: 'bg-sky-200 text-charcoal',
        };
      case 'sage':
        return {
          cardBg: 'bg-sage-50/80',
          border: 'border-sage-200',
          badgeBg: 'bg-sage-200 text-charcoal',
          pillBtnBg: 'bg-white hover:bg-sage-100 text-charcoal border-charcoal/20',
          checkBg: 'bg-sage-200 text-charcoal',
        };
    }
  };

  return (
    <section id="courses" className="relative w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10 overflow-hidden">
      {/* 1. Ambient Pastel Depth: Soft Radial Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blush-200/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 clean-badge bg-blush-100 text-charcoal border-blush-300 mx-auto shadow-xs">
            <span>Our Courses (Hamare Courses)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Courses
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            Choose the right program based on your comfort and experience level.
          </p>
        </div>

        {/* 2-Card Centered Grid with Tactile Card Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch reveal-on-scroll">
          {data.courses.map((course) => {
            const theme = getCardTheme(course.accentColor);

            return (
              <div
                key={course.id}
                className={`rounded-3xl border ${theme.border} ${theme.cardBg} p-7 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group`}
              >
                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`clean-badge ${theme.badgeBg} text-xs font-bold shadow-xs`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-bold text-charcoal/80 backdrop-blur-md bg-white/85 px-3.5 py-1 rounded-full border border-charcoal/10 shadow-xs">
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title & Tagline */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-charcoal mb-2">
                    {course.name}
                  </h3>
                  <p className="text-sm font-semibold text-charcoal/80 mb-4">
                    {course.tagline}
                  </p>

                  {/* Course Image Preview with Frosted Glass Overlay Badge */}
                  <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-charcoal/15 mb-5 relative group">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none" />
                    {/* Frosted Glass Photo Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-black/55 border border-white/20 text-white text-[11px] font-bold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Doorstep Training</span>
                      </span>
                    </div>
                  </div>

                  {/* Ideal For Callout */}
                  <div className="p-3.5 rounded-xl bg-white/85 backdrop-blur-sm border border-charcoal/10 mb-6 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/60 mb-0.5">
                      Ideal For
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-charcoal">
                      {course.idealFor}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      What's Included:
                    </span>
                    {course.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className={`w-5 h-5 rounded-full ${theme.checkBg} flex items-center justify-center shrink-0 mt-0.5 border border-charcoal/10 shadow-xs`}>
                          <CheckIcon className="w-3 h-3 text-charcoal" />
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal/90 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Enroll CTA Button with Tactile Feedback */}
                <div className="pt-2 border-t border-charcoal/10">
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-charcoal hover:bg-blush-600 text-white font-bold text-sm tracking-wide shadow-xs hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 group-hover:shadow"
                  >
                    <span>Enroll in {course.name}</span>
                    <span className="text-white/70 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3-Step "Day 1 to Day 7" Learning Journey Strip Connected by Dashed Route Line */}
        <div className="mt-14 sm:mt-16 max-w-4xl mx-auto reveal-on-scroll">
          <div className="text-center mb-6 sm:mb-8 space-y-2">
            <span className="clean-badge bg-sage-100 text-charcoal border-sage-300 mx-auto text-xs font-bold shadow-xs">
              Step-by-Step Training
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              How You Learn — 7 Din Ka Safar
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 max-w-md mx-auto">
              Structured progressive learning designed for zero-pressure comfort.
            </p>
          </div>

          <div className="relative">
            {/* Clean Dashed Horizontal Route Line on Desktop */}
            <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-charcoal/25 z-0 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 relative z-10">
              {/* Step 1 */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blush-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-blush-100 text-charcoal font-extrabold text-xs flex items-center justify-center border border-blush-300 shadow-xs">
                    01
                  </span>
                  <span className="text-[11px] font-bold text-charcoal/70 uppercase tracking-wider bg-cream-100 px-2.5 py-0.5 rounded-full border border-charcoal/5">
                    Days 1–2
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-charcoal leading-snug">
                  Day 1–2: Balance & Handle Control
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                  Bina dar ke scooty sambhalna aur slow speed balance seekhein.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-sky-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-sky-100 text-charcoal font-extrabold text-xs flex items-center justify-center border border-sky-300 shadow-xs">
                    02
                  </span>
                  <span className="text-[11px] font-bold text-charcoal/70 uppercase tracking-wider bg-cream-100 px-2.5 py-0.5 rounded-full border border-charcoal/5">
                    Days 3–5
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-charcoal leading-snug">
                  Day 3–5: Turns, Brakes & Gali Practice
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                  Safe neighborhood lanes mein U-turns aur smooth braking ki practice.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-sage-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-sage-100 text-charcoal font-extrabold text-xs flex items-center justify-center border border-sage-300 shadow-xs">
                    03
                  </span>
                  <span className="text-[11px] font-bold text-charcoal/70 uppercase tracking-wider bg-cream-100 px-2.5 py-0.5 rounded-full border border-charcoal/5">
                    Days 6–7
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-charcoal leading-snug">
                  Day 6–7: Road & Traffic Confidence
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                  Main road aur traffic mein bina kisi jhijhak ke chalana seekhein.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 sm:mt-14 p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-charcoal/15 max-w-3xl mx-auto text-center space-y-2 shadow-xs hover:shadow-sm transition-shadow reveal-on-scroll">
          <p className="text-sm sm:text-base font-bold text-charcoal">
            🤝 100% Worry-Free Training Guarantee
          </p>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Free scooty aur petrol training ke dauran hum provide karte hain. Aapko alag se koi hidden charges nahi dene hote.
          </p>
        </div>

        {/* Trust & Booking Reassurance Line beneath Courses section */}
        <div className="mt-6 text-center reveal-on-scroll">
          <p className="text-xs sm:text-sm font-bold text-charcoal/75 tracking-tight flex items-center justify-center gap-2 flex-wrap">
            <span>No Hidden Petrol Charges</span>
            <span className="text-charcoal/40">•</span>
            <span>Flexible Slot Rescheduling</span>
            <span className="text-charcoal/40">•</span>
            <span>100% Female Trainers</span>
          </p>
        </div>

      </div>
    </section>
  );
};
