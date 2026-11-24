import React from 'react';
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

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal overflow-x-hidden relative">
      <Header />
      <main className="flex-1 pb-14 sm:pb-0">
        <Hero />
        <MarqueeTicker />
        <CoursesSection />
        <AboutSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <LocationsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default App;
