import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { generateServiceMetadata, serviceMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(serviceMetadata.crossDocking);

export default function CrossDocking() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Cross Docking", url: "https://www.knclogistics.com/cross-docking" }
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Cross Docking Services",
    description: "Fast cross docking services for efficient load transfers and freight consolidation",
    provider: "K&C Logistics",
    areaServed: "Orange County, California",
    url: "https://www.knclogistics.com/cross-docking"
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
            <h1>Cross Docking Services</h1>
            <p>
              Efficient cross docking operations in Santa Ana for quick load
              transfers, freight consolidation, and streamlined distribution.
              K&C Logistics provides fast turnaround services to minimize dwell
              time and optimize your supply chain operations.
            </p>
            <a href="/contact" className="btn btn-primary">
              Get a Quote
            </a>
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
          <h2>Fast & Efficient Cross Docking</h2>
          <p className="service-intro">
            K&C Logistics specializes in cross docking operations that keep your
            freight moving efficiently. Our strategically located facility in Santa
            Ana provides the perfect hub for quick load transfers, consolidation,
            and distribution across Southern California.
          </p>

          <div className="service-features-grid">
            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck-loading"></i>
              </div>
              <h3>Rapid Load Transfers</h3>
              <p>
                Quick inbound to outbound transfers with minimal handling time,
                reducing dwell and accelerating your supply chain velocity.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <h3>Freight Consolidation</h3>
              <p>
                Combine multiple shipments into optimized loads to reduce
                transportation costs and improve delivery efficiency.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-palette"></i>
              </div>
              <h3>Repalletizing Services</h3>
              <p>
                Professional pallet breakdown, rebuilding, and stretch wrapping
                to meet specific customer requirements and optimize cube utilization.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-barcode"></i>
              </div>
              <h3>Labeling & Documentation</h3>
              <p>
                Accurate labeling, photo documentation, and paperwork processing
                to ensure compliance and traceability throughout the transfer.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-warehouse"></i>
              </div>
              <h3>Staging Areas</h3>
              <p>
                Dedicated staging zones for organized freight flow, enabling
                efficient sorting and preparation for outbound shipments.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Flexible Scheduling</h3>
              <p>
                Accommodate varied receiving and shipping windows to align with
                your transportation schedules and operational needs.
              </p>
            </div>
          </div>
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
                <p>Quick processing to minimize dwell time and keep freight moving</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Strategic Location</h3>
                <p>Central Orange County location near major highways and ports</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Secure Handling</h3>
                <p>Controlled yard access and professional freight handling</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Transparent Pricing</h3>
                <p>Clear, competitive rates with no hidden fees or surprises</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="service-cta-content">
          <h2>Need Fast Cross Docking Services?</h2>
          <p>
            Contact K&C Logistics for immediate availability and competitive
            quotes on cross docking, freight consolidation, and transloading services.
          </p>
          <div className="service-cta-buttons">
            <a href="tel:7145882005" className="btn btn-primary">
              <i className="fas fa-phone-alt"></i>
              Call (714) 588-2005
            </a>
            <a href="https://wa.me/17145882005" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <i className="fab fa-whatsapp"></i>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
