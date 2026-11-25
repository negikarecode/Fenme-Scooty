import React from 'react';
import { SiteData } from '../data/siteData';
import { PhoneIcon, WhatsAppIcon, MapPinIcon } from './Icons';

interface FooterProps {
  data: SiteData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#FDF0F3] border-t border-charcoal/20">
      {/* 4-Column Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand Wordmark & Blurb */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-extrabold tracking-tight text-charcoal">
                {data.brand.wordmark}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-blush-400" />
            </div>

            <p className="text-sm text-charcoal/85 leading-relaxed font-sans pr-4">
              {data.brand.aboutBlurbFooter}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="clean-badge bg-white text-charcoal font-bold text-xs">
                EST. 2024 • 1,000+ TRAINED
              </span>
              <span className="clean-badge bg-sage-200 text-charcoal font-bold text-xs">
                6 CITIES
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/15 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-charcoal/80">
              {data.navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="hover:text-charcoal hover:underline transition-colors focus:outline-none text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Active Training Cities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/15 pb-2">
              Training Cities (6 Shehar)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-charcoal/80">
              {data.cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleScroll('#locations')}
                  className="text-left hover:text-charcoal flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  <MapPinIcon className="w-3.5 h-3.5 shrink-0 text-blush-600" />
                  <span>{city.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-charcoal/70 pt-1">
              Doorstep training arranged on safe, low-traffic neighborhood lanes.
            </p>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-charcoal border-b border-charcoal/15 pb-2">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-charcoal/90">
              <div>
                <a
                  href={`tel:${data.brand.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 font-bold hover:underline"
                >
                  <PhoneIcon className="w-4 h-4 shrink-0 text-blush-700" />
                  <span>Call: {data.brand.formattedPhone}</span>
                </a>
              </div>

              <div>
                <a
                  href={data.brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold hover:underline text-emerald-800"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>WhatsApp: {data.brand.formattedPhone}</span>
                </a>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white border border-charcoal/20 text-xs font-bold text-charcoal hover:bg-cream-100 transition-colors shadow-xs"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white border border-charcoal/20 text-xs font-bold text-charcoal hover:bg-cream-100 transition-colors shadow-xs"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Dark Charcoal Copyright Bar - Without any Wing labels */}
      <div className="w-full bg-charcoal text-cream-50 py-5 px-4 sm:px-6 lg:px-8 border-t border-charcoal/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-100/70">
          <p className="text-center sm:text-left">
            Copyright © 2026 Ladies Scooty Training Centre | Femme Scooty | All Rights Reserved
          </p>
          <p className="text-center sm:text-right font-medium text-cream-100/90">
            Powered by Ladies Scooty Training Centre | Femme Scooty
          </p>
        </div>
      </div>
    </footer>
  );
};
