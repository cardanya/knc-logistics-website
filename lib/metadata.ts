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
  apply: {
    title: "Careers & Open Positions | K&C Logistics",
    description: "Explore open positions at K&C Logistics. We are hiring CDL-A drivers and supply chain specialists in Southern California. Join our team today.",
    keywords: [
      "logistics careers",
      "K&C Logistics jobs",
      "cdl driver jobs",
      "supply chain jobs",
      "truck driver careers",
      "california trucking jobs",
      "open positions",
      "K&C Logistics careers",
      "logistics jobs orange county"
    ],
    ogImage: "/apply-og.png",
    path: "/apply",
  },
  driveForUs: {
    title: "Drive for Us | CDL-A Company Driver Jobs | K&C Logistics",
    description: "Join K&C Logistics as a company driver. Competitive pay up to $0.65/mile, weekly direct deposit, guaranteed home time, and no forced dispatch. Apply today.",
    keywords: [
      "cdl driver jobs",
      "truck driver careers",
      "california trucking jobs",
      "company driver",
      "cdl-a jobs",
      "K&C Logistics driver",
      "cdl jobs orange county",
      "truck driver employment",
      "no forced dispatch",
      "weekly pay trucking"
    ],
    ogImage: "/apply-og.png",
    path: "/drive-for-us",
  },
  officeOperationsSpecialist: {
    title: "Office Staff / Operations Specialist | K&C Logistics",
    description: "K&C Logistics is hiring an Office Operations Specialist in Santa Ana, CA. 5+ years of experience in office operations and logistics required. Bilingual English/Spanish preferred.",
    keywords: [
      "office operations specialist",
      "logistics office staff",
      "operations coordinator",
      "office jobs California",
      "K&C Logistics careers",
      "logistics administrator",
      "office manager logistics",
      "operations jobs Santa Ana",
      "bilingual office jobs"
    ],
    ogImage: "/apply-og.png",
    path: "/apply/office-operations-specialist",
  },
  nightGuard: {
    title: "Night Guard | Yard Security | K&C Logistics",
    description: "K&C Logistics is hiring a Night Guard in Santa Ana, CA. Monitor our yard and equipment overnight. Reliable candidates with security experience are encouraged to apply.",
    keywords: [
      "night guard jobs",
      "security guard",
      "overnight security",
      "yard security",
      "security jobs California",
      "K&C Logistics careers",
      "night shift security",
      "security jobs Santa Ana"
    ],
    ogImage: "/apply-og.png",
    path: "/apply/night-guard",
  },
  dieselMechanic: {
    title: "Diesel Mechanic | Truck Maintenance & Repair | K&C Logistics",
    description: "K&C Logistics is hiring a Diesel Mechanic in Santa Ana, CA. 2-3 years experience required. Perform routine maintenance, diagnostics, and repairs on trucks and trailers.",
    keywords: [
      "diesel mechanic jobs",
      "truck mechanic",
      "diesel technician",
      "mechanic jobs California",
      "K&C Logistics careers",
      "truck repair jobs",
      "fleet mechanic",
      "mechanic jobs Santa Ana",
      "commercial vehicle mechanic"
    ],
    ogImage: "/apply-og.png",
    path: "/apply/diesel-mechanic",
  },
  logisticsSalesRepresentative: {
    title: "Logistics Sales Representative Officer | K&C Logistics",
    description: "K&C Logistics is hiring a Logistics Sales Representative Officer in Irvine & Santa Ana, CA. Customer-focused role with flexible schedule, paid training, and employee discounts.",
    keywords: [
      "logistics sales representative",
      "truck rental sales",
      "logistics sales officer",
      "sales jobs California",
      "K&C Logistics careers",
      "customer service logistics",
      "sales jobs Irvine",
      "sales jobs Santa Ana",
      "transportation sales"
    ],
    ogImage: "/apply-og.png",
    path: "/apply/logistics-sales-representative",
  },
  dispatcher: {
    title: "Dispatcher | Logistics & Transportation Coordinator | K&C Logistics",
    description: "K&C Logistics is hiring a Dispatcher in Santa Ana, CA. 5+ years logistics experience required. Coordinate drivers, shipments, and routes in a fast-paced transportation environment.",
    keywords: [
      "dispatcher jobs",
      "logistics dispatcher",
      "transportation coordinator",
      "dispatch jobs California",
      "K&C Logistics careers",
      "freight dispatcher",
      "trucking dispatcher",
      "supply chain dispatcher",
      "logistics jobs Santa Ana"
    ],
    ogImage: "/apply-og.png",
    path: "/apply/dispatcher",
  },
  supplyChainSpecialist: {
    title: "Supply Chain & Systems Optimization Specialist | K&C Logistics",
    description: "K&C Logistics is hiring a Supply Chain and Systems Optimization Specialist in Santa Ana, CA. SAP, Oracle, Python, AI automation experience required. Turkish fluency required.",
    keywords: [
      "supply chain specialist",
      "systems optimization",
      "logistics specialist",
      "SAP Oracle jobs",
      "AI automation logistics",
      "supply chain jobs California",
      "K&C Logistics careers",
      "Turkish speaking jobs",
      "industrial engineering jobs"
    ],
    ogImage: "/apply-og.png",
    path: "/apply/supply-chain-specialist",
  },
};
