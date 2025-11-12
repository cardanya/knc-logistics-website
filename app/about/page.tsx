import Link from "next/link";
import Script from "next/script";
import { generateServiceMetadata, pageMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(pageMetadata.about);

export default function About() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "About Us", url: "https://www.knclogistics.com/about" }
  ]);

  return (
    <>
      <Script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>About Us</span>
          </div>
        </section>

        {/* About Section */}
        <section className="about-page" id="about">
          <div className="about-container">
            <div className="about-content scroll-animate-right">
              <h1>Leading Cross Docking & Logistics Solutions Provider</h1>
              <p>
                K&C Logistics is Orange County&apos;s premier cross docking and
                logistics service provider, strategically located in Santa Ana,
                California. With over 20 years of industry expertise, we specialize
                in efficient cross docking operations, comprehensive warehousing
                solutions, professional truck parking, and reliable freight
                transportation services.
              </p>
              <p>
                Our state-of-the-art facilities and expert team provide seamless
                cargo handling, just-in-time delivery solutions, and strategic
                logistics planning. From dock-to-dock operations to complete
                supply chain optimization, we deliver reliable, cost-effective
                freight management services that drive business growth and
                operational excellence.
              </p>

              <div className="values-grid">
                <div className="value-item">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <h3>Reliability</h3>
                    <p>20 years of industry experience</p>
                  </div>
                </div>
                <div className="value-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <h3>Speed</h3>
                    <p>On-time delivery guarantee</p>
                  </div>
                </div>
                <div className="value-item">
                  <i className="fas fa-handshake"></i>
                  <div>
                    <h3>Professionalism</h3>
                    <p>Expert team and service</p>
                  </div>
                </div>
                <div className="value-item">
                  <i className="fas fa-chart-line"></i>
                  <div>
                    <h3>Efficiency</h3>
                    <p>Optimized process management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="service-overview">
          <div className="service-overview-container">
            <h2>Our Services</h2>
            <p className="service-intro">
              K&C Logistics provides comprehensive logistics solutions to meet
              all your freight and warehousing needs in Orange County.
            </p>

            <div className="service-features-grid">
              <div className="service-feature-card">
                <div className="feature-icon">
                  <i className="fas fa-warehouse"></i>
                </div>
                <h3>Warehousing Services</h3>
                <p>
                  Modern warehouse facilities with climate control, inventory
                  management, and flexible storage solutions for short and long-term needs.
                </p>
                <Link href="/warehousing-services" className="btn btn-link">
                  Learn More →
                </Link>
              </div>

              <div className="service-feature-card">
                <div className="feature-icon">
                  <i className="fas fa-truck-moving"></i>
                </div>
                <h3>Trucking Services</h3>
                <p>
                  Reliable trucking with flexible capacity, dispatch support,
                  and on-time delivery for local and regional routes.
                </p>
                <Link href="/trucking" className="btn btn-link">
                  Learn More →
                </Link>
              </div>

              <div className="service-feature-card">
                <div className="feature-icon">
                  <i className="fas fa-parking"></i>
                </div>
                <h3>Truck Parking</h3>
                <p>
                  Secure 24/7 truck parking with spacious lots, staging areas,
                  and convenient access to major highways.
                </p>
                <Link href="/truck-parking" className="btn btn-link">
                  Learn More →
                </Link>
              </div>

              <div className="service-feature-card">
                <div className="feature-icon">
                  <i className="fas fa-truck-loading"></i>
                </div>
                <h3>Cross Docking</h3>
                <p>
                  Fast load transfers, freight consolidation, and repalletizing
                  services to minimize dwell time and optimize operations.
                </p>
                <Link href="/cross-docking" className="btn btn-link">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-cta-content">
            <h2>Ready to Optimize Your Logistics?</h2>
            <p>
              Contact K&C Logistics today to discuss your freight, warehousing,
              and logistics needs. Our team is ready to provide customized solutions.
            </p>
            <div className="service-cta-buttons">
              <a href="tel:7145882005" className="btn btn-primary">
                <i className="fas fa-phone-alt"></i>
                Call (714) 588-2005
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
