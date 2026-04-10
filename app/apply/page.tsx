import Link from "next/link";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/schema";

const openPositions = [
  {
    title: "Drive for Us",
    subtitle: "Company Driver",
    location: "K&C Logistics — Santa Ana, CA",
    description:
      "Join our team of professional CDL-A drivers. Competitive pay up to $0.65/mile, weekly direct deposit, guaranteed home time, and no forced dispatch. Solo and team driver positions available.",
    icon: "fas fa-truck",
    href: "/drive-for-us",
    tags: ["CDL-A Required", "Full-Time", "OTR"],
  },
  {
    title: "Supply Chain and Systems Optimization Specialist",
    subtitle: "Operations & Technology",
    location: "K&C Logistics — 133 E Alton Ave., Santa Ana, CA 92707",
    description:
      "Plan, analyze, and digitize logistics supply chain operations to enhance performance, accuracy, and profitability. Integrate AI-driven digitalization to support modernization and international expansion with a focus on Turkish market partnerships.",
    icon: "fas fa-diagram-project",
    href: "/apply/supply-chain-specialist",
    tags: ["Full-Time", "On-Site", "Turkish Required"],
  },
  {
    title: "Dispatcher",
    subtitle: "Logistics & Transportation",
    location: "K&C Logistics — 133 E Alton Ave., Santa Ana, CA 92707",
    description:
      "Coordinate daily logistics and transportation operations. Schedule shipments, communicate with drivers, track deliveries, and ensure timely and efficient service. 5+ years of logistics or dispatching experience required.",
    icon: "fas fa-headset",
    href: "/apply/dispatcher",
    tags: ["Full-Time", "On-Site", "5+ Years Exp."],
  },
  {
    title: "Logistics Sales Representative Officer",
    subtitle: "Sales & Customer Service",
    location: "Irvine, CA & Santa Ana, CA",
    description:
      "Assist customers with truck rentals, promote services, and support daily yard operations. Energetic and sales-driven candidates with strong communication skills are encouraged to apply.",
    icon: "fas fa-handshake",
    href: "/apply/logistics-sales-representative",
    tags: ["Full-Time", "In-Person", "Flexible Schedule"],
  },
  {
    title: "Diesel Mechanic",
    subtitle: "Maintenance & Repair",
    location: "K&C Logistics — Santa Ana, CA",
    description:
      "Inspect, maintain, and repair trucks and trailers to ensure safe and efficient operation. Diagnose mechanical and electrical issues, perform preventive maintenance, and keep accurate maintenance records.",
    icon: "fas fa-wrench",
    href: "/apply/diesel-mechanic",
    tags: ["Full-Time", "In-Person", "2-3 Years Exp."],
  },
  {
    title: "Night Guard",
    subtitle: "Security & Yard Safety",
    location: "K&C Logistics — Santa Ana, CA",
    description:
      "Ensure the safety and security of our yard and equipment during overnight hours. Monitor premises, conduct routine patrols, prevent unauthorized access, and keep incident logs.",
    icon: "fas fa-shield-halved",
    href: "/apply/night-guard",
    tags: ["Full-Time", "In-Person", "Night Shift"],
  },
  {
    title: "Office Staff / Operations Specialist",
    subtitle: "Administration & Operations",
    location: "K&C Logistics — Santa Ana, CA",
    description:
      "Support daily administrative and logistics operations. Oversee general office tasks, maintain records, coordinate scheduling, and ensure smooth communication between departments. 5+ years of experience required.",
    icon: "fas fa-building-user",
    href: "/apply/office-operations-specialist",
    tags: ["Full-Time", "In-Person", "5+ Years Exp.", "Bilingual"],
  },
];

export default function Apply() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Careers", url: "https://www.knclogistics.com/apply" },
  ]);

  return (
    <>
      <Script
        id="apply-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="breadcrumb-container">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Careers</span>
          </div>
        </section>

        <section className="contact" id="careers">
          {/* Hero */}
          <div className="section-header">
            <h1>K&C Logistics Careers</h1>
            <p>
              With over 20 years of experience, we provide companies with safe,
              efficient, and reliable transportation solutions across the United
              States. Join our growing team and build your career with us.
            </p>
          </div>

          {/* Open Positions */}
          <div className="full-width-section">
            <div className="section-header">
              <h2>Open Positions</h2>
              <p>
                We are actively hiring for the following roles. Click on a
                position to learn more and apply.
              </p>
            </div>

            <div className="open-positions-list">
              {openPositions.map((position) => (
                <Link
                  key={position.href}
                  href={position.href}
                  className="position-card"
                >
                  <div className="position-card-icon">
                    <i className={position.icon}></i>
                  </div>
                  <div className="position-card-body">
                    <div className="position-card-header">
                      <div>
                        <h3 className="position-card-title">{position.title}</h3>
                        <p className="position-card-subtitle">
                          {position.subtitle}
                        </p>
                      </div>
                      <i className="fas fa-arrow-right position-card-arrow"></i>
                    </div>
                    <p className="position-card-location">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {position.location}
                    </p>
                    <p className="position-card-description">
                      {position.description}
                    </p>
                    <div className="position-card-tags">
                      {position.tags.map((tag) => (
                        <span key={tag} className="position-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
