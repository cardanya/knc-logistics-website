// JSON-LD Schema Generator for SEO

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider,
      "url": "https://www.knclogistics.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": service.areaServed
    },
    "url": service.url
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "K&C Logistics",
    "image": "https://www.knclogistics.com/og-image.png",
    "@id": "https://www.knclogistics.com",
    "url": "https://www.knclogistics.com",
    "telephone": "(714) 588-2005",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3060 Daimler St",
      "addressLocality": "Santa Ana",
      "addressRegion": "CA",
      "postalCode": "92705",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.7175,
      "longitude": -117.8311
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/knclogistics",
      "https://www.linkedin.com/company/knc-logistics"
    ]
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
