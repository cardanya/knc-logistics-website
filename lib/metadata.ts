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
    title: "Warehousing & Distribution Services Orange County | K&C Logistics",
    description: "Modern warehouse facilities in Santa Ana with climate-controlled storage, advanced inventory management, cross docking services. Flexible short and long-term warehousing solutions.",
    keywords: [
      "warehousing services Orange County",
      "warehouse storage Santa Ana",
      "distribution center California",
      "cross docking services",
      "inventory management",
      "climate controlled warehouse",
      "warehouse distribution",
      "third party warehousing",
      "3PL warehouse",
      "fulfillment center",
      "warehouse near me",
      "commercial storage",
      "Orange County distribution"
    ],
    ogImage: "/warehousing-og.png",
    path: "/warehousing-services",
  },
  supplyChainSolutions: {
    title: "Supply Chain Management & Logistics Solutions | K&C Logistics",
    description: "End-to-end supply chain solutions with freight consolidation, real-time tracking, cross docking services. Optimize logistics operations, reduce costs, improve delivery performance.",
    keywords: [
      "supply chain management",
      "logistics solutions",
      "freight consolidation",
      "supply chain optimization",
      "logistics management",
      "freight forwarding",
      "transportation management",
      "real-time tracking",
      "supply chain consulting",
      "3PL services",
      "logistics optimization",
      "freight distribution",
      "supply chain services"
    ],
    ogImage: "/supply-chain-og.png",
    path: "/supply-chain-solutions",
  },
  trucking: {
    title: "Trucking Services Orange County | Local & OC Routes | K&C Logistics",
    description: "Reliable trucking services in Orange County with flexible capacity, dispatch support, and on-time delivery. Local routes, dedicated lanes, and professional freight transportation.",
    keywords: [
      "trucking services Orange County",
      "local trucking Santa Ana",
      "OC freight transportation",
      "dispatch services",
      "dedicated trucking",
      "local delivery services",
      "freight hauling",
      "truck dispatch",
      "Orange County trucking",
      "California trucking",
      "reliable freight transport",
      "commercial trucking",
      "logistics trucking"
    ],
    ogImage: "/trucking-og.png",
    path: "/trucking",
  },
  truckParking: {
    title: "Truck Parking Santa Ana | 24/7 Secure Parking | K&C Logistics",
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
    path: "/truck-parking",
  },
  crossDocking: {
    title: "Cross Docking Services Orange County | Fast Freight Transfer | K&C Logistics",
    description: "Efficient cross docking services in Santa Ana for quick load transfers, repalletizing, and freight consolidation. Minimize dwell time and optimize supply chain operations.",
    keywords: [
      "cross docking services",
      "freight consolidation",
      "load transfer",
      "transloading services",
      "freight distribution",
      "cross dock facility",
      "quick turnaround",
      "freight staging",
      "repalletizing services",
      "Orange County cross docking",
      "Santa Ana cross dock",
      "logistics consolidation",
      "freight handling"
    ],
    ogImage: "/cross-docking-og.png",
    path: "/cross-docking",
  },
};

// Page-specific metadata configurations
export const pageMetadata = {
  about: {
    title: "About K&C Logistics | Orange County Logistics & Warehousing Company",
    description: "Learn about K&C Logistics, Orange County's trusted logistics partner. Over 20 years of experience in warehousing, cross docking, trucking, and supply chain solutions.",
    keywords: [
      "K&C Logistics",
      "logistics company Orange County",
      "Santa Ana logistics",
      "about us",
      "logistics company history",
      "warehousing company",
      "freight company",
      "California logistics",
      "supply chain company"
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
