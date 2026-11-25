import React, { useEffect } from 'react';
import { siteData } from './data/siteData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { CoursesSection } from './components/CoursesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationsSection } from './components/LocationsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export const App: React.FC<{ initialPath?: string }> = () => {
  // If client navigated to /men or /men/*, clean redirect to /
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/men' || window.location.pathname.startsWith('/men/')) {
        window.history.replaceState({}, '', '/');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, []);

  // Update document title, canonical link, and meta tags for Femme Scooty
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const title = "Femme Scooty | Ladies Scooty Training Centre in Delhi NCR, Lucknow, Mathura & Jodhpur";
    const canonicalUrl = "https://fenme-scooty.vercel.app/";
    const description = "Learn scooty riding in 7 days with 100% female trainers near your home. Free scooty & petrol included. Serving Delhi, Ghaziabad, Faridabad, Lucknow, Mathura & Jodhpur. Call +91 96256 95363.";

    document.title = title;

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Description meta
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) metaDesc.content = description;

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.content = title;

    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (ogDesc) ogDesc.content = description;

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) ogUrl.content = canonicalUrl;

    // Twitter Card
    const twTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
    if (twTitle) twTitle.content = title;

    const twDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
    if (twDesc) twDesc.content = description;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal overflow-x-clip relative">
      <Header data={siteData} />

      <main className="flex-1 pb-14 sm:pb-0">
        <Hero data={siteData} />
        <MarqueeTicker tickerItems={siteData.tickerItems} />
        <CoursesSection data={siteData} />
        <AboutSection data={siteData} />
        <WhyChooseUs data={siteData} />
        <TestimonialsSection data={siteData} />
        <LocationsSection data={siteData} />
        <FAQSection data={siteData} />
      </main>

      <Footer data={siteData} />

      <FloatingActions
        phone={siteData.brand.phone}
        whatsappUrl={siteData.brand.whatsappUrl}
      />
    </div>
  );
};

export default App;
