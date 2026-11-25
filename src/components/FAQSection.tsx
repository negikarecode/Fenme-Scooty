import React, { useState } from 'react';
import { SiteData } from '../data/siteData';
import { ChevronDownIcon } from './Icons';

interface FAQSectionProps {
  data: SiteData;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 clean-badge bg-blush-100 text-charcoal border-blush-300 mx-auto shadow-xs">
            <span>FAQs (Aam Sawal-Jawab)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Frequently Asked Questions — Aam Sawal-Jawab
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-lg mx-auto leading-relaxed">
            Common questions about our scooter training programs.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3.5 reveal-on-scroll">
          {data.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-xl border border-charcoal/15 overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-charcoal hover:bg-cream-50 transition-colors focus:outline-none active:scale-[0.99]"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-cream-100 text-charcoal/80 text-xs sm:text-sm flex items-center justify-center font-mono font-bold shrink-0 border border-charcoal/10 shadow-xs">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span
                    className={`transform transition-transform duration-200 shrink-0 text-charcoal/60 ${
                      isOpen ? 'rotate-180 text-charcoal' : ''
                    }`}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </span>
                </button>

                <div
                  className={`px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-charcoal/85 leading-relaxed font-sans border-t border-charcoal/10 bg-cream-50/40 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  <p className="pl-10">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassuring Help Banner */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl border border-charcoal/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-sky-100/80 shadow-xs hover:shadow-md transition-shadow reveal-on-scroll">
          <div>
            <h4 className="font-bold text-base text-charcoal">Have another question? (Koi aur sawal hai?)</h4>
            <p className="text-sm text-charcoal/80 mt-1">Chat directly with our head training coordinator on WhatsApp.</p>
          </div>
          <a
            href={data.brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-white font-bold text-sm tracking-wide shrink-0 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] bg-charcoal hover:bg-blush-600"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
