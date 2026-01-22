/**
 * Application-wide constants for K&C Logistics
 */

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  fullAddress: string;
  googleMapsQuery: string;
}

export interface ContactInfo {
  name: string;
  tagline: string;
  yearsOfExperience: string;
  phones: {
    direct: string;
    directFormatted: string;
    cell: string;
    cellFormatted: string;
    cellE164: string; // E.164 format for tel: links
    whatsapp: string;
    whatsappFormatted: string;
    whatsappE164: string;
  };
  emails: {
    info: string;
    social: string;
  };
  addresses: Address[];
}

export const COMPANY_INFO: ContactInfo = {
  name: 'K&C Logistics',
  tagline: 'Your trusted solution partner in the logistics industry',
  yearsOfExperience: '20+ years',

  phones: {
    direct: '9494844686',
    directFormatted: '(949) 484-4686',
    cell: '7145882005',
    cellFormatted: '(714) 588-2005',
    cellE164: '+17145882005',
    whatsapp: '7149097190',
    whatsappFormatted: '(714) 909-7190',
    whatsappE164: '+17149097190',
  },

  emails: {
    info: 'info@knclogistics.com',
    social: 'social@knclogistics.com',
  },

  addresses: [
    {
      name: 'K&C Warehousing, Cross Docking, Lumper Services and Trucking',
      street: '3060 Daimler St',
      city: 'Santa Ana',
      state: 'CA',
      zip: '92705',
      fullAddress: '3060 Daimler St, Santa Ana, CA 92705',
      googleMapsQuery: 'K%26C%20Warehousing%2C%20Cross%20Docking%2C%20Lumper%20Services%2C%20Trucking',
    },
    {
      name: 'Orange County Truck Stop & Warehousing',
      street: '3100 S Standard Ave',
      city: 'Santa Ana',
      state: 'CA',
      zip: '92705',
      fullAddress: '3100 S Standard Ave, Santa Ana, CA 92705',
      googleMapsQuery: 'Orange%20County%20Truck%20Stop%20%26%20Warehousing',
    },
    {
      name: 'K&C Logistics, Warehousing Alton Branch',
      street: '133 E Alton Ave',
      city: 'Santa Ana',
      state: 'CA',
      zip: '92707',
      fullAddress: '133 E Alton Ave, Santa Ana, CA 92707',
      googleMapsQuery: 'K%26C%20Logistics%2C%20Warehousing%20Alton%20Branch',
    },
  ],
};

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  tiktok: string;
}

export const SOCIAL_LINKS: SocialLinks = {
  facebook: 'https://www.facebook.com/profile.php?id=61581692743100',
  instagram: 'https://www.instagram.com/knclogistics.co/',
  twitter: 'https://x.com/knclogistics',
  linkedin: 'https://www.linkedin.com/in/knclogistics/',
  tiktok: 'https://www.tiktok.com/@knclogistics',
};

// Helper Functions

export function getTelLink(phoneE164: string): string {
  return `tel:${phoneE164}`;
}

export function getGoogleMapsEmbedUrl(address: Address): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Use Google Maps Embed API with API key for better reliability and features
  if (apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address.fullAddress)}`;
  }

  // Fallback to basic embed if API key is not available
  return `https://maps.google.com/maps?q=${encodeURIComponent(address.fullAddress)}&output=embed`;
}

export function getWhatsAppLink(
  phoneE164: string = COMPANY_INFO.phones.whatsappE164,
  message: string = 'Hello! I would like to inquire about your logistics services.'
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneE164.replace('+', '')}?text=${encodedMessage}`;
}

export function getDirectionsLink(address: Address): string {
  const query = encodeURIComponent(address.fullAddress);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

export function getMailtoLink(email: string, subject?: string): string {
  if (subject) {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }
  return `mailto:${email}`;
}
