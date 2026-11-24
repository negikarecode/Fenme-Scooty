import React from 'react';
import { siteData, Course } from '../data/siteData';
import { CheckIcon, ScooterIcon } from './Icons';

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
          cardBg: 'bg-blush-50/70',
          border: 'border-blush-300',
          badgeBg: 'bg-blush-200 text-charcoal',
          pillBtnBg: 'bg-white hover:bg-blush-100 text-charcoal border-charcoal',
          highlight: 'text-blush-700',
          checkBg: 'bg-blush-200 text-charcoal',
        };
      case 'sky':
        return {
          cardBg: 'bg-sky-50/70',
          border: 'border-sky-300',
          badgeBg: 'bg-sky-200 text-charcoal',
          pillBtnBg: 'bg-white hover:bg-sky-100 text-charcoal border-charcoal',
          highlight: 'text-sky-700',
          checkBg: 'bg-sky-200 text-charcoal',
        };
      case 'sage':
        return {
          cardBg: 'bg-sage-50/70',
          border: 'border-sage-300',
          badgeBg: 'bg-sage-200 text-charcoal',
          pillBtnBg: 'bg-white hover:bg-sage-100 text-charcoal border-charcoal',
          highlight: 'text-sage-700',
          checkBg: 'bg-sage-200 text-charcoal',
        };
    }
  };

  return (
    <section id="courses" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 tape-badge bg-blush-200 text-charcoal mx-auto">
            <ScooterIcon className="w-3.5 h-3.5" />
            <span>STRUCTURED LEARNING PATHWAYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Courses
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 font-medium max-w-xl mx-auto leading-relaxed">
            From absolute first-timers to working women navigating busy rush-hour traffic, choose the training pace designed for you.
          </p>
        </div>

        {/* 3-Column Equal-Height Pastel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {siteData.courses.map((course) => {
            const theme = getCardTheme(course.accentColor);
            return (
              <div
                key={course.id}
                className={`flex flex-col h-full rounded-card border-2 ${theme.border} ${theme.cardBg} p-5 sm:p-6 shadow-soft hover:shadow-elevated transition-all duration-300 relative group`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-charcoal/15 ${theme.badgeBg}`}>
                    {course.badge}
                  </span>
                  <span className="text-xs font-bold text-charcoal/70 tracking-wide">
                    {course.duration}
                  </span>
                </div>

                {/* Course Visual */}
                <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-5 border border-charcoal/10 bg-cream-100 relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-semibold tracking-wide uppercase opacity-90 drop-shadow-sm">
                      Target Audience
                    </p>
                    <p className="text-xs font-bold drop-shadow">
                      "{course.idealFor}"
                    </p>
                  </div>
                </div>

                {/* Course Title & Hinglish Subtext */}
                <div className="space-y-1.5 mb-5">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    {course.name}
                  </h3>
                  <p className="font-serif italic text-sm text-charcoal/80 font-medium">
                    "{course.tagline}"
                  </p>
                </div>

                {/* Unified Vector Checkmarks Feature List */}
                <ul className="space-y-2.5 mb-6 text-xs sm:text-[13px] text-charcoal/90 flex-1">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className={`w-4 h-4 rounded-full ${theme.checkBg} border border-charcoal/20 flex items-center justify-center shrink-0 mt-0.5`}>
                        <CheckIcon className="w-2.5 h-2.5 text-charcoal" />
                      </span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Aligned White Pill CTA Button */}
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className={`w-full py-3 px-5 rounded-full ${theme.pillBtnBg} font-bold text-xs uppercase tracking-wider border shadow-editorial hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:translate-x-1 active:translate-y-1 text-center`}
                  >
                    Enroll in {course.name}
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
