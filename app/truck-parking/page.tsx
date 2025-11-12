import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { generateServiceMetadata, serviceMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/schema";

export const metadata = generateServiceMetadata(serviceMetadata.truckParking);

export default function TruckParking() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    {
      name: "Truck Parking",
      url: "https://www.knclogistics.com/truck-parking",
    },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Truck Parking Solutions",
    description:
      "Professional truck parking and staging in Santa Ana with 24/7 secure access",
    provider: "K&C Logistics",
    areaServed: "Orange County, California",
    url: "https://www.knclogistics.com/truck-parking",
  });

  return (
    <>
      <Script
        id="parking-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="parking-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Truck Parking</span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="service-detail-hero">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <h1>Professional Truck Parking</h1>
              <p>
                Secure truck parking facilities in Santa Ana with 24/7 access,
                convenient amenities, and strategic location near major
                highways. K&C Logistics provides safe, affordable parking
                solutions for owner operators and fleet managers throughout
                Orange County.
              </p>
              <a
                href="https://www.orangecountytruckstop.com/reserve-parking-spot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Reserve a Spot
              </a>
            </div>
            <div className="service-hero-image">
              <Image
                src="/parking-service.jpg"
                alt="K&C Logistics truck parking facilities"
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
            <h2>Our Truck Parking Includes:</h2>
            <p className="service-intro">
              Secure yard storage with the amenities drivers and fleets need to
              stay safe and operational 24/7.
            </p>
            <ul className="capabilities-list">
              <li>
                <i className="fas fa-check-circle"></i>
                <span>24/7 gated yard access</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>HD security cameras</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Semi-truck, trailer, box truck &amp; sprinter parking</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Daily, weekly &amp; monthly rates</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Oversized &amp; dedicated spots</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Wide turning radius for easy maneuvering</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>On-site staff &amp; support</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Quick freeway access (I-5, 405, 55)</span>
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                <span>Add-on services: warehousing, cross docking, lumping</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="why-choose-container">
            <h2>Why Choose K&C Logistics for Truck Parking?</h2>
            <div className="why-choose-grid">
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Safe & Secure</h3>
                  <p>
                    24/7 surveillance and controlled access for peace of mind
                  </p>
                </div>
              </div>
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Convenient Location</h3>
                  <p>Minutes from major highways and distribution hubs</p>
                </div>
              </div>
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Easy In/Out Access</h3>
                  <p>No hassle entry and exit for quick turnaround</p>
                </div>
              </div>
              <div className="why-choose-item">
                <i className="fas fa-check-circle"></i>
                <div>
                  <h3>Affordable Rates</h3>
                  <p>Competitive pricing with transparent fee structure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-cta-content">
            <h2>Reserve Your Parking Spot Today</h2>
            <p>
              Contact K&C Logistics to learn more about our truck parking
              solutions and secure your spot at our Santa Ana facility.
            </p>
            <div className="service-cta-buttons">
              <a href="tel:7145882005" className="btn btn-primary">
                <i className="fas fa-phone-alt"></i>
                Call (714) 588-2005
              </a>
              <a
                href="https://www.orangecountytruckstop.com/reserve-parking-spot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Reserve a Spot
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
