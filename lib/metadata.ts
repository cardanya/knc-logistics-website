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
};
