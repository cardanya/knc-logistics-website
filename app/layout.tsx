import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileStickyBar from "@/components/MobileStickyBar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "K&C Logistics | Warehousing, Trucking, Cross Docking & Truck Parking",
  description: "Professional cross docking, warehousing, and supply chain management services. Reduce costs, improve delivery times with our freight consolidation, transloading, and logistics solutions. 24/7 operations nationwide.",
  keywords: "cross docking services, cross docking warehouse, freight consolidation, transloading services, warehousing solutions, supply chain management, logistics services, distribution center, freight handling, cargo consolidation, just-in-time delivery, inventory management, dock-to-stock, freight forwarding, third-party logistics, 3PL services, truck parking, lumper services, palletizing, deconsolidation",
  authors: [{ name: "K&C Logistics" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.knclogistics.com/",
    title: "Cross Docking & Logistics Solutions | K&C Logistics",
    description: "Expert cross docking services for efficient freight consolidation and distribution. Reduce warehousing costs, accelerate delivery times with our comprehensive supply chain solutions.",
    images: [
      {
        url: "https://www.knclogistics.com/images/knc-logistics-og.jpg",
        alt: "K&C Logistics Cross Docking and Warehousing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cross Docking Services | K&C Logistics",
    description: "Professional cross docking, freight consolidation, and supply chain management solutions for businesses nationwide.",
    images: ["https://www.knclogistics.com/images/knc-logistics-twitter.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance: DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <WhatsAppWidget />
        <MobileStickyBar />

        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Schema.org LocalBusiness & Service Markup */}
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "K&C Logistics",
              "image": "https://www.knclogistics.com/og-image.png",
              "logo": "https://www.knclogistics.com/kc_logo.png",
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
                "longitude": -117.8897
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 33.7175,
                  "longitude": -117.8897
                },
                "geoRadius": "100"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61581692743100",
                "https://www.instagram.com/knclogistics.co/",
                "https://x.com/knclogistics",
                "https://www.linkedin.com/in/knclogistics/",
                "https://www.tiktok.com/@knclogistics"
              ],
              "description": "Professional logistics services provider in Orange County specializing in warehousing, cross docking, trucking, supply chain management, and truck parking with over 20 years of experience.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Logistics Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Warehousing Services",
                      "description": "Modern warehouse facilities with climate-controlled storage, advanced inventory management, and flexible short and long-term storage solutions.",
                      "serviceType": "Warehousing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Trucking Services",
                      "description": "Reliable trucking with flexible capacity, dispatch support, and on-time delivery for local and regional routes throughout Orange County and Southern California.",
                      "serviceType": "Trucking"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Supply Chain Solutions",
                      "description": "End-to-end supply chain management with real-time tracking, freight consolidation, and complete logistics optimization for improved operational efficiency.",
                      "serviceType": "Supply Chain Management"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Truck Parking",
                      "description": "Secure 24/7 truck parking with spacious lots, staging areas, and convenient access to major highways including I-5 and I-405.",
                      "serviceType": "Truck Parking"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Cross Docking Services",
                      "description": "Fast cross docking operations for quick load transfers, freight consolidation, repalletizing, and staging to minimize dwell time and optimize supply chain operations.",
                      "serviceType": "Cross Docking"
                    }
                  }
                ]
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
