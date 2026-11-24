import React from 'react';
import { siteData, Course } from '../data/siteData';
import { CheckIcon } from './Icons';

interface CoursesSectionProps {
  onSelectCourse?: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
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
            <span>Hamare Courses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Hamare Training Courses
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            Aapki zaroorat aur suvidha ke hisaab se banaye gaye 3 aasan programs.
          </p>
        </div>

        {/* 3-Column Equal-Height Pastel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {siteData.courses.map((course) => {
            const theme = getCardTheme(course.accentColor);
            return (
              <div
                key={course.id}
                className={`flex flex-col h-full rounded-2xl border ${theme.border} ${theme.cardBg} p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative group`}
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

                {/* Authentic Scooter Training Visual */}
                <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-charcoal/10 bg-cream-100 relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/90">
                      Kinke Liye Hai:
                    </p>
                    <p className="text-xs sm:text-sm font-bold drop-shadow">
                      {course.idealFor}
                    </p>
                  </div>
                </div>

                {/* Course Title & Tagline */}
                <div className="space-y-1.5 mb-5">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    {course.name}
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base text-charcoal/80">
                    "{course.tagline}"
                  </p>
                </div>

                {/* Short 3-4 Bullet Points in Simple Hinglish */}
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

                {/* Bottom Aligned Clean Pill CTA Button */}
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className={`w-full py-3.5 px-5 rounded-full ${theme.pillBtnBg} font-bold text-sm tracking-wide border shadow-sm hover:shadow transition-all text-center`}
                  >
                    Course Book Karein
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
