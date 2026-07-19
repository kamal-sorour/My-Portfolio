"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-linear-to-r from-primary to-primary/80 text-background rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-primary/50"
          aria-label="Back to top"
          role="button"
          tabIndex={0}
        >
          <ChevronUp
            size={24}
            className="text-app-bg group-hover:-translate-y-0.5 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      )}
    </>
  );
};

export default BackToTop;