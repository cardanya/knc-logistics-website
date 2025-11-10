import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { generateServiceMetadata, serviceMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(serviceMetadata.supplyChainSolutions);

export default function SupplyChainSolutions() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Supply Chain Solutions", url: "https://www.knclogistics.com/supply-chain-solutions" }
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Supply Chain & Logistics Management",
    description: "End-to-end supply chain solutions with freight consolidation and real-time tracking",
    provider: "K&C Logistics",
    areaServed: "United States",
    url: "https://www.knclogistics.com/supply-chain-solutions"
  });

  return (
    <>
      <Script
        id="supply-chain-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="supply-chain-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Supply Chain Solutions</span>
          </div>
        </section>

      {/* Hero Section */}
      <section className="service-detail-hero">
        <div className="service-hero-content">
          <div className="service-hero-text">
            <h1>Supply Chain & Logistics Management</h1>
            <p>
              End-to-end supply chain solutions that optimize your logistics
              operations, reduce costs, and improve delivery performance. From
              freight consolidation to advanced tracking, K&C Logistics handles
              every aspect of your supply chain with precision and care.
            </p>
            <Link href="/#contact" className="btn btn-primary">
              Get a Quote
            </Link>
          </div>
          <div className="service-hero-image">
            <Image
              src="/supply-chain-service.jpg"
              alt="K&C Logistics supply chain management services"
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
          <h2>Comprehensive Supply Chain Management</h2>
          <p className="service-intro">
            At K&C Logistics, we understand that an efficient supply chain is the
            backbone of your business success. Our integrated logistics solutions
            streamline your operations, minimize costs, and ensure timely delivery
            of your products across the distribution network.
          </p>

          <div className="service-features-grid">
            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <h3>Network Optimization</h3>
              <p>
                Strategic planning and route optimization to reduce transit times
                and transportation costs while maximizing efficiency across your
                distribution network.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Real-Time Tracking</h3>
              <p>
                Advanced GPS tracking and monitoring systems provide complete
                visibility of your shipments from origin to destination with
                real-time updates.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck-moving"></i>
              </div>
              <h3>Freight Consolidation</h3>
              <p>
                Combine multiple shipments to maximize truck capacity, reduce
                transportation costs, and minimize environmental impact through
                efficient load planning.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <h3>Cross Docking Services</h3>
              <p>
                Seamless transfer of goods from inbound to outbound transportation
                with minimal handling and storage time for faster order fulfillment.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h3>Order Management</h3>
              <p>
                Comprehensive order processing, fulfillment tracking, and delivery
                confirmation to ensure accuracy and customer satisfaction.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Analytics & Reporting</h3>
              <p>
                Detailed performance metrics, cost analysis, and customizable
                reports to help you make data-driven decisions and optimize your
                supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="why-choose-container">
          <h2>Why Choose K&C Logistics for Supply Chain Management?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Integrated Solutions</h3>
                <p>Seamless coordination across all logistics functions</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Cost Reduction</h3>
                <p>Proven strategies to minimize operational expenses</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Scalable Infrastructure</h3>
                <p>Solutions that grow with your business needs</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Expert Team</h3>
                <p>Experienced logistics professionals at your service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="service-cta-content">
          <h2>Transform Your Supply Chain Today</h2>
          <p>
            Let K&C Logistics optimize your logistics operations and take your
            business to the next level with our comprehensive supply chain
            solutions.
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
