import { useEffect } from 'react';

/**
 * Performance Optimization Component
 * Implementa Core Web Vitals e otimizações de performance
 */
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: 'https://fonts.googleapis.com', as: 'connect', crossorigin: true },
        { href: 'https://fonts.gstatic.com', as: 'connect', crossorigin: true }
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = resource.href;
        if (resource.crossorigin) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    };

    // Lazy load images with Intersection Observer
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach(script => {
        script.setAttribute('defer', 'true');
      });
    };

    // Service Worker registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          // Only in production
          if (import.meta.env.PROD) {
            await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered successfully');
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    // Web Vitals monitoring
    const measureWebVitals = () => {
      // Measure First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FCP:', entry.startTime);
        }
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.log('Performance Observer not supported');
      }

      // Measure Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.log('LCP Observer not supported');
        }
      }

      // Measure Cumulative Layout Shift (CLS)
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsScore += (entry as any).value;
            console.log('CLS:', clsScore);
          }
        }
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS Observer not supported');
      }

      // Measure First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          console.log('FID:', fid);
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID Observer not supported');
      }
    };

    // Execute optimizations
    preloadCriticalResources();
    lazyLoadImages();
    optimizeThirdPartyScripts();
    registerServiceWorker();
    
    // Only measure in development
    if (import.meta.env.DEV) {
      measureWebVitals();
    }

    // Cleanup
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;
