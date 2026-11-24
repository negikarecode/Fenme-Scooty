import React, { useState } from 'react';
import { SiteData } from '../data/siteData';
import { MapPinIcon } from './Icons';

interface LocationsSectionProps {
  data: SiteData;
  isMen?: boolean;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ data, isMen = false }) => {
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
    <section id="locations" className="w-full py-16 sm:py-24 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div
            className={`inline-flex items-center gap-1.5 clean-badge ${
              isMen
                ? 'bg-slateBlue-100 text-charcoal border-slateBlue-300'
                : 'bg-sky-100 text-charcoal border-sky-300'
            } mx-auto`}
          >
            <MapPinIcon className="w-3.5 h-3.5" />
            <span>Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
            Our Training Cities — Hum Kahan Sikhate Hain?
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-medium max-w-xl mx-auto leading-relaxed">
            Active across 6 major cities with convenient doorstep neighborhood practice.
          </p>
        </div>

        {/* Interactive City Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {data.cities.map((city) => {
            const isActive = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                data-city-id={city.id}
                onClick={() => handleCitySelect(city.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all shrink-0 border ${
                  isActive
                    ? 'bg-charcoal text-cream-50 border-charcoal shadow-sm'
                    : 'bg-white hover:bg-cream-100 text-charcoal border-charcoal/20'
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>

        {/* Selected City Interactive Display Card */}
        <div className="bg-white rounded-2xl border border-charcoal/15 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left/Top: City Photo & Quick Profile */}
            <div className="lg:col-span-5 bg-cream-100 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-charcoal/15">
              <div>
                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-charcoal/15 mb-5 relative group">
                  <img
                    src={currentCity.image}
                    alt={`${currentCity.name} Scooter Training Hub`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="clean-badge bg-white/90 text-charcoal font-bold text-xs shadow-xs">
                      {currentCity.name} Hub
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-3xl font-extrabold text-charcoal">
                      {currentCity.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-sage-200 border border-charcoal/15 text-xs font-bold text-charcoal">
                      {currentCity.hubs.length} Active Hubs
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                    {currentCity.state}
                  </p>
                  <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans pt-1">
                    {currentCity.description}
                  </p>
                </div>
              </div>

              {/* Call-to-action for current city */}
              <div className="mt-6 pt-5 border-t border-charcoal/15 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleBookInCity(currentCity.name)}
                  className={`flex-1 py-3.5 px-4 rounded-full text-white font-bold text-xs sm:text-sm shadow-sm transition-all text-center ${
                    isMen ? 'bg-charcoal hover:bg-slateBlue-600' : 'bg-charcoal hover:bg-blush-600'
                  }`}
                >
                  Book in {currentCity.name}
                </button>
                <a
                  href={`tel:${data.brand.phone.replace(/\s+/g, '')}`}
                  className="py-3.5 px-4 rounded-full bg-white border border-charcoal/20 text-charcoal font-bold text-xs sm:text-sm text-center hover:bg-cream-100 transition-colors"
                >
                  Call City Coordinator
                </a>
              </div>
            </div>

            {/* Right/Bottom: Neighborhood Scannable Pill List with Instant Search */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col">
              
              {/* Header with Neighborhood Search Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h4 className="font-sans font-bold text-base sm:text-lg text-charcoal">
                    Covered Neighborhoods & Localities
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal/70">
                    Find your closest training corridor in {currentCity.name}
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your area (Apna area likhein)..."
                    className="w-full px-4 py-2 rounded-full border border-charcoal/25 bg-cream-50 text-xs sm:text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Localities Pill Grid */}
              <div className="flex-1 flex flex-wrap content-start gap-2 max-h-80 overflow-y-auto pr-2">
                {filteredHubs.length > 0 ? (
                  filteredHubs.map((hub, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBookInCity(currentCity.name)}
                      className={`group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream-100 border text-xs sm:text-sm font-medium text-charcoal transition-all text-left ${
                        isMen
                          ? 'hover:bg-slateBlue-100 border-charcoal/10 hover:border-slateBlue-300'
                          : 'hover:bg-blush-100 border-charcoal/10 hover:border-blush-300'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isMen ? 'bg-charcoal/30 group-hover:bg-slateBlue-600' : 'bg-charcoal/30 group-hover:bg-blush-600'
                        }`}
                      />
                      <span>{hub}</span>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center w-full space-y-2">
                    <p className="text-sm text-charcoal/70">
                      No listed locality matched "{searchQuery}".
                    </p>
                    <p className="text-xs text-charcoal/60">
                      Don't worry, we arrange practice on safe roads near your doorstep. Call or message us on WhatsApp.
                    </p>
                  </div>
                )}
              </div>

              {/* Doorstep Assurance Footnote */}
              <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs text-charcoal/70">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="w-3.5 h-3.5 text-sage-700" />
                  <span>Aapke ghar ke paas safe roads par 1-on-1 practical training</span>
                </span>
                <span className="font-semibold text-charcoal">
                  {filteredHubs.length} Localities
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
