'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/lib/hooks/useCookieConsent';

export default function CookieConsent() {
  const { showBanner, acceptAll, acceptNecessary } = useCookieConsent();

  // Don't render anything if banner shouldn't be shown
  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-content">
        <div className="cookie-icon">
          <i className="fas fa-cookie-bite"></i>
        </div>
        <div className="cookie-text">
          <h3>We Value Your Privacy</h3>
          <p>
            We use cookies to enhance your browsing experience, serve personalized content,
            and analyze our traffic. By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
            Read our{' '}
            <Link href="/privacy-policy" className="privacy-link">
              Privacy Policy
            </Link>{' '}
            to learn more.
          </p>
        </div>
        <div className="cookie-actions">
          <button
            onClick={acceptNecessary}
            className="btn-decline"
            aria-label="Accept only necessary cookies"
          >
            Necessary Only
          </button>
          <button
            onClick={acceptAll}
            className="btn-accept"
            aria-label="Accept all cookies"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
