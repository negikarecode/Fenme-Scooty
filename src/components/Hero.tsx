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
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
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
      } in ${formData.city}. Phone: ${formData.phone || 'NA'}.`
    );
    window.open(`https://wa.me/919625695363?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full bg-graph-grid border-b border-charcoal/10 overflow-hidden py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Subtext & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Clean Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="clean-badge bg-blush-100 text-charcoal border-blush-300">
                <ScooterIcon className="w-3.5 h-3.5 text-blush-700" />
                <span>100% Female Trainers</span>
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
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-blush-200/90 -rotate-1 rounded-sm -z-0" />
                </span>
                <span> Chalayein!</span>
              </h1>
              <p className="text-lg sm:text-xl text-charcoal/85 max-w-2xl font-sans font-medium leading-relaxed">
                {data.brand.heroSubtext}
              </p>
            </div>

            {/* Reassurance Callout Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-charcoal/15 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-charcoal font-bold text-sm sm:text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Cycle Aati Ho Ya Nahi — Seekhna Aasan Hai!</span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans pl-4 border-l-2 border-charcoal/20">
                {data.brand.heroReassurance}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <a
                href={`tel:${data.brand.phone.replace(/\s+/g, '')}`}
                className="px-7 py-3.5 rounded-full bg-charcoal text-cream-50 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:bg-charcoal/90 transition-all active:scale-[0.99]"
              >
                <PhoneIcon className="w-5 h-5 text-blush-300" />
                <span>Call Now: {data.brand.formattedPhone}</span>
              </a>

              <a
                href={data.brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:bg-emerald-800 transition-all active:scale-[0.99]"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-semibold text-charcoal/80">
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                <span>1,000+ Students Trained</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                <span>Ages 16 to 60</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                <span>6 Active Cities</span>
              </span>
            </div>

          </div>

          {/* Right Column: Clean Callback Card */}
          <div className="lg:col-span-5">
            <div
              id="hero-booking-form"
              className="bg-white rounded-3xl border-2 border-charcoal/15 shadow-xl p-6 sm:p-8 relative"
            >
              {/* Card Header */}
              <div className="mb-6 space-y-1 text-center">
                <span className="clean-badge bg-sage-200 text-charcoal mx-auto mb-2 text-xs font-bold">
                  Quick Callback (Turant Jankari)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
                  Request a Free Callback
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 font-sans">
                  Batch slots, fees aur nearest training location ki poori jaankari paayein.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckIcon className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-charcoal">
                    Thank You, {formData.fullName || 'Rider'}!
                  </h4>
                  <p className="text-sm text-charcoal/80 max-w-xs mx-auto">
                    Hamare senior coordinator aapko agle 15-30 minute ke andar call karke poori jaankari denge.
                  </p>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Want instant reply? Chat on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-charcoal/60 underline hover:text-charcoal block mx-auto pt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                      Your Full Name (Aapka Naam) *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50/50 text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent font-medium"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                      Phone Number (Mobile No.) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-sm font-bold text-charcoal/60 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border ${
                          phoneError ? 'border-red-500 bg-red-50/30' : 'border-charcoal/20 bg-cream-50/50'
                        } text-charcoal placeholder-charcoal/40 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal font-medium`}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-xs text-red-600 mt-1 font-semibold">{phoneError}</p>
                    )}
                  </div>

                  {/* City Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                      Your City (Aapka Shehar) *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50/50 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-charcoal font-medium cursor-pointer"
                    >
                      {data.cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name} ({city.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course Interested In */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                      Course Interested In (Kaunsa Course?)
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-cream-50/50 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-charcoal font-medium cursor-pointer"
                    >
                      {data.courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} ({course.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm tracking-wide shadow-md transition-all active:scale-[0.99] disabled:opacity-75 bg-charcoal hover:bg-blush-600"
                    >
                      {submitting ? 'Sending Request...' : 'Get Callback & Fee Details'}
                    </button>
                  </div>

                  {/* Or WhatsApp Directly */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full py-2.5 px-4 rounded-xl border border-charcoal/20 bg-white hover:bg-cream-100 text-charcoal font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-700" />
                      <span>Prefer WhatsApp? Click to message directly</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-charcoal/60 leading-tight pt-1">
                    🔒 We respect your privacy. No spam calls. Training slots strictly confirmed on request.
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
