import React, { useState } from 'react';
import { SiteData } from '../data/siteData';
import { MapPinIcon } from './Icons';

interface LocationsSectionProps {
  data: SiteData;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ data }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('delhi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCity = data.cities.find((c) => c.id === selectedCityId) || data.cities[0];

  const filteredHubs = currentCity.hubs.filter((hub) =>
    hub.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    setSearchQuery('');
  };

  const handleBookInCity = (cityName: string) => {
    const form = document.getElementById('hero-booking-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      const select = form.querySelector('select[name="city"]') as HTMLSelectElement | null;
      if (select) {
        select.value = cityName;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="locations" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 clean-badge bg-sky-100 text-charcoal border-sky-300 mx-auto shadow-xs">
            <MapPinIcon className="w-3.5 h-3.5 text-sky-700" />
            <span>Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Cities — Hum Kahan Sikhate Hain?
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            Active across 6 major cities with convenient doorstep neighborhood practice.
          </p>
        </div>

        {/* Interactive City Tabs with Smooth Sliding Transition */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar reveal-on-scroll">
          {data.cities.map((city) => {
            const isActive = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                data-city-id={city.id}
                onClick={() => handleCitySelect(city.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shrink-0 border active:scale-[0.98] ${
                  isActive
                    ? 'bg-charcoal text-cream-50 border-charcoal shadow-sm'
                    : 'bg-white hover:bg-cream-100 hover:scale-[1.02] text-charcoal border-charcoal/20'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blush-400 inline-block mr-1.5 -ml-0.5 animate-pulse" />
                )}
                <span>{city.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected City Interactive Display Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-charcoal/15 shadow-sm hover:shadow-md transition-shadow overflow-hidden reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left/Top: City Photo & Quick Profile with Frosted Glass Badge */}
            <div className="lg:col-span-5 bg-cream-100/70 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-charcoal/15">
              <div>
                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-charcoal/15 mb-5 relative group">
                  <img
                    src={currentCity.image}
                    alt={`${currentCity.name} Scooter Training Hub`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Frosted Glass Photo Overlay Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-white/85 border border-white/40 text-charcoal font-bold text-xs shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blush-500"></span>
                      <span>{currentCity.name} Hub</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    {currentCity.name}
                  </h3>
                  <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider">
                    {currentCity.state}
                  </p>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-sans pt-1">
                    {currentCity.description}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleBookInCity(currentCity.name)}
                  className="w-full py-3 px-5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 bg-charcoal hover:bg-blush-600"
                >
                  <MapPinIcon className="w-4 h-4 text-white" />
                  <span>Book Training in {currentCity.name}</span>
                </button>
              </div>
            </div>

            {/* Right/Bottom: Neighborhood Coverage Search & Grid */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-charcoal">
                      Covered Neighborhoods & Landmarks
                    </h4>
                    <p className="text-xs text-charcoal/70">
                      Showing {filteredHubs.length} training spots in {currentCity.name}
                    </p>
                  </div>

                  {/* Hub Search Input */}
                  <div className="w-full sm:w-60">
                    <input
                      type="text"
                      placeholder={`Search ${currentCity.name} areas...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-charcoal/20 bg-cream-50 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal font-medium transition-colors"
                    />
                  </div>
                </div>

                {/* Hubs Badge Grid */}
                {filteredHubs.length > 0 ? (
                  <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto pr-1">
                    {filteredHubs.map((hub, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 border border-charcoal/10 text-xs font-semibold text-charcoal transition-colors hover:scale-102"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40" />
                        <span>{hub}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center bg-cream-50 rounded-xl border border-charcoal/10">
                    <p className="text-xs sm:text-sm font-semibold text-charcoal/70">
                      Koi matching area nahi mila "{searchQuery}".
                    </p>
                    <p className="text-xs text-charcoal/50 mt-1">
                      Aap kisi bhi colony ke safe road par training book kar sakte hain.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Quick Help */}
              <div className="pt-6 mt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-charcoal/75">
                <span>📍 Safe colonies and low-traffic lanes used for first 3 days.</span>
                <a
                  href={data.brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-charcoal hover:text-emerald-700"
                >
                  Confirm my exact location on WhatsApp →
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 6 City Cards Overview at Bottom with Hover Lift */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8 reveal-on-scroll">
          {data.cities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city.id)}
              className="p-3 rounded-xl bg-white border border-charcoal/10 hover:border-charcoal/30 text-left transition-all duration-300 group shadow-xs hover:shadow-md hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="w-full h-16 rounded-lg overflow-hidden mb-2 bg-cream-100">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-charcoal truncate">
                {city.name}
              </h5>
              <p className="text-[11px] text-charcoal/60 truncate">
                {city.hubs.length} safe hubs
              </p>
              <span className="text-[11px] font-bold text-charcoal group-hover:text-blush-600 block mt-1 transition-colors">
                View areas →
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
