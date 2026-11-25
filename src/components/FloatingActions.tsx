import React, { useState, useEffect } from 'react';
import { PhoneIcon, WhatsAppIcon, ArrowUpIcon } from './Icons';

interface FloatingActionsProps {
  phone: string;
  whatsappUrl: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  phone,
  whatsappUrl,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button only after scrolling past hero (scrollY > 300) to prevent hero card overlap
      setShowWhatsApp(window.scrollY > 300);
      setShowScrollTop(window.scrollY > 400);
    };

    // Initial check on mount
    handleScroll();

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

  const isScrollTopVisible = showScrollTop && !footerVisible;

  // Pre-filled message for Ladies Scooty Training
  const defaultMessage = "Hi Femme Scooty, mujhe Ladies Scooty Training ke baare mein jaankari chahiye.";

  const targetWhatsappUrl =
    whatsappUrl ||
    `https://wa.me/919625695363?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <>
      {/* 1. Compact, Clean Floating WhatsApp Button - Visible after scrolling past Hero (scrollY > 300) */}
      <a
        href={targetWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        id="floating-whatsapp-btn"
        className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold text-sm sm:text-base group active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 ${
          showWhatsApp
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline whitespace-nowrap tracking-wide font-sans text-sm">WhatsApp Us</span>
      </a>

      {/* 2. Floating Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        id="floating-scroll-top-btn"
        className={`fixed bottom-36 sm:bottom-20 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-charcoal text-cream-50 hover:bg-blush-600 border border-charcoal/30 flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none ${
          isScrollTopVisible
            ? 'opacity-100 pointer-events-auto translate-y-0 hover:scale-105 active:scale-95'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <ArrowUpIcon className="w-5 h-5 text-white" />
      </button>

      {/* 3. Sticky Mobile Bottom Action Bar (One-tap Call & WhatsApp) */}
      <aside aria-label="Quick contact" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal/20 px-3 py-2.5 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Quick Call */}
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex-1 py-3 px-3 rounded-full bg-charcoal text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
          >
            <PhoneIcon className="w-4 h-4 text-blush-300" />
            <span>Call Now</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            href={targetWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-3 rounded-full font-bold text-xs uppercase tracking-wider border border-charcoal/20 flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform bg-blush-200 text-charcoal"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-700" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </aside>
    </>
  );
};
