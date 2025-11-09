import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cross Docking Services | K&C Logistics - Warehousing & Supply Chain Solutions",
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

        {/* Schema.org Organization & Service Markup */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "K&C Logistics",
              "image": "https://www.knclogistics.com/images/knc-logo.jpg",
              "@id": "https://www.knclogistics.com",
              "url": "https://www.knclogistics.com",
              "telephone": "(949) 484-4686",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3060 Daimler St",
                "addressLocality": "Santa Ana",
                "addressRegion": "CA",
                "postalCode": "92705",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://www.facebook.com/knclogistics",
                "https://www.linkedin.com/company/knc-logistics"
              ],
              "description": "Professional cross docking, warehousing, and supply chain management services provider specializing in freight consolidation, transloading, and logistics solutions.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Logistics Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Cross Docking Services",
                      "description": "Professional cross docking services for freight consolidation and distribution. Reduce warehousing costs and accelerate delivery times with our efficient dock-to-dock solutions.",
                      "serviceType": "Cross Docking"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Warehousing Solutions",
                      "description": "Modern warehouse facilities with climate-controlled storage, advanced inventory management systems, and flexible space options for all business needs.",
                      "serviceType": "Warehousing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Supply Chain Management",
                      "description": "End-to-end supply chain solutions with real-time tracking, cost optimization, and complete logistics management for improved operational efficiency.",
                      "serviceType": "Supply Chain Management"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Freight Consolidation",
                      "description": "Cargo consolidation and deconsolidation services to optimize shipping costs and improve delivery efficiency through our strategic distribution network.",
                      "serviceType": "Freight Consolidation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Transloading Services",
                      "description": "Professional transloading and transfer services between different transportation modes for seamless freight movement and distribution.",
                      "serviceType": "Transloading"
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
