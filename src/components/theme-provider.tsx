'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference in local storage or system preference
    const darkModeFromStorage = localStorage.getItem('dark-mode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial dark mode state
    const initialDarkMode = 
      darkModeFromStorage !== null 
        ? darkModeFromStorage === 'true'
        : prefersDarkMode;
    
    setIsDarkMode(initialDarkMode);
    
    // Listen for changes to dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const hasDarkClass = document.documentElement.classList.contains('dark');
          setIsDarkMode(hasDarkClass);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <>
      {children}
      <Toaster theme={isDarkMode ? 'dark' : 'light'} position="top-right" />
    </>
  );
} 