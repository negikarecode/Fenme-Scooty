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
    <section id="courses" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 clean-badge bg-blush-100 text-charcoal border-blush-300 mx-auto">
            <span>Our Courses (Hamare Courses)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Courses
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            Choose the right program based on your comfort and experience level.
          </p>
        </div>

        {/* 2-Card Centered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch">
          {data.courses.map((course) => {
            const theme = getCardTheme(course.accentColor);

            return (
              <div
                key={course.id}
                className={`rounded-3xl border ${theme.border} ${theme.cardBg} p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group`}
              >
                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`clean-badge ${theme.badgeBg} text-xs font-bold`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-bold text-charcoal/70 bg-white/70 px-3 py-1 rounded-full border border-charcoal/10">
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

                  {/* Course Image Preview */}
                  <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-charcoal/15 mb-5 relative">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Ideal For Callout */}
                  <div className="p-3.5 rounded-xl bg-white/80 border border-charcoal/10 mb-6">
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
                        <span className={`w-5 h-5 rounded-full ${theme.checkBg} flex items-center justify-center shrink-0 mt-0.5 border border-charcoal/10`}>
                          <CheckIcon className="w-3 h-3 text-charcoal" />
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal/90 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Enroll CTA Button */}
                <div className="pt-2 border-t border-charcoal/10">
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-charcoal hover:bg-blush-600 text-white font-bold text-sm tracking-wide shadow-xs transition-colors flex items-center justify-center gap-2 group-hover:shadow"
                  >
                    <span>Enroll in {course.name}</span>
                    <span className="text-white/70">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 sm:mt-16 p-6 rounded-2xl bg-white border border-charcoal/15 max-w-3xl mx-auto text-center space-y-2 shadow-xs">
          <p className="text-sm sm:text-base font-bold text-charcoal">
            🤝 100% Worry-Free Training Guarantee
          </p>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Free scooty aur petrol training ke dauran hum provide karte hain. Aapko alag se koi hidden charges nahi dene hote.
          </p>
        </div>

      </div>
    </section>
  );
};
