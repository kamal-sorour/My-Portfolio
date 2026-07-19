'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register after the page loads to avoid blocking initial render
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            console.log('[SW] Registered successfully, scope:', registration.scope);

            // Check for updates periodically (every 60 minutes)
            setInterval(() => {
              registration.update();
            }, 60 * 60 * 1000);
          })
          .catch((error) => {
            console.log('[SW] Registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}
