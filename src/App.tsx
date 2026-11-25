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

export const App: React.FC = () => {
  const [pathname, setPathname] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [showGenderModal, setShowGenderModal] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('femme_scooty_gender_preference');
    }
    return false;
  });

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

  // Sync preference with explicit pathname on initial visit
  useEffect(() => {
    if (window.location.pathname.startsWith('/men')) {
      localStorage.setItem('femme_scooty_gender_preference', 'men');
      setPathname('/men');
    } else {
      const storedPref = localStorage.getItem('femme_scooty_gender_preference');
      if (storedPref === 'men') {
        window.history.replaceState({}, '', '/men');
        setPathname('/men');
      }
    }
  }, []);

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
