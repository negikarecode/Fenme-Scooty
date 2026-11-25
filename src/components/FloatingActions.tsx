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
      // Show desktop floating WhatsApp button after scrolling past hero (scrollY > 300)
      setShowWhatsApp(window.scrollY > 300);
      setShowScrollTop(window.scrollY > 400);
    };

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

  const cleanPhone = phone.replace(/\s+/g, '');

  return (
    <>
      {/* 1. Desktop Floating WhatsApp Button (hidden on < 768px / md:hidden; visible on md:flex after scrollY > 300) */}
      <a
        href={targetWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        id="floating-whatsapp-btn"
        className={`hidden md:flex fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center gap-2 font-bold text-sm group active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 ${
          showWhatsApp
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <WhatsAppIcon className="w-5 h-5 text-white shrink-0 group-hover:scale-110 transition-transform" />
        <span className="whitespace-nowrap tracking-wide font-sans text-sm">WhatsApp Us</span>
      </a>

      {/* 2. Floating Scroll-to-Top Button (hidden on mobile to keep sticky bar clean; visible on desktop) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        id="floating-scroll-top-btn"
        className={`hidden md:flex fixed bottom-20 right-6 z-40 w-11 h-11 rounded-full bg-charcoal text-cream-50 hover:bg-blush-600 border border-charcoal/30 items-center justify-center shadow-md transition-all duration-300 focus:outline-none ${
          isScrollTopVisible
            ? 'opacity-100 pointer-events-auto translate-y-0 hover:scale-105 active:scale-95'
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <ArrowUpIcon className="w-5 h-5 text-white" />
      </button>

      {/* 4. Sticky Mobile Bottom Action Bar (< 768px / md:hidden) */}
      <aside
        aria-label="Quick contact"
        id="mobile-bottom-action-bar"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal/20 px-3.5 py-2.5 shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          {/* Left: Call Now in dark charcoal */}
          <a
            href={`tel:${cleanPhone}`}
            id="mobile-call-btn"
            className="flex-1 py-3 px-3 rounded-full bg-charcoal hover:bg-charcoal/90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
          >
            <PhoneIcon className="w-4 h-4 text-blush-300" />
            <span>Call Now</span>
          </a>

          {/* Right: WhatsApp Us in WhatsApp green */}
          <a
            href={targetWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-whatsapp-btn"
            className="flex-1 py-3 px-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </aside>
    </>
  );
};
