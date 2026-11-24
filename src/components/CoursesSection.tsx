import React from 'react';
import { SiteData, Course } from '../data/siteData';
import { CheckIcon } from './Icons';

interface CoursesSectionProps {
  data: SiteData;
  isMen?: boolean;
  onSelectCourse?: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  data,
  isMen = false,
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
    if (isMen) {
      switch (color) {
        case 'sky':
        case 'blush':
          return {
            cardBg: 'bg-slateBlue-50/80',
            border: 'border-slateBlue-200',
            badgeBg: 'bg-slateBlue-200 text-charcoal',
            pillBtnBg: 'bg-white hover:bg-slateBlue-100 text-charcoal border-charcoal/20',
            checkBg: 'bg-slateBlue-200 text-charcoal',
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
    }

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
          <div
            className={`inline-flex items-center gap-1.5 clean-badge ${
              isMen
                ? 'bg-slateBlue-100 text-charcoal border-slateBlue-300'
                : 'bg-blush-100 text-charcoal border-blush-300'
            } mx-auto`}
          >
            <span>Our Courses (Hamare Courses)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Courses
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            Tailored courses designed for your pace and convenience.
          </p>
        </div>

        {/* Centered, Balanced 2-Column Equal-Height Pastel Cards Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {data.courses.map((course) => {
              const theme = getCardTheme(course.accentColor);
              const isBasic = course.id === '7-days-basic';

              return (
                <div
                  key={course.id}
                  className={`flex flex-col h-full rounded-2xl border ${theme.border} ${theme.cardBg} p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border border-charcoal/10 ${theme.badgeBg}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-charcoal/70">
                      {course.duration}
                    </span>
                  </div>

                  {/* Scooter Training Visual */}
                  <div className="w-full h-52 sm:h-60 rounded-xl overflow-hidden mb-5 border border-charcoal/10 bg-cream-100 relative">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/90">
                        Target Audience (Kinke Liye Hai):
                      </p>
                      <p className="text-xs sm:text-sm font-bold drop-shadow">
                        {course.idealFor}
                      </p>
                    </div>
                  </div>

                  {/* Course Title & Tagline */}
                  <div className="space-y-1.5 mb-5">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                      {course.name}
                    </h3>
                    <p className="font-serif italic text-sm sm:text-base text-charcoal/80">
                      "{course.tagline}"
                    </p>
                  </div>

                  {/* 50-50 English/Hinglish Bullet Points */}
                  <ul className="space-y-2.5 mb-6 text-sm sm:text-[15px] text-charcoal/90 flex-1">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className={`w-4 h-4 rounded-full ${theme.checkBg} border border-charcoal/20 flex items-center justify-center shrink-0 mt-1`}>
                          <CheckIcon className="w-2.5 h-2.5 text-charcoal" />
                        </span>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Aligned CTA Button */}
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => handleEnrollClick(course.id)}
                      className={`w-full py-3.5 px-5 rounded-full ${theme.pillBtnBg} font-bold text-sm tracking-wide border shadow-sm hover:shadow transition-all text-center`}
                    >
                      {isBasic ? 'Book Basic Course' : 'Book Advance Course'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
