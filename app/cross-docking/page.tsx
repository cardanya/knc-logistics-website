import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { generateServiceMetadata, serviceMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(serviceMetadata.crossDocking);

export default function CrossDocking() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    {
      name: "Cross Docking",
      url: "https://www.knclogistics.com/cross-docking",
    },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Cross Docking Services",
    description:
      "Fast cross docking services for efficient load transfers and freight consolidation",
    provider: "K&C Logistics",
    areaServed: "Orange County, California",
    url: "https://www.knclogistics.com/cross-docking",
  });

  return (
    <>
      <Script
        id="crossdocking-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="crossdocking-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Cross Docking</span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="service-detail-hero">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <h1>Cross Docking Solutions for Faster, Smarter Logistics</h1>
              <h2>Minimize Storage Time, Maximize Delivery Speed</h2>
              <p>
                At K&amp;C Logistics, we specialize in cross docking services
                designed to eliminate unnecessary warehouse storage and
                accelerate your supply chain. Our Orange County facilities
                handle same-day transfer, pallet reconfiguration, and direct
                truck-to-truck unloading so freight stays in motion.
              </p>
              <p>
                We partner with carriers, distributors, reduce handling time and
                maintain real-time visibility. From temporary staging and
                repalletizing to last mile coordination, our expert team is
                available 24/7 to optimize your logistics flow.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Get a Quote
              </Link>
            </div>
            <div className="service-hero-image">
              <Image
                src="/cross-docking-service.jpg"
                alt="K&C Logistics cross docking services"
                width={800}
                height={600}
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="service-overview">
          <div className="service-overview-container">
            <h2>Our Cross Docking Capabilities</h2>
            <p className="service-intro">
              From direct truck-to-truck transfers to real-time shipment
              tracking, our Orange County cross dock is built to keep freight
              moving within hours, not days.
            </p>

            <ul className="capabilities-list">
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Direct truck-to-truck transfer</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Pallet sorting and rewrapping</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Re-labeling and load consolidation</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Short-term staging and storage</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>LTL &amp; FTL coordination</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Real-time shipment tracking</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="why-choose-container">
            <h2>Why Choose K&C Logistics for Cross Docking?</h2>
            <div className="why-choose-grid">
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Fast Turnarounds</h3>
                  <p>
                    Quick processing to minimize dwell time and keep freight
                    moving
                  </p>
                </div>
              </div>
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Strategic Location</h3>
                  <p>
                    Central Orange County location near major highways and ports
                  </p>
                </div>
              </div>
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Secure Handling</h3>
                  <p>
                    Controlled yard access and professional freight handling
                  </p>
                </div>
              </div>
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Transparent Pricing</h3>
                  <p>
                    Clear, competitive rates with no hidden fees or surprises
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-cta-content">
            <h2>Need Immediate Cross Docking Support?</h2>
            <p>
              Contact our operations team for same-day service and get your
              freight moving now.
            </p>
            <div className="service-cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Get a Quote
              </Link>
              <a href="tel:7145882005" className="btn btn-secondary">
                Call/Text Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
