import React, { useState, useEffect } from 'react';
import { PhoneIcon, WhatsAppIcon, ArrowUpIcon } from './Icons';

interface FloatingActionsProps {
  phone: string;
  whatsappUrl: string;
  isMen?: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  phone,
  whatsappUrl,
  isMen = false,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const footer = document.querySelector('footer');
    let observer: IntersectionObserver | null = null;
    if (footer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setFooterVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(footer);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isVisible = showScrollTop && !footerVisible;

  return (
    <>
      {/* Floating Scroll-to-Top Button with safe offset and footer auto-hide */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className={`fixed bottom-24 sm:bottom-10 right-5 sm:right-8 z-40 w-11 h-11 rounded-full bg-charcoal text-cream-50 ${
          isMen ? 'hover:bg-slateBlue-600' : 'hover:bg-blush-600'
        } border border-charcoal/30 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none ${
          isVisible
            ? 'opacity-100 pointer-events-auto translate-y-0 hover:scale-105 active:scale-95'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <ArrowUpIcon className="w-5 h-5 text-white" />
      </button>

      {/* Sticky Mobile Bottom Action Bar (One-tap Call & WhatsApp) */}
      <aside aria-label="Quick contact" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal/20 px-3 py-2.5 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Quick Call */}
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex-1 py-3 px-3 rounded-full bg-charcoal text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
          >
            <PhoneIcon className={`w-4 h-4 ${isMen ? 'text-slateBlue-300' : 'text-blush-300'}`} />
            <span>Call Karein</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 py-3 px-3 rounded-full font-bold text-xs uppercase tracking-wider border border-charcoal/20 flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform ${
              isMen
                ? 'bg-slateBlue-100 text-charcoal'
                : 'bg-blush-200 text-charcoal'
            }`}
          >
            <WhatsAppIcon className="w-4 h-4 text-charcoal" />
            <span>WhatsApp Karein</span>
          </a>
        </div>
      </aside>
    </>
  );
};
