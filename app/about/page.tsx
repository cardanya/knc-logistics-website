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
        <section className="about-page about-page-full" id="about">
          <div className="about-container">
            <div className="about-content">
              <h1>Your Trusted Partner in Logistics &amp; Supply Chain Excellence</h1>
              <h2>Delivering Reliable, Efficient, and End-to-End Logistics Solutions</h2>
              <p>
                At K&amp;C Logistics, we are committed to offering reliable and scalable logistics solutions that help businesses move freight faster, store smarter, and operate more efficiently. Based in Orange County, California, we specialize in warehousing, trucking, cross docking, truck parking, and integrated supply chain services designed to support carriers, 3PLs, manufacturers, and distributors across the region.
              </p>
              <p>
                With a customer-first approach, professional handling, and 24/7 operational support, we ensure every shipment, pallet, and vehicle is managed with precision. Our mission is to deliver logistics services that are dependable, flexible, cost-efficient, and built for real-world demands. As a growing logistics provider, we continue to invest in secure facilities, advanced yard management processes, and a team dedicated to making supply chain operations smoother for every client we serve.
              </p>

              <div className="values-grid">
                <div className="value-item">
                  <i className="fas fa-handshake"></i>
                  <div>
                    <h3>Integrity &amp; Transparency</h3>
                    <p>We communicate clearly, stay accountable, and prioritize trust in every partnership.</p>
                  </div>
                </div>
                <div className="value-item">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <h3>Reliability &amp; Consistency</h3>
                    <p>From storage to transport, we operate with precision and deliver on time.</p>
                  </div>
                </div>
                <div className="value-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <h3>Customer-First Service</h3>
                    <p>Your operations come first. We adapt to your schedule, volume, and needs.</p>
                  </div>
                </div>
                <div className="value-item">
                  <i className="fas fa-expand-alt"></i>
                  <div>
                    <h3>Scalable Solutions</h3>
                    <p>From single loads to full supply chain management, our services grow with you.</p>
                  </div>
                </div>
              </div>

              <div className="mission-block">
                <h3>Mission Statement</h3>
                <p>
                  To simplify logistics by providing secure, fast, and dependable solutions that support the success of our partners and the communities we serve.
                </p>
              </div>

              <div className="operation-area">
                <h3>Where We Operate</h3>
                <p>
                  Proudly serving Orange County and Southern California, with easy access to major freeways including I-5, 405, and 55.
                </p>
              </div>

              <div className="about-cta">
                <p>
                  Want to partner with a logistics team you can depend on? We&apos;re here to support your warehousing, trucking, and supply chain needs.
                </p>
                <div className="about-cta-buttons">
                  <Link href="/contact" className="btn btn-primary">
                    Get a Quote
                  </Link>
                  <a href="tel:7145882005" className="btn btn-secondary">
                    Call/Text Us
                  </a>
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
                <Link href="/warehousing-services" className="learn-more-btn">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
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
                <Link href="/trucking" className="learn-more-btn">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="service-feature-card">
                <div className="feature-icon">
                  <i className="fas fa-network-wired"></i>
                </div>
                <h3>Supply Chain Solutions</h3>
                <p>
                  End-to-end supply chain management with real-time tracking, freight
                  consolidation, and complete logistics optimization.
                </p>
                <Link href="/supply-chain-solutions" className="learn-more-btn">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
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
                <Link href="/truck-parking" className="learn-more-btn">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Main CTA Section */}
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
              <a
                href="https://wa.me/17145882005"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
