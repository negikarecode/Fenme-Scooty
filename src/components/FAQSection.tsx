import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { ChevronDownIcon, ScooterIcon } from './Icons';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 tape-badge bg-blush-200 text-charcoal mx-auto">
            <ScooterIcon className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS? WE HAVE ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 font-medium max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our women-only scooter training program before booking your first session.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3.5">
          {siteData.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-charcoal/20 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-charcoal hover:bg-cream-100/60 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cream-200 text-charcoal/70 text-xs flex items-center justify-center font-mono font-bold shrink-0">
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

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans border-t border-charcoal/10 bg-cream-50/50">
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-12 p-6 rounded-card bg-sky-100/80 border border-charcoal/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm text-charcoal">Have a specific question not listed here?</h4>
            <p className="text-xs text-charcoal/75 mt-0.5">Talk directly with our head training coordinator on WhatsApp.</p>
          </div>
          <a
            href={siteData.brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-charcoal hover:bg-blush-600 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
          >
            Chat with Coordinator
          </a>
        </div>

      </div>
    </section>
  );
};
