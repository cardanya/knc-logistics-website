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
            <h1>Smart Supply Chain Solutions for Modern Logistics</h1>
            <h2>Integrated, Scalable, and Cost-Effective Freight Management</h2>
            <p>
              At K&amp;C Logistics, we deliver end-to-end Supply Chain Solutions engineered to help businesses move freight faster, reduce operational costs, and maintain total control over every stage of their logistics process. Our integrated approach combines warehousing, trucking, cross docking, distribution, pallet handling, and real-time coordination, ensuring your shipments stay on schedule with maximum efficiency.
            </p>
            <p>
              Whether you handle high-volume distribution, LTL/FTL freight, or specialized loads, our expert team designs a tailored logistics strategy that improves flow, strengthens reliability, and supports long-term growth.
            </p>
            <Link href="/contact" className="btn btn-primary">
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
          <h2>Our Supply Chain Solutions Include:</h2>
          <p className="service-intro">
            Integrated logistics, warehousing, and trucking support for businesses that demand transparency and speed.
          </p>
          <ul className="capabilities-list">
            <li>
              <i className="fas fa-check-circle"></i>
              <span>End-to-end freight coordination</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Warehousing &amp; inventory management</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Trucking (LTL / FTL / regional delivery)</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Cross docking &amp; load transfer</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Palletizing, repalletizing &amp; labeling</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Route planning &amp; distribution support</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Real-time visibility &amp; shipment tracking</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Cost optimization &amp; operational consulting</span>
            </li>
          </ul>
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
          <h2>Looking for Smarter Supply Chain Solutions?</h2>
          <p>
            Our team is ready to optimize your logistics from start to finish.
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
