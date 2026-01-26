'use client';

import { useState } from 'react';
import { getWhatsAppLink } from '@/lib/constants';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="whatsapp-widget">
        <button
          className="whatsapp-button"
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </button>

        {/* Tooltip */}
        {isOpen && (
          <div className="whatsapp-tooltip">
            <p>Need help? Chat with us!</p>
            <span className="tooltip-arrow"></span>
          </div>
        )}
      </div>
    </>
  );
}
