"use client";

import Link from "next/link";

const quickActions = [
  {
    label: "Call",
    href: "tel:7145882005",
    icon: "fas fa-phone",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/17149097190?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20logistics%20services.",
    icon: "fab fa-whatsapp",
  },
  {
    label: "Directions",
    href: "https://www.google.com/maps/dir/?api=1&destination=K%26C%20Logistics%203060%20Daimler%20St%20Santa%20Ana%20CA",
    icon: "fas fa-location-arrow",
  },
  {
    label: "Get a Quote",
    href: "#contact",
    icon: "fas fa-paper-plane",
  },
];

export default function MobileStickyBar() {
  return (
    <nav className="mobile-sticky-bar" aria-label="Quick actions">
      {quickActions.map((action) => {
        const isExternal = action.href.startsWith("http");

        const content = (
          <>
            <i className={action.icon} aria-hidden="true"></i>
            <span>{action.label}</span>
          </>
        );

        return isExternal ? (
          <a
            key={action.label}
            href={action.href}
            className="sticky-bar-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          <Link key={action.label} href={action.href} className="sticky-bar-btn">
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
