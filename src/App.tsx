import React, { useState, useEffect } from 'react';
import { siteData } from './data/siteData';
import { menSiteData } from './data/menSiteData';
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
import { GenderModal } from './components/GenderModal';

export const App: React.FC<{ initialPath?: string }> = ({ initialPath }) => {
  const [pathname, setPathname] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== 'undefined') return window.location.pathname;
    return '/';
  });
  const [showGenderModal, setShowGenderModal] = useState<boolean>(true);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ensure window scrolls to top instantly on route change between / and /men
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Sync explicit pathname on initial visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/men')) {
        setPathname('/men');
      } else {
        setPathname('/');
      }
    }
  }, []);

  // Update document title, canonical link, and meta tags on route change
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const isMenRoute = pathname === '/men' || pathname.startsWith('/men');
    const title = isMenRoute
      ? "Femme Scooty Men's Wing | Scooty Training in Delhi NCR, Lucknow, Mathura & Jodhpur"
      : "Femme Scooty | Ladies Scooty Training Centre in Delhi NCR, Lucknow, Mathura & Jodhpur";
    const canonicalUrl = isMenRoute ? "https://femmescooty.in/men" : "https://femmescooty.in/";
    const description = isMenRoute
      ? "Learn scooty riding in 7 days with experienced male trainers near your home. Free scooty & petrol included. Serving Delhi, Ghaziabad, Faridabad, Lucknow, Mathura & Jodhpur. Call +91 96256 95363."
      : "Learn scooty riding in 7 days with 100% female trainers near your home. Free scooty & petrol included. Serving Delhi, Ghaziabad, Faridabad, Lucknow, Mathura & Jodhpur. Call +91 96256 95363.";

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
  }, [pathname]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setPathname(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const isMen = pathname === '/men' || pathname.startsWith('/men');
  const activeData = isMen ? menSiteData : siteData;

  const handleSelectGender = (gender: 'women' | 'men') => {
    localStorage.setItem('femme_scooty_gender_preference', gender);
    setShowGenderModal(false);
    if (gender === 'men') {
      navigate('/men');
    } else {
      navigate('/');
    }
  };

  const handleSwitchGender = () => {
    if (isMen) {
      localStorage.setItem('femme_scooty_gender_preference', 'women');
      navigate('/');
    } else {
      localStorage.setItem('femme_scooty_gender_preference', 'men');
      navigate('/men');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal overflow-x-clip relative">
      {/* Entry Pop-Up Modal */}
      <GenderModal
        isOpen={showGenderModal}
        onSelect={handleSelectGender}
        onClose={() => setShowGenderModal(false)}
      />

      <Header
        data={activeData}
        isMen={isMen}
        onSwitchGender={handleSwitchGender}
        onSelectGender={handleSelectGender}
        onOpenGenderModal={() => setShowGenderModal(true)}
      />

      <main className="flex-1 pb-14 sm:pb-0">
        <Hero data={activeData} isMen={isMen} />
        <MarqueeTicker tickerItems={activeData.tickerItems} isMen={isMen} />
        <CoursesSection data={activeData} isMen={isMen} />
        <AboutSection data={activeData} isMen={isMen} />
        <WhyChooseUs data={activeData} isMen={isMen} />
        <TestimonialsSection data={activeData} isMen={isMen} />
        <LocationsSection data={activeData} isMen={isMen} />
        <FAQSection data={activeData} isMen={isMen} />
      </main>

      <Footer
        data={activeData}
        isMen={isMen}
        onSwitchGender={handleSwitchGender}
        onOpenGenderModal={() => setShowGenderModal(true)}
      />

      <FloatingActions
        phone={activeData.brand.phone}
        whatsappUrl={activeData.brand.whatsappUrl}
        isMen={isMen}
      />
    </div>
  );
};

export default App;
