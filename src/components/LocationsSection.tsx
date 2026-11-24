import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { MapPinIcon, ScooterIcon } from './Icons';

export const LocationsSection: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('delhi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentCity = siteData.cities.find((c) => c.id === selectedCityId) || siteData.cities[0];

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
    <section id="locations" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 tape-badge bg-sky-200 text-charcoal mx-auto">
            <MapPinIcon className="w-3.5 h-3.5" />
            <span>LOCAL DOORSTEP HUBS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Locations
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 font-medium max-w-xl mx-auto leading-relaxed">
            Active across 6 major cities with zero commute hassle. Switch tabs to inspect training coverage in your neighborhood.
          </p>
        </div>

        {/* Interactive City Tabs (Scrollable on small screens) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {siteData.cities.map((city) => {
            const isActive = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                data-city-id={city.id}
                onClick={() => handleCitySelect(city.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shrink-0 border ${
                  isActive
                    ? 'bg-charcoal text-cream-50 border-charcoal shadow-editorial translate-x-0.5 translate-y-0.5'
                    : 'bg-white hover:bg-cream-100 text-charcoal border-charcoal/30 hover:border-charcoal'
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>

        {/* Selected City Interactive Display Card */}
        <div className="bg-white rounded-card border-2 border-charcoal shadow-elevated overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left/Top: City Photo & Quick Profile */}
            <div className="lg:col-span-5 bg-cream-100 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-charcoal/15">
              <div>
                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-charcoal/20 mb-5 relative group">
                  <img
                    src={currentCity.image}
                    alt={`${currentCity.name} Scooty Training`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="tape-badge bg-blush-200 text-charcoal font-bold text-[11px]">
                      {currentCity.name.toUpperCase()} HUB
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-3xl font-extrabold text-charcoal">
                      {currentCity.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-sage-200 border border-charcoal/20 text-xs font-bold text-charcoal">
                      {currentCity.hubs.length} Active Hubs
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                    {currentCity.state}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans pt-1">
                    {currentCity.description}
                  </p>
                </div>
              </div>

              {/* Call-to-action for current city */}
              <div className="mt-6 pt-5 border-t border-charcoal/15 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleBookInCity(currentCity.name)}
                  className="flex-1 py-3 px-4 rounded-full bg-charcoal hover:bg-blush-600 text-white font-bold text-xs uppercase tracking-wider shadow-editorial hover:shadow-none transition-all text-center"
                >
                  Book in {currentCity.name}
                </button>
                <a
                  href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
                  className="py-3 px-4 rounded-full bg-white border border-charcoal text-charcoal font-bold text-xs uppercase tracking-wider text-center hover:bg-cream-100 transition-colors"
                >
                  Call Coordinator
                </a>
              </div>
            </div>

            {/* Right/Bottom: Neighborhood Scannable Pill List with Instant Search */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col">
              
              {/* Header with Neighborhood Search Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h4 className="font-sans font-bold text-base text-charcoal">
                    Covered Neighborhoods & Localities
                  </h4>
                  <p className="text-xs text-charcoal/60">
                    Find your closest training corridor in {currentCity.name}
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search locality..."
                    className="w-full px-3.5 py-1.5 rounded-full border border-charcoal/30 bg-cream-50 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1.5 text-xs text-charcoal/60 hover:text-charcoal"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Scannable Pill / Tag Grid */}
              <div className="flex-1 max-h-[340px] overflow-y-auto pr-1">
                {filteredHubs.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredHubs.map((hub, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-50 hover:bg-blush-100 border border-charcoal/20 text-xs font-semibold text-charcoal transition-colors group cursor-default"
                      >
                        <ScooterIcon className="w-3 h-3 text-charcoal/60 group-hover:text-charcoal" />
                        <span>{hub}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-2">
                    <p className="text-xs font-bold text-charcoal/60">
                      No matching locality found for "{searchQuery}".
                    </p>
                    <p className="text-xs text-charcoal/70">
                      Don't worry! We cover all surrounding sectors in {currentCity.name}. Contact us to request custom lane training.
                    </p>
                  </div>
                )}
              </div>

              {/* Informative Note */}
              <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center gap-2 text-[11px] text-charcoal/70 font-medium">
                <span className="w-2 h-2 rounded-full bg-sage-400 shrink-0" />
                <span>Female trainer arrives directly at your chosen neighborhood location. Free scooter & fuel provided.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
