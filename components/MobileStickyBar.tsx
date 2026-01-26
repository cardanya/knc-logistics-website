"use client";

import Link from "next/link";
import { COMPANY_INFO, getTelLink, getWhatsAppLink, getDirectionsLink } from "@/lib/constants";

// Quick action buttons exposed on the sticky CTA bar
const quickActions = [
  {
    label: "Call",
    href: getTelLink(COMPANY_INFO.phones.cellE164),
    icon: "fas fa-phone",
  },
  {
    label: "WhatsApp",
    href: getWhatsAppLink(),
    icon: "fab fa-whatsapp",
  },
  {
    label: "Directions",
    href: getDirectionsLink(COMPANY_INFO.addresses[0]),
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
        const isExternal =
          action.href.startsWith("http") ||
          action.href.startsWith("tel:") ||
          action.href.startsWith("mailto:");

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
