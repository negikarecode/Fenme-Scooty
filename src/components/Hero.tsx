import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { ScooterIcon, HelmetIcon, MapPinIcon, PhoneIcon, WhatsAppIcon, CheckIcon, ShieldCheckIcon } from './Icons';

interface CallbackFormData {
  fullName: string;
  phone: string;
  city: string;
  course: string;
  notes: string;
}

export const Hero: React.FC = () => {
  const [formData, setFormData] = useState<CallbackFormData>({
    fullName: '',
    phone: '',
    city: 'Delhi',
    course: '7-days-basic',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone' && phoneError) {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    setSubmitting(true);
    // Simulate instantaneous, reliable submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Femme Scooty team! My name is ${formData.fullName || 'Student'}, looking for ${formData.course === '7-days-basic' ? '7 Days Basic Course' : formData.course === '4-days-advance' ? '4 Days Advance Course' : 'RTO Refresher'} in ${formData.city}. Contact: ${formData.phone}. Note: ${formData.notes || 'Looking for slot details.'}`
    );
    window.open(`https://wa.me/919625695363?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full bg-graph-grid border-b border-charcoal/10 overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Decorative Minimal Line-Art Motifs (Replacing cherries/disco stickers) */}
      <div className="hidden lg:block absolute top-12 left-8 z-0 pointer-events-none opacity-80">
        <div className="tape-badge bg-sky-100 text-charcoal -rotate-3">
          <MapPinIcon className="w-3.5 h-3.5 text-charcoal" />
          <span>DOORSTEP PRACTICE LANES</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline, Hinglish Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Tape Tag Badge Cluster */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="tape-badge bg-sky-200 text-charcoal rotate-1">
                <ScooterIcon className="w-3.5 h-3.5" />
                <span>100% FEMALE GUIDED • EST. 2024</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-200 text-charcoal text-xs font-bold uppercase tracking-wider border border-charcoal/20">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                <span>Delhi & NCR's Trusted</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-200 text-charcoal text-xs font-bold uppercase tracking-wider border border-charcoal/20">
                <HelmetIcon className="w-3.5 h-3.5 text-blush-700" />
                <span>Zero Cycling Balance Required</span>
              </span>
            </div>

            {/* Mixed Sans + Editorial Serif Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-charcoal tracking-tight leading-[1.15]">
                <span className="font-sans">the modern </span>
                <span className="relative inline-block px-1">
                  <span className="relative z-10 font-sans font-extrabold text-charcoal">
                    women-only
                  </span>
                  <span
                    className="absolute inset-x-0 bottom-1.5 sm:bottom-2.5 h-3.5 sm:h-5 bg-blush-300 -rotate-1 rounded-sm -z-0"
                    aria-hidden="true"
                  />
                </span>
                <span className="block font-sans">scooty academy</span>
                <span className="block font-serif font-bold italic text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-1 tracking-normal">
                  for two-wheel freedom.
                </span>
              </h1>
            </div>

            {/* Hinglish Tagline Box */}
            <div className="p-4 sm:p-5 rounded-card bg-cream-100/90 border border-charcoal/15 shadow-soft max-w-xl">
              <p className="font-serif italic font-semibold text-lg sm:text-xl text-charcoal leading-snug">
                "{siteData.brand.subTagline}"
              </p>
              <p className="mt-2 text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
                {siteData.brand.heroSubtext}
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
              {/* Call CTA */}
              <a
                href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-charcoal text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-editorial hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none hover:bg-charcoal-muted transition-all active:translate-x-1 active:translate-y-1"
              >
                <PhoneIcon className="w-4 h-4 text-blush-300" />
                <span>Call {siteData.brand.formattedPhone}</span>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={siteData.brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-blush-200 text-charcoal font-bold text-xs sm:text-sm uppercase tracking-wider border border-charcoal shadow-editorial hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none hover:bg-blush-300 transition-all active:translate-x-1 active:translate-y-1"
              >
                <WhatsAppIcon className="w-4 h-4 text-charcoal" />
                <span>Book on WhatsApp</span>
              </a>
            </div>

            {/* Trust Pill Indicators */}
            <div className="pt-2 grid grid-cols-3 gap-3 max-w-lg border-t border-charcoal/10">
              <div className="text-left">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-charcoal">1000+</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal/70 uppercase tracking-wide">Riders Trained</span>
              </div>
              <div className="text-left border-l border-charcoal/15 pl-3">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-charcoal">16 to 60</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal/70 uppercase tracking-wide">Age Range</span>
              </div>
              <div className="text-left border-l border-charcoal/15 pl-3">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-charcoal">6 Cities</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal/70 uppercase tracking-wide">Safe Localities</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Callback Form Card */}
          <div className="lg:col-span-5" id="hero-booking-form">
            <div className="bg-white rounded-card border-2 border-charcoal p-6 sm:p-7 shadow-elevated relative">
              
              {/* Form Corner Tag Motif */}
              <div className="absolute -top-3.5 right-6">
                <span className="tape-badge bg-blush-300 text-charcoal font-bold text-[11px]">
                  FAST INQUIRY
                </span>
              </div>

              {!submitted ? (
                <>
                  <div className="mb-5 space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-charcoal/60">
                      Zero Pressure Inquiry
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-charcoal">
                      Request a Callback
                    </h3>
                    <p className="text-xs text-charcoal/75">
                      Bas 2 minute ka form – Scooty seekhne ka pehla step!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                        Your Full Name <span className="text-blush-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal/30 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal text-sm text-charcoal placeholder-charcoal/40 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                        WhatsApp / Mobile Number <span className="text-blush-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-charcoal/60 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="98765 43210"
                          maxLength={14}
                          className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border ${
                            phoneError ? 'border-red-500' : 'border-charcoal/30'
                          } bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal text-sm text-charcoal placeholder-charcoal/40 transition-colors`}
                        />
                      </div>
                      {phoneError && (
                        <p className="mt-1 text-xs text-red-600 font-semibold">{phoneError}</p>
                      )}
                    </div>

                    {/* City Select */}
                    <div>
                      <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                        Select Your City <span className="text-blush-600">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal/30 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal text-sm text-charcoal appearance-none transition-colors"
                        >
                          {siteData.cities.map((city) => (
                            <option key={city.id} value={city.name}>
                              {city.name} ({city.state})
                            </option>
                          ))}
                        </select>
                        <span className="absolute right-3.5 top-3.5 pointer-events-none text-charcoal/60">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Course Select */}
                    <div>
                      <label htmlFor="course" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                        Choose Course
                      </label>
                      <div className="relative">
                        <select
                          id="course"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal/30 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-charcoal text-sm text-charcoal appearance-none transition-colors"
                        >
                          <option value="7-days-basic">7 Days Basic Course (Zero Balance / Beginner)</option>
                          <option value="4-days-advance">4 Days Advance Course (Traffic & Slopes)</option>
                          <option value="rto-weekend-refresher">RTO Test & Weekend Refresher</option>
                        </select>
                        <span className="absolute right-3.5 top-3.5 pointer-events-none text-charcoal/60">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* High-Contrast Charcoal Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 py-3.5 px-6 rounded-full bg-charcoal hover:bg-blush-600 text-cream-50 font-bold text-xs uppercase tracking-widest border border-charcoal shadow-editorial hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:translate-x-1 active:translate-y-1 focus:outline-none flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <CheckIcon className="w-4 h-4 text-sage-300" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-charcoal/60 pt-1">
                      Our female coordinator will call or WhatsApp within 30 minutes.
                    </p>
                  </form>
                </>
              ) : (
                /* Submission Confirmation State with direct WhatsApp dispatch option */
                <div className="py-6 px-2 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-sage-200 border border-charcoal/20 flex items-center justify-center mx-auto text-charcoal">
                    <CheckIcon className="w-6 h-6 text-charcoal" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-charcoal">Thank You, {formData.fullName}!</h4>
                    <p className="mt-1 text-xs text-charcoal/80 leading-relaxed">
                      We have received your callback request for the <strong>{formData.city}</strong> center.
                    </p>
                  </div>

                  <div className="p-3 bg-cream-100 rounded-lg border border-charcoal/10 text-xs text-left space-y-1">
                    <div><span className="font-bold">City:</span> {formData.city}</div>
                    <div><span className="font-bold">Contact:</span> +91 {formData.phone}</div>
                    <div><span className="font-bold">Program:</span> {formData.course === '7-days-basic' ? '7 Days Basic' : formData.course === '4-days-advance' ? '4 Days Advance' : 'RTO Refresher'}</div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full py-3 px-4 rounded-full bg-blush-300 hover:bg-blush-400 text-charcoal font-bold text-xs uppercase tracking-wider border border-charcoal flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-charcoal/70 underline hover:text-charcoal block mx-auto pt-1"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
