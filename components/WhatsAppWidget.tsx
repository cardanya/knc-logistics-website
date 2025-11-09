'use client';

import { useState } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '17149097190'; // (714) 909-7190

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about your logistics services.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
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
