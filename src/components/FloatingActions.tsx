import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';
import { PhoneIcon, WhatsAppIcon, ArrowUpIcon } from './Icons';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 w-11 h-11 rounded-full bg-charcoal text-cream-50 hover:bg-blush-600 border border-charcoal/30 flex items-center justify-center shadow-elevated transition-all hover:scale-105 active:scale-95 focus:outline-none"
        >
          <ArrowUpIcon className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Sticky Mobile Bottom Action Bar (One-tap Call & WhatsApp) */}
      <aside aria-label="Quick contact" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal/20 px-3 py-2 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Quick Call */}
          <a
            href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
            className="flex-1 py-2.5 px-3 rounded-full bg-charcoal text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-blush-300" />
            <span>Call Now</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            href={siteData.brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-full bg-blush-200 text-charcoal font-bold text-xs uppercase tracking-wider border border-charcoal/40 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-charcoal" />
            <span>WhatsApp</span>
          </a>
        </div>
      </aside>
    </>
  );
};
