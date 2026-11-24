import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { ScooterIcon, PhoneIcon } from './Icons';

interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
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
    <div className="w-full sticky top-0 z-50">
      {/* Top Pastel Blue Announcement Bar */}
      <aside aria-label="Announcement" className="w-full bg-sky-200 text-charcoal border-b border-sky-300/70 px-4 py-2 text-xs sm:text-sm font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/80 text-charcoal shadow-sm">
              <ScooterIcon className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold tracking-wide text-xs sm:text-sm">
              {siteData.announcement}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
            <span className="text-charcoal/75">6 Shehar: Delhi, Lucknow, Mathura, Jodhpur, Ghaziabad, Faridabad</span>
            <a
              href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
              className="font-bold hover:underline inline-flex items-center gap-1.5 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              {siteData.brand.formattedPhone}
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navigation Bar */}
      <header className="w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-charcoal/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Editorial Wordmark */}
          <a
            href="#"
            className="group flex items-baseline gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal rounded"
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-charcoal">
              {siteData.brand.wordmark}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-blush-400 group-hover:scale-125 transition-transform" />
          </a>

          {/* Desktop Nav Links in Simple Hinglish */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary Navigation">
            {siteData.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs lg:text-sm font-bold text-charcoal/80 hover:text-charcoal transition-colors focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Header Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
              className="text-xs sm:text-sm font-semibold text-charcoal hover:underline px-3 py-2 hidden lg:inline-flex items-center gap-1.5"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-blush-600" />
              <span>{siteData.brand.formattedPhone}</span>
            </a>

            <button
              onClick={handleBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal hover:bg-blush-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-blush-300"></span>
              <span>Slot Book Karein</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleBookClick}
              className="px-3.5 py-1.5 rounded-full bg-charcoal text-white font-bold text-xs"
            >
              Book Karein
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#FAF9F6] border-b border-charcoal/15 px-5 py-6 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3">
              {siteData.navLinks.map((link) => (
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
                href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
                className="w-full text-center py-2.5 rounded-full border border-charcoal/20 text-charcoal font-bold text-xs bg-white flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                Call: {siteData.brand.formattedPhone}
              </a>
              <button
                onClick={handleBookClick}
                className="w-full text-center py-2.5 rounded-full bg-charcoal text-white font-bold text-xs shadow-sm"
              >
                Slot Book Karein
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
