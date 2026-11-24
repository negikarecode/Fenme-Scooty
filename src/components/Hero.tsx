import React, { useState } from 'react';
import { SiteData } from '../data/siteData';
import { ScooterIcon, PhoneIcon, WhatsAppIcon, ShieldCheckIcon, CheckIcon } from './Icons';

interface CallbackFormData {
  fullName: string;
  phone: string;
  city: string;
  course: string;
}

interface HeroProps {
  data: SiteData;
  isMen?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ data, isMen = false }) => {
  const [formData, setFormData] = useState<CallbackFormData>({
    fullName: '',
    phone: '',
    city: 'Delhi',
    course: '7-days-basic',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Femme Scooty! My name is ${formData.fullName || 'Student'}, interested in ${
        formData.course === '7-days-basic' ? '7 Days Basic Course' : '4 Days Advance Course'
      } in ${formData.city}. Phone: ${formData.phone || 'NA'}. Version: ${isMen ? 'Men' : 'Women'}.`
    );
    window.open(`https://wa.me/919625695363?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full bg-graph-grid border-b border-charcoal/10 overflow-hidden py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 50-50 English/Hinglish Headline, Subtext & Obvious CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Clean Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span
                className={`clean-badge ${
                  isMen
                    ? 'bg-slateBlue-100 text-charcoal border-slateBlue-300'
                    : 'bg-blush-100 text-charcoal border-blush-300'
                }`}
              >
                <ScooterIcon className={`w-3.5 h-3.5 ${isMen ? 'text-slateBlue-700' : 'text-blush-700'}`} />
                <span>{isMen ? 'Experienced Male Trainers' : '100% Female Trainers'}</span>
              </span>

              <span className="clean-badge bg-sage-100 text-charcoal border-sage-300">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-sage-700" />
                <span>Ghar Ke Paas Training</span>
              </span>

              <span className="clean-badge bg-sky-100 text-charcoal border-sky-300">
                <span>Free Scooty & Petrol</span>
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.18]">
                <span>Learn Scooty With Confidence — </span>
                <span className="relative inline-block px-1">
                  <span className="relative z-10 font-serif italic text-charcoal">
                    Ab Bina Dar
                  </span>
                  <span
                    className={`absolute inset-x-0 bottom-1 sm:bottom-2 h-3 sm:h-4 rounded-sm -z-0 ${
                      isMen ? 'bg-slateBlue-200' : 'bg-blush-200'
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <span className="block mt-1">Chalayein!</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg font-semibold text-charcoal/80 pt-1">
                {data.brand.heroSubtext}
              </p>

              {/* Reassuring Note for Middle-Aged First-Timers */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-charcoal/10 shadow-sm max-w-xl">
                <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed font-sans">
                  {data.brand.heroReassurance}
                </p>
              </div>
            </div>

            {/* Big Obvious Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
              {/* Call CTA */}
              <a
                href={`tel:${data.brand.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-charcoal hover:bg-charcoal-muted text-white font-bold text-base shadow-sm hover:shadow transition-all"
              >
                <PhoneIcon className={`w-5 h-5 ${isMen ? 'text-slateBlue-300' : 'text-blush-300'}`} />
                <span>Call Now: {data.brand.formattedPhone}</span>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={data.brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-charcoal font-bold text-base border transition-all shadow-sm hover:shadow ${
                  isMen
                    ? 'bg-slateBlue-100 hover:bg-slateBlue-200 border-slateBlue-300'
                    : 'bg-blush-200 hover:bg-blush-300 border-charcoal/15'
                }`}
              >
                <WhatsAppIcon className="w-5 h-5 text-charcoal" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg border-t border-charcoal/10">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-extrabold text-charcoal">1000+</span>
                <span className="text-xs sm:text-sm font-semibold text-charcoal/70">
                  Students Trained
                </span>
              </div>
              <div className="border-l border-charcoal/15 pl-4">
                <span className="block text-2xl sm:text-3xl font-serif font-extrabold text-charcoal">16 to 60</span>
                <span className="text-xs sm:text-sm font-semibold text-charcoal/70">Ages Trained</span>
              </div>
              <div className="border-l border-charcoal/15 pl-4">
                <span className="block text-2xl sm:text-3xl font-serif font-extrabold text-charcoal">6 Cities</span>
                <span className="text-xs sm:text-sm font-semibold text-charcoal/70">Active Training</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Callback Form Card */}
          <div className="lg:col-span-5">
            <div
              id="hero-booking-form"
              className="bg-white rounded-2xl border border-charcoal/15 p-6 sm:p-8 shadow-md"
            >
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-sm ${
                      isMen ? 'bg-slateBlue-200 text-charcoal' : 'bg-sage-200 text-charcoal'
                    }`}
                  >
                    <CheckIcon className="w-7 h-7 text-charcoal" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    Thank You! (Dhanyawaad)
                  </h3>
                  <p className="text-base text-charcoal/80 max-w-xs mx-auto">
                    Your request has been received. Our training coordinator will call you back shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleWhatsAppDirect}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-charcoal font-bold text-sm shadow-sm transition-all ${
                        isMen ? 'bg-slateBlue-100 hover:bg-slateBlue-200' : 'bg-blush-200 hover:bg-blush-300'
                      }`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-charcoal" />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                      Request a Free Callback
                    </h3>
                    <p className="text-sm text-charcoal/70 mt-1">
                      Fill this quick 2-minute form and our coordinator will call you back.
                    </p>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-charcoal">
                      Your Name (Aapka Naam)
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50 text-sm sm:text-base text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-charcoal">
                      Mobile Number (+91)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      required
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50 text-sm sm:text-base text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-charcoal"
                    />
                    {phoneError && (
                      <p className="text-xs text-rose-600 font-semibold">{phoneError}</p>
                    )}
                  </div>

                  {/* City Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-charcoal">
                      Select City (Shehar Chunein)
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50 text-sm sm:text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                    >
                      {data.cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name} ({city.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-charcoal">
                      Select Course
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50 text-sm sm:text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                    >
                      {data.courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} ({course.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full mt-2 py-4 px-6 rounded-full text-white font-bold text-base shadow-sm hover:shadow transition-all disabled:opacity-60 flex items-center justify-center gap-2 ${
                      isMen ? 'bg-charcoal hover:bg-slateBlue-600' : 'bg-charcoal hover:bg-blush-600'
                    }`}
                  >
                    {submitting ? 'Sending Request...' : 'Request Callback'}
                  </button>

                  <p className="text-center text-xs text-charcoal/60 pt-1">
                    Your details are 100% confidential. No spam calls.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
