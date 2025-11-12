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
            <h1>Reliable Warehousing Solutions for Modern Supply Chains</h1>
            <h2>Safe, Scalable, and Fully Managed Storage Services</h2>
            <p>
              At K&amp;C Logistics, we offer secure and scalable warehousing services designed to support businesses of all sizes — from local distributors to nationwide carriers. Our Orange County facilities provide short-term and long-term storage, inventory management, and streamlined distribution to keep your products protected and delivered on time.
            </p>
            <p>
              With 24/7 onsite staff, advanced surveillance, and seamless inbound/outbound coordination, we help you reduce operational stress, lower storage costs, and optimize every link in your supply chain.
            </p>
            <Link href="/contact" className="btn btn-primary">
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
          <h2>Our Warehousing Services Include:</h2>
          <p className="service-intro">
            Secure storage, inventory management, and distribution support tailored for fast-moving supply chains in Southern California.
          </p>
          <ul className="capabilities-list">
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Short-term &amp; long-term pallet storage</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Inventory management &amp; reporting</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Inbound / outbound coordination</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Palletization &amp; repalletizing</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Labeling, sorting &amp; SKU organization</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Cross docking &amp; load transfer support</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Distribution &amp; last-mile delivery partnerships</span>
            </li>
          </ul>
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
          <h2>Need Flexible Warehousing in Orange County?</h2>
          <p>
            Get fast, reliable storage solutions with 24/7 access and professional handling.
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
