import React, { useState, useRef, useEffect } from 'react';
import { SiteData } from '../data/siteData';
import { PhoneIcon, ChevronDownIcon, CheckIcon } from './Icons';

interface HeaderProps {
  data: SiteData;
  isMen?: boolean;
  onOpenBooking?: () => void;
  onSwitchGender?: () => void;
  onSelectGender?: (gender: 'women' | 'men') => void;
  onOpenGenderModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  isMen = false,
  onOpenBooking,
  onSwitchGender,
  onSelectGender,
  onOpenGenderModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(target)) {
        setMobileDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const handleSelectMode = (gender: 'women' | 'men') => {
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
    if (onSelectGender) {
      onSelectGender(gender);
    } else if ((gender === 'men' && !isMen) || (gender === 'women' && isMen)) {
      if (onSwitchGender) onSwitchGender();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-charcoal/10 transition-all">
      <div className="w-full px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Part 1: Left Logo Container (flex-1 shrink-0) */}
          <div className="flex-1 flex items-center shrink-0">
            <a
              href={isMen ? '/men' : '/'}
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

          {/* Part 3: Right Actions Container (flex-1 justify-end with Gender Dropdown + Book CTA) */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-3.5 xl:gap-4 shrink-0">
            {/* Clean & Centered Gender Dropdown Pill (No dot inside, centered text + chevron) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-colors shadow-xs whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-charcoal/20 ${
                  isMen
                    ? 'bg-slateBlue-100 hover:bg-slateBlue-200 text-charcoal border-slateBlue-300'
                    : 'bg-blush-100 hover:bg-blush-200 text-charcoal border-blush-300'
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                id="wing-dropdown-button"
              >
                <span className="leading-none">{isMen ? 'Men (Purush)' : 'Women (Mahila)'}</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 shrink-0 text-charcoal/70 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-charcoal/10 py-1.5 z-50"
                  role="menu"
                  aria-labelledby="wing-dropdown-button"
                >
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal/50 border-b border-charcoal/5">
                    Select Training Wing
                  </div>

                  {/* Option 1: Women (Mahila) */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelectMode('women')}
                    className={`w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                      !isMen
                        ? 'bg-blush-50 text-charcoal'
                        : 'text-charcoal/80 hover:bg-cream-100 hover:text-charcoal'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blush-500 shrink-0" />
                      <span>Women (Mahila)</span>
                    </div>
                    {!isMen && <CheckIcon className="w-4 h-4 text-blush-600 shrink-0" />}
                  </button>

                  {/* Option 2: Men (Purush) */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelectMode('men')}
                    className={`w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between transition-colors ${
                      isMen
                        ? 'bg-slateBlue-50 text-charcoal'
                        : 'text-charcoal/80 hover:bg-cream-100 hover:text-charcoal'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slateBlue-600 shrink-0" />
                      <span>Men (Purush)</span>
                    </div>
                    {isMen && <CheckIcon className="w-4 h-4 text-slateBlue-600 shrink-0" />}
                  </button>
                </div>
              )}
            </div>

            {/* Book a Slot CTA */}
            <button
              onClick={handleBookClick}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 ${
                isMen ? 'bg-charcoal hover:bg-slateBlue-600' : 'bg-charcoal hover:bg-blush-600'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isMen ? 'bg-slateBlue-300' : 'bg-blush-300'}`}></span>
              <span>Book a Slot</span>
            </button>
          </div>

          {/* Mobile Actions (< lg) */}
          <div className="flex lg:hidden items-center gap-2.5">
            {/* Mobile Wing Dropdown (No dot, clean centered) */}
            <div className="relative" ref={mobileDropdownRef}>
              <button
                type="button"
                onClick={() => setMobileDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  isMen
                    ? 'bg-slateBlue-100 text-charcoal border-slateBlue-300'
                    : 'bg-blush-100 text-charcoal border-blush-300'
                }`}
              >
                <span className="leading-none">{isMen ? 'Men' : 'Women'}</span>
                <ChevronDownIcon className="w-3 h-3 shrink-0 text-charcoal/70" />
              </button>

              {mobileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-charcoal/10 py-1 z-50">
                  <button
                    type="button"
                    onClick={() => handleSelectMode('women')}
                    className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between ${
                      !isMen ? 'bg-blush-50 text-charcoal' : 'text-charcoal/80'
                    }`}
                  >
                    <span>Women (Mahila)</span>
                    {!isMen && <CheckIcon className="w-3.5 h-3.5 text-blush-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectMode('men')}
                    className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between ${
                      isMen ? 'bg-slateBlue-50 text-charcoal' : 'text-charcoal/80'
                    }`}
                  >
                    <span>Men (Purush)</span>
                    {isMen && <CheckIcon className="w-3.5 h-3.5 text-slateBlue-600" />}
                  </button>
                </div>
              )}
            </div>

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
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSelectMode(isMen ? 'women' : 'men');
                }}
                className={`w-full py-2.5 rounded-full border text-charcoal font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs ${
                  isMen ? 'bg-blush-100 border-blush-300' : 'bg-slateBlue-100 border-slateBlue-300'
                }`}
              >
                <span>{isMen ? 'Switch to Women (Mahila) Version' : 'Switch to Men (Purush) Version'}</span>
              </button>

              {onOpenGenderModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGenderModal();
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-charcoal/70 underline"
                >
                  Switch Version (Mahila / Purush Modal)
                </button>
              )}

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
