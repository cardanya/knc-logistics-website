"use client";

import Link from "next/link";
import { useState } from "react";

export default function FAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of vehicles can I park at your facilities?",
      answer:
        "We accommodate all types of commercial vehicles including semi-trucks with trailers, solo tractors, trailers only, and box trucks. Our facilities have ample space for vehicles of various sizes.",
    },
    {
      question: "Do you offer 24/7 access to parking and warehousing?",
      answer:
        "Yes! We provide 24/7 access to both our parking facilities and warehousing services. You can access your vehicle or inventory whenever you need it, day or night.",
    },
    {
      question: "What security measures do you have in place?",
      answer:
        "Our facilities feature 24/7 video surveillance, well-lit parking areas, secure fencing, and regular security patrols. We take the safety of your vehicles and cargo very seriously.",
    },
    {
      question: "How do I make a parking reservation?",
      answer:
        "You can easily book parking through our online booking system at orangecountytruckstop.com. Simply select your location, vehicle type, dates, and payment method. You'll receive immediate confirmation of your reservation. You can also call us at (714) 588-2005.",
    },
    {
      question: "What warehousing services do you provide?",
      answer:
        "We offer comprehensive warehousing services including short and long-term storage, inventory management, cross-docking, transloading, palletizing, and order fulfillment. Our modern facilities are equipped to handle various storage needs.",
    },
    {
      question: "Do you offer monthly parking rates?",
      answer:
        "Yes, we offer competitive daily, weekly, and monthly parking rates. Monthly rates provide the best value for long-term parking needs. Contact us for current pricing and any available discounts.",
    },
    {
      question: "Where are your facilities located?",
      answer:
        "We have three convenient locations in Orange County: our main facility on Daimler St in Santa Ana, Orange County Truck Stop on S Standard Ave, and our Alton Branch location. All locations offer easy access to major highways and ports.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, Zelle, credit/debit cards, and online payments for your convenience. Payment is typically required at the time of booking or check-in.",
    },
    {
      question: "What is cross docking and how does it work?",
      answer:
        "Cross docking is the process of transferring freight directly from inbound to outbound trucks with minimal or no storage time. We unload, sort, and reload cargo efficiently to reduce dwell time and transportation costs. This is ideal for time-sensitive shipments and freight consolidation.",
    },
    {
      question: "Do you provide trucking services?",
      answer:
        "Yes, we offer reliable trucking services throughout Orange County and Southern California. Our services include local deliveries, regional routes, dedicated lanes, and flexible capacity options with professional dispatch support.",
    },
    {
      question: "Can I visit your facilities before booking?",
      answer:
        "Absolutely! We welcome facility tours. Please call us at (714) 588-2005 to schedule a visit. Our team will be happy to show you our facilities and answer any questions you may have.",
    },
    {
      question: "What are your cancellation policies?",
      answer:
        "Cancellation policies vary by service. For parking reservations, we typically require 24-hour notice for cancellations to receive a full refund. For warehousing and other services, please contact us to discuss specific terms and conditions.",
    },
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <div className="breadcrumb-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>FAQ</span>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="section-header scroll-animate">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services</p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFAQ === index ? "active" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFAQ(index);
                  }
                }}
                aria-expanded={activeFAQ === index}
                aria-controls={`faq-answer-${index}`}
                type="button"
              >
                <h2>{faq.question}</h2>
                <i className="fas fa-chevron-down"></i>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                aria-hidden={activeFAQ !== index}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="service-cta" style={{ marginTop: "4rem" }}>
          <div className="service-cta-content">
            <h2>Still Have Questions?</h2>
            <p>
              Can't find the answer you're looking for? Our team is here to help.
              Contact us directly and we'll be happy to assist you.
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
        </div>
      </section>
    </main>
  );
}
