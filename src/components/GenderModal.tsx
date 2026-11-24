import React from 'react';
import { ScooterIcon } from './Icons';

interface GenderModalProps {
  isOpen: boolean;
  onSelect: (gender: 'women' | 'men') => void;
  onClose: () => void;
}

export const GenderModal: React.FC<GenderModalProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gender-modal-heading"
      className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl border border-charcoal/15 shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal p-2 rounded-full hover:bg-cream-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Eyebrow */}
        <div className="inline-flex items-center gap-1.5 clean-badge bg-cream-100 text-charcoal border-charcoal/15 mx-auto mb-3">
          <ScooterIcon className="w-3.5 h-3.5 text-charcoal" />
          <span>Femme Scooty Training</span>
        </div>

        {/* 50-50 Heading & Subtext */}
        <h2 id="gender-modal-heading" className="text-2xl sm:text-3xl font-serif font-extrabold text-charcoal tracking-tight leading-snug">
          Welcome! Who is the training for? / Aap kiske liye training dekh rahe hain?
        </h2>
        <p className="text-sm sm:text-base text-charcoal/75 mt-2 mb-6">
          Please choose your option (Apna option chunein):
        </p>

        {/* 2 Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {/* Option 1: Women (Mahila) */}
          <button
            onClick={() => onSelect('women')}
            className="w-full p-5 rounded-2xl bg-blush-50 hover:bg-blush-100 border-2 border-blush-300 text-left transition-all duration-200 group shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blush-400"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-blush-200 text-blush-800 flex items-center justify-center font-bold text-xs">
                ♀
              </span>
              <span className="text-[11px] font-bold text-blush-700 uppercase tracking-wider bg-blush-200/70 px-2 py-0.5 rounded-full">
                Ladies-Only
              </span>
            </div>
            <h3 className="text-lg font-bold text-charcoal group-hover:text-blush-800 transition-colors">
              Women (Mahila)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/80 mt-1 font-medium leading-relaxed">
              100% Female Trainers • Ladies-Only
            </p>
          </button>

          {/* Option 2: Men (Purush) */}
          <button
            onClick={() => onSelect('men')}
            className="w-full p-5 rounded-2xl bg-slateBlue-50 hover:bg-slateBlue-100 border-2 border-slateBlue-300 text-left transition-all duration-200 group shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slateBlue-400"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-slateBlue-200 text-slateBlue-800 flex items-center justify-center font-bold text-xs">
                ♂
              </span>
              <span className="text-[11px] font-bold text-slateBlue-700 uppercase tracking-wider bg-slateBlue-200/70 px-2 py-0.5 rounded-full">
                All Ages
              </span>
            </div>
            <h3 className="text-lg font-bold text-charcoal group-hover:text-slateBlue-800 transition-colors">
              Men (Purush)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/80 mt-1 font-medium leading-relaxed">
              Experienced Male Trainers • All Ages
            </p>
          </button>
        </div>

        {/* Small Clear Text Link at Bottom */}
        <div className="mt-6 pt-4 border-t border-charcoal/10 text-xs sm:text-sm text-charcoal/70">
          <p>
            You can switch between{' '}
            <button
              onClick={() => onSelect('women')}
              className="font-bold underline text-charcoal hover:text-blush-700 focus:outline-none"
            >
              Women
            </button>
            {' '}/{' '}
            <button
              onClick={() => onSelect('men')}
              className="font-bold underline text-charcoal hover:text-slateBlue-700 focus:outline-none"
            >
              Men
            </button>
            {' '}versions anytime (Aap kabhi bhi version badal sakte hain).
          </p>
        </div>

      </div>
    </div>
  );
};
