import React from 'react';
import { siteData } from '../data/siteData';
import { ScooterIcon } from './Icons';

export const MarqueeTicker: React.FC = () => {
  // Repeat items for seamless continuous ticker
  const items = [...siteData.tickerItems, ...siteData.tickerItems, ...siteData.tickerItems];

  return (
    <div className="w-full bg-sage-300 border-y border-charcoal/20 py-3 sm:py-3.5 overflow-hidden select-none">
      <div className="animate-ticker flex items-center">
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center space-x-4 sm:space-x-6 shrink-0 px-4 sm:px-6">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-charcoal">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal/60 shrink-0" />
            <ScooterIcon className="w-4 h-4 text-charcoal/80 shrink-0 inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
