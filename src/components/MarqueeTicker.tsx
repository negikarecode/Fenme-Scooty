import React from 'react';
import { ScooterIcon } from './Icons';

interface MarqueeTickerProps {
  tickerItems?: string[];
  isMen?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  tickerItems = [
    "1,000+ MAHILAYEIN SEEKH CHUKI HAIN",
    "16 SE 60 SAAL TAK",
    "CYCLE AATI HO YA NAHI",
    "GHAR KE PAAS TRAINING",
    "100% MAHILA TRAINERS",
    "FREE SCOOTY AUR PETROL",
    "SUBSE AARAMDAAYAK MAHOL"
  ],
  isMen = false,
}) => {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div
      className={`w-full ${
        isMen ? 'bg-slateBlue-100 border-y border-slateBlue-200' : 'bg-sage-200 border-y border-charcoal/15'
      } py-3 sm:py-3.5 overflow-hidden select-none`}
    >
      <div className="animate-ticker flex items-center">
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center space-x-4 sm:space-x-6 shrink-0 px-4 sm:px-6">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-charcoal">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40 shrink-0" />
            <ScooterIcon className="w-4 h-4 text-charcoal/70 shrink-0 inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
