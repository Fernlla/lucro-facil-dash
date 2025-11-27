import { useState, useEffect } from 'react';
import { LucroFacilNavbar } from '@/components/ui/lucrofacil-navbar';
import { Pricing } from '@/components/ui/pricing';
import HeroSection from '@/components/landing/HeroSection';
import ResourcesSection from '@/components/landing/ResourcesSection';
import VideoDemo from '@/components/landing/VideoDemo';
import ManagementSection from '@/components/landing/ManagementSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import BlogPreview from '@/components/landing/BlogPreview';
import HelpSection from '@/components/landing/HelpSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

const Landing = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const isDark = theme === 'dark';
  const landingId = 'lucrofacil-landing-v1.0';

  return (
    <div id={landingId} className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'} transition-colors duration-200`}>
      <LucroFacilNavbar />
      <HeroSection />
      <ResourcesSection />
      <VideoDemo />
      <ManagementSection />
      <StatsSection />
      <Pricing />
      <TestimonialsSection />
      <BlogPreview />
      <HelpSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
