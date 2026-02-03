import { useEffect, useState } from 'react';

/**
 * Google reCAPTCHA v3 API type definitions
 * @see https://developers.google.com/recaptcha/docs/v3
 */
interface ReCaptchaV3 {
  /**
   * Prepares the reCAPTCHA API for use
   * @param callback - Function to call when API is ready
   */
  ready: (callback: () => void) => void;

  /**
   * Executes reCAPTCHA verification
   * @param siteKey - reCAPTCHA site key
   * @param options - Execution options (action name)
   * @returns Promise resolving to verification token
   */
  execute: (siteKey: string, options: { action: string }) => Promise<string>;

  /**
   * Renders reCAPTCHA widget (for v2 compatibility)
   */
  render?: (elementId: string, options: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    /**
     * Google reCAPTCHA API instance
     * Available after loading https://www.google.com/recaptcha/api.js
     */
    grecaptcha?: ReCaptchaV3;
  }
}

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;

    // Check if already loaded
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => setIsReady(true));
      return;
    }

    // Load script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}&hl=en`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.grecaptcha?.ready(() => setIsReady(true));
    };

    return () => {
      // Cleanup on unmount
      try {
        const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
      } catch (error) {
        console.warn('Failed to cleanup reCAPTCHA script:', error);
      }
    };
  }, [siteKey]);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!siteKey || !isReady) {
      return null;
    }

    try {
      if (!window.grecaptcha) {
        throw new Error('reCAPTCHA script not loaded');
      }
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return null;
    }
  };

  return { isReady, executeRecaptcha };
}
