import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { generateServiceMetadata, serviceMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(serviceMetadata.trucking);

export default function Trucking() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Trucking Services", url: "https://www.knclogistics.com/trucking" }
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Trucking Services",
    description: "Professional trucking services in Orange County with flexible capacity and reliable delivery",
    provider: "K&C Logistics",
    areaServed: "Orange County, California",
    url: "https://www.knclogistics.com/trucking"
  });

  return (
    <>
      <Script
        id="trucking-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="trucking-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Trucking Services</span>
          </div>
        </section>

      {/* Hero Section */}
      <section className="service-detail-hero">
        <div className="service-hero-content">
          <div className="service-hero-text">
            <h1>Professional Trucking Services Built for Speed and Reliability</h1>
            <h2>Efficient, Safe, and On-Time Freight Transport Solutions</h2>
            <p>
              At K&amp;C Logistics, we provide professional trucking services designed to keep your freight moving efficiently across Southern California and nationwide. Our experienced drivers, well-maintained fleet, and real-time tracking systems ensure your loads arrive on time, safely, and without interruption.
            </p>
            <p>
              Whether you require local deliveries, regional hauls, LTL/FTL transport, or specialized freight handling, our logistics team delivers dependable service backed by clear communication and 24/7 support.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get a Quote
            </Link>
          </div>
          <div className="service-hero-image">
            <Image
              src="/trucking-service.jpg"
              alt="K&C Logistics trucking services"
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
          <h2>Our Trucking Services Include:</h2>
          <p className="service-intro">
            From local deliveries to nationwide hauls, K&amp;C Logistics keeps freight on schedule with real-time visibility and 24/7 dispatch support.
          </p>

          <ul className="capabilities-list">
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Local &amp; regional freight delivery</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>LTL (Less-Than-Truckload) &amp; FTL (Full-Truckload) services</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Same-day and scheduled pickups</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Dedicated trucking routes</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Palletized and non-palletized freight</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Temperature-controlled shipment coordination</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Real-time tracking &amp; 24/7 dispatch support</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="why-choose-container">
          <h2>Why Choose K&C Logistics for Trucking?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Local Expertise</h3>
                <p>Deep knowledge of Orange County routes and traffic patterns</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Flexible Service</h3>
                <p>Adaptable capacity to meet your changing transportation needs</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Reliable Performance</h3>
                <p>Proven track record of on-time deliveries and safe transport</p>
              </div>
            </div>
            <div className="why-choose-item">
              <i className="fas fa-check-circle"></i>
              <div>
                <h3>Competitive Rates</h3>
                <p>Transparent pricing with no hidden fees or surcharges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="service-cta-content">
          <h2>Need Reliable Trucking Services?</h2>
          <p>
            Contact K&C Logistics today to discuss your freight transportation
            needs and receive a competitive quote for our trucking services.
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
