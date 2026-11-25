import React, { useState } from 'react';
import { SiteData } from '../data/siteData';
import { PhoneIcon } from './Icons';

interface HeaderProps {
  data: SiteData;
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const heroForm = document.getElementById('hero-booking-form');
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: 'smooth' });
        const nameInput = heroForm.querySelector('input') as HTMLInputElement | null;
        if (nameInput) nameInput.focus();
      }
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-charcoal/10 transition-all">
      <div className="w-full px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Part 1: Left Logo Container (flex-1 shrink-0) */}
        <div className="flex-1 flex items-center shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="group flex items-baseline focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal rounded shrink-0"
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-charcoal whitespace-nowrap">
              {data.brand.wordmark}
            </span>
          </a>
        </div>

        {/* Part 2: True Dead-Center Nav Links */}
        <nav className="hidden lg:flex items-center justify-center gap-6 lg:gap-8 shrink-0" aria-label="Primary Navigation">
          {data.navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xs lg:text-sm font-bold text-charcoal/80 hover:text-charcoal transition-colors focus:outline-none whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Part 3: Right Actions Container (flex-1 justify-end with Book CTA) */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-3.5 xl:gap-4 shrink-0">
          <button
            onClick={handleBookClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 bg-charcoal hover:bg-blush-600"
          >
            <span className="w-2 h-2 rounded-full bg-blush-300"></span>
            <span>Book a Slot</span>
          </button>
        </div>

        {/* Mobile Actions (< lg) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={handleBookClick}
            className="px-3.5 py-1.5 rounded-full bg-charcoal text-white font-bold text-xs whitespace-nowrap"
          >
            Book
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-charcoal hover:bg-cream-200 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-charcoal/15 px-5 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {data.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-sm font-bold text-charcoal border-b border-charcoal/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={`tel:${data.brand.phone.replace(/\s+/g, '')}`}
              className="w-full text-center py-2.5 rounded-full border border-charcoal/20 text-charcoal font-bold text-xs bg-white flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              Call: {data.brand.formattedPhone}
            </a>

            <button
              onClick={handleBookClick}
              className="w-full text-center py-2.5 rounded-full bg-charcoal text-white font-bold text-xs shadow-xs"
            >
              Book a Slot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
