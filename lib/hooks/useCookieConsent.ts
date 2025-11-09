'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'knc-cookie-consent';
const ANALYTICS_CONSENT_KEY = 'knc-analytics-consent';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  // Initialize with SSR-safe default values (showBanner starts false to match SSR)
  const [hasConsent, setHasConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [showBanner, setShowBanner] = useState(false);

  // Read from localStorage after component mounts (client-only)
  // Using queueMicrotask to defer state updates and avoid linting warning
  useEffect(() => {
    queueMicrotask(() => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const analyticsConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);

      if (consent) {
        setHasConsent(true);
        setPreferences({
          necessary: true,
          analytics: analyticsConsent === 'true',
          marketing: false,
        });
        // showBanner stays false
      } else {
        // Show banner only if no consent was given
        setShowBanner(true);
      }
    });
  }, []);

  const acceptAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(prefs);
  };

  const acceptNecessary = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(prefs);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(ANALYTICS_CONSENT_KEY, prefs.analytics.toString());
    setPreferences(prefs);
    setHasConsent(true);
    setShowBanner(false);

    // Reload page to apply analytics settings
    if (prefs.analytics && 'gtag' in window) {
      window.location.reload();
    }
  };

  const revokeConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    setHasConsent(false);
    setShowBanner(true);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return {
    hasConsent,
    preferences,
    showBanner,
    acceptAll,
    acceptNecessary,
    savePreferences,
    revokeConsent,
  };
}
