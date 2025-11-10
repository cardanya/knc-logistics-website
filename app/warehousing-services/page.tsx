import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { generateServiceMetadata, serviceMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(serviceMetadata.warehousingServices);

export default function WarehousingServices() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Warehousing Services", url: "https://www.knclogistics.com/warehousing-services" }
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Warehousing & Distribution Services",
    description: "Modern warehouse facilities with climate-controlled storage and cross docking services",
    provider: "K&C Logistics",
    areaServed: "Orange County, California",
    url: "https://www.knclogistics.com/warehousing-services"
  });

  return (
    <>
      <Script
        id="warehousing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="warehousing-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Warehousing Services</span>
          </div>
        </section>

      {/* Hero Section */}
      <section className="service-detail-hero">
        <div className="service-hero-content">
          <div className="service-hero-text">
            <h1>Warehousing & Distribution Services</h1>
            <p>
              Professional warehousing solutions with modern facilities, advanced
              inventory management, and efficient cross docking services. K&C
              Logistics provides secure storage and distribution for businesses
              throughout Orange County and beyond.
            </p>
            <Link href="/#contact" className="btn btn-primary">
              Get a Quote
            </Link>
          </div>
          <div className="service-hero-image">
            <Image
              src="/warehousing-service.jpg"
              alt="K&C Logistics modern warehousing facilities"
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
          <h2>Complete Warehousing Solutions</h2>
          <p className="service-intro">
            K&C Logistics operates state-of-the-art warehouse facilities designed
            to meet the diverse needs of modern businesses. Our strategic location
            in Santa Ana, California, provides easy access to major transportation
            routes and ports, making us the ideal partner for your storage and
            distribution needs.
          </p>

          <div className="service-features-grid">
            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-warehouse"></i>
              </div>
              <h3>Modern Facilities</h3>
              <p>
                Climate-controlled warehouses with advanced security systems,
                24/7 monitoring, and flexible storage configurations to meet your
                specific requirements.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <h3>Inventory Management</h3>
              <p>
                Real-time tracking systems, barcode scanning, and comprehensive
                inventory reports to keep you informed about your stock levels at
                all times.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck-loading"></i>
              </div>
              <h3>Cross Docking</h3>
              <p>
                Efficient cross-docking services to minimize storage time and
                reduce costs by transferring goods directly from inbound to
                outbound shipments.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-dolly"></i>
              </div>
              <h3>Material Handling</h3>
              <p>
                Professional loading and unloading services with experienced
                lumper crews and modern equipment for safe and efficient cargo
                handling.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Scalable Solutions</h3>
              <p>
                Flexible storage options that grow with your business, from
                short-term overflow to long-term warehousing contracts.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Storage</h3>
              <p>
                Advanced security measures including surveillance cameras, access
                control systems, and insurance coverage for complete peace of
                mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="why-choose-container">
          <h2>Why Choose K&C Logistics for Warehousing?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>20+ Years Experience</h3>
                <p>Trusted warehouse management since day one</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Strategic Location</h3>
                <p>Easy access to I-5, I-405, and major ports</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>24/7 Operations</h3>
                <p>Round-the-clock access and support</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Competitive Pricing</h3>
                <p>Transparent rates with no hidden fees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="service-cta-content">
          <h2>Ready to Optimize Your Warehousing?</h2>
          <p>
            Contact K&C Logistics today to discuss your warehousing needs and get
            a customized solution for your business.
          </p>
          <div className="service-cta-buttons">
            <a href="tel:7145882005" className="btn btn-primary">
              <i className="fas fa-phone-alt"></i>
              Call (714) 588-2005
            </a>
            <Link href="/#contact" className="btn btn-secondary">
              Request Quote
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
