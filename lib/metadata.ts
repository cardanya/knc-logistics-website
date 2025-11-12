import type { Metadata } from "next";

interface ServiceMetadataConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  path: string;
}

export function generateServiceMetadata(config: ServiceMetadataConfig): Metadata {
  const { title, description, keywords, ogImage, path } = config;

  const baseUrl = "https://www.knclogistics.com";
  const fullUrl = `${baseUrl}${path}`;
  const defaultOgImage = `${baseUrl}/og-image.png`;
  const ogImageUrl = ogImage ? `${baseUrl}${ogImage}` : defaultOgImage;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "K&C Logistics" }],
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: fullUrl,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Service-specific metadata configurations
export const serviceMetadata = {
  parkingSolutions: {
    title: "Truck Parking Solutions Santa Ana | 24/7 Secure Parking | K&C Logistics",
    description: "Professional truck parking and staging in Santa Ana, CA. 24/7 secure access, spacious lots near I-5 & I-405. Affordable daily, weekly, monthly rates for owner operators and fleet managers.",
    keywords: [
      "truck parking Santa Ana",
      "commercial truck parking",
      "semi truck parking Orange County",
      "secure truck parking",
      "truck staging area",
      "fleet parking solutions",
      "24/7 truck parking",
      "truck parking near me",
      "overnight truck parking",
      "monthly truck parking",
      "Santa Ana truck stop",
      "I-5 truck parking",
      "California truck parking"
    ],
    ogImage: "/parking-og.png",
    path: "/parking-solutions",
  },
  warehousingServices: {
    title: "Warehousing Services | Secure Storage & Distribution | K&C Logistics",
    description: "Professional warehousing services with secure storage, inventory management, and distribution support. Short-term & long-term solutions in Orange County. Contact K&C Logistics for a quote today.",
    keywords: [
      "warehousing services",
      "secure storage",
      "distribution center",
      "logistics in Orange County",
      "K&C Logistics",
      "inventory management",
      "short-term storage",
      "long-term storage",
      "inbound outbound coordination",
      "supply chain optimization"
    ],
    ogImage: "/warehousing-og.png",
    path: "/warehousing-services",
  },
  supplyChainSolutions: {
    title: "Supply Chain Solutions | Integrated Logistics & Optimization | K&C Logistics",
    description: "Efficient supply chain solutions with end-to-end logistics, warehousing, trucking, distribution, and cross docking support. Optimize your freight with K&C Logistics. Get a free quote today.",
    keywords: [
      "supply chain solutions",
      "logistics optimization",
      "integrated supply chain",
      "freight management",
      "distribution services",
      "warehousing",
      "trucking",
      "cross docking",
      "real-time logistics",
      "cost optimization"
    ],
    ogImage: "/supply-chain-og.png",
    path: "/supply-chain-solutions",
  },
  trucking: {
    title: "Professional Trucking Services | Reliable Freight Transport | K&C Logistics",
    description: "Reliable trucking services with on-time freight transport, LTL/FTL options, regional delivery, and 24/7 dispatch support. Contact K&C Logistics for professional trucking solutions today.",
    keywords: [
      "trucking services",
      "freight transport",
      "professional trucking",
      "logistics company",
      "Orange County trucking",
      "on-time delivery",
      "LTL trucking",
      "FTL trucking",
      "regional freight",
      "24/7 dispatch support"
    ],
    ogImage: "/trucking-og.png",
    path: "/trucking",
  },
  truckParking: {
    title: "Truck Parking | Secure 24/7 Parking & Yard Storage | K&C Logistics",
    description: "Secure 24/7 truck parking with gated access, HD surveillance, and flexible daily/weekly/monthly rates. Semi-truck, trailer, and commercial vehicle parking available in Orange County. Reserve your spot at K&C Logistics.",
    keywords: [
      "truck parking",
      "secure truck parking",
      "24/7 truck yard",
      "commercial vehicle parking",
      "Orange County truck parking",
      "semi truck parking",
      "fleet parking",
      "gated truck yard",
      "truck parking Santa Ana"
    ],
    ogImage: "/parking-og.png",
    path: "/truck-parking",
  },
  crossDocking: {
    title: "Cross Docking Services | Fast & Efficient Transfer | K&C Logistics",
    description: "Fast, reliable cross docking in Orange County. Save time and reduce costs with K&C Logistics’ same-day transfer and repalletizing services. Get a free quote today!",
    keywords: [
      "cross docking services",
      "fast transfer logistics",
      "same-day delivery",
      "K&C Logistics",
      "Orange County truck yard",
      "pallet reconfiguration",
      "direct truck-to-truck unloading",
      "supply chain efficiency"
    ],
    ogImage: "/cross-docking-og.png",
    path: "/cross-docking",
  },
};

// Page-specific metadata configurations
export const pageMetadata = {
  about: {
    title: "About Us | Trusted Logistics & Supply Chain Partner | K&C Logistics",
    description: "Learn about K&C Logistics — your trusted partner in warehousing, trucking, cross docking, and supply chain solutions. Reliable, secure, and customer-focused logistics services in Orange County.",
    keywords: [
      "logistics company",
      "supply chain partner",
      "warehousing provider",
      "trucking company",
      "Orange County logistics"
    ],
    ogImage: "/about-og.png",
    path: "/about",
  },
  contact: {
    title: "Contact K&C Logistics | Get a Quote | Santa Ana, CA",
    description: "Contact K&C Logistics for warehousing, cross docking, trucking, and parking solutions. Located in Santa Ana, CA. Call (714) 588-2005 or request a quote online.",
    keywords: [
      "contact K&C Logistics",
      "logistics quote",
      "Santa Ana logistics",
      "warehousing contact",
      "get a quote",
      "logistics inquiry",
      "contact us",
      "714-588-2005"
    ],
    ogImage: "/contact-og.png",
    path: "/contact",
  },
  faq: {
    title: "FAQ | Frequently Asked Questions | K&C Logistics",
    description: "Answers to common questions about K&C Logistics services including truck parking, warehousing, cross docking, pricing, security, and operations.",
    keywords: [
      "logistics FAQ",
      "truck parking questions",
      "warehousing FAQ",
      "cross docking questions",
      "logistics questions",
      "K&C Logistics FAQ",
      "frequently asked questions"
    ],
    ogImage: "/faq-og.png",
    path: "/faq",
  },
};
