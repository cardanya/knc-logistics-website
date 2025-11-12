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
            <h1>Professional Trucking Services</h1>
            <p>
              Reliable trucking solutions in Orange County with flexible capacity,
              professional dispatch support, and on-time delivery. K&C Logistics
              provides dedicated local and regional freight transportation services
              to keep your supply chain moving efficiently.
            </p>
            <a href="/contact" className="btn btn-primary">
              Get a Quote
            </a>
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
          <h2>Orange County Trucking Solutions</h2>
          <p className="service-intro">
            K&C Logistics offers comprehensive trucking services tailored to your
            freight transportation needs. From local deliveries to regional routes,
            our professional drivers and well-maintained fleet ensure your cargo
            arrives safely and on schedule.
          </p>

          <div className="service-features-grid">
            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck-moving"></i>
              </div>
              <h3>Local & Regional Routes</h3>
              <p>
                Comprehensive coverage throughout Orange County and Southern
                California with dedicated lanes and regular schedules for
                consistent service.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Dispatch Support</h3>
              <p>
                Professional dispatch team providing real-time updates, route
                optimization, and responsive communication throughout transit.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <h3>Flexible Capacity</h3>
              <p>
                Scalable transportation solutions from partial loads to full
                truckloads, accommodating your changing freight volume needs.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Reliable ETAs</h3>
              <p>
                Consistent on-time delivery performance with accurate tracking
                and proactive communication of any schedule changes.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Professional Drivers</h3>
              <p>
                Experienced, licensed drivers with comprehensive training in
                cargo handling, safety protocols, and customer service.
              </p>
            </div>

            <div className="service-feature-card">
              <div className="feature-icon">
                <i className="fas fa-wrench"></i>
              </div>
              <h3>Well-Maintained Fleet</h3>
              <p>
                Modern, regularly serviced trucks and trailers to minimize
                breakdowns and ensure reliable transportation service.
              </p>
            </div>
          </div>
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
            <a href="tel:7145882005" className="btn btn-primary">
              <i className="fas fa-phone-alt"></i>
              Call (714) 588-2005
            </a>
            <a href="/contact" className="btn btn-secondary">
              Request a Quote
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
