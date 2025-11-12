"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { generateBreadcrumbSchema } from "@/lib/schema";

export default function FAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does K&C Logistics provide?",
      answer:
        "We offer warehousing, trucking, cross docking, truck parking, pallet handling, lumping, and complete supply chain solutions.",
    },
    {
      question: "Do you offer 24/7 truck parking access?",
      answer:
        "Yes. Our gated truck yards provide secure 24/7 access with HD camera surveillance and on-site support.",
    },
    {
      question: "What types of vehicles can park at your yard?",
      answer:
        "We accommodate semi-trucks, trailers, box trucks, sprinter vans, flatbeds, and other commercial vehicles.",
    },
    {
      question: "Do you offer daily, weekly, and monthly parking rates?",
      answer:
        "Yes. We provide flexible daily, weekly, and monthly parking options to match your scheduling needs.",
    },
    {
      question: "How secure is your truck parking facility?",
      answer:
        "Every location has gated entry, HD surveillance, yard lighting, and controlled access for maximum security.",
    },
    {
      question: "Do you provide cross docking services?",
      answer:
        "Yes. We offer truck-to-truck transfers, repalletizing, relabeling, sorting, and same-day cross docking support.",
    },
    {
      question: "Can I store pallets short-term or long-term?",
      answer:
        "Absolutely. Our warehousing services cover short-term overflow and long-term pallet storage with inventory tracking.",
    },
    {
      question: "Do you offer repalletizing and pallet rebuilding?",
      answer:
        "Yes, our team performs pallet rebuilds, stretch wrapping, sorting, and SKU reconfiguration to your specs.",
    },
    {
      question: "Do you offer LTL and FTL trucking?",
      answer:
        "Yes. We provide local and regional LTL/FTL trucking, same-day pickup options, and scheduled delivery routes.",
    },
    {
      question: "Can I coordinate inbound/outbound shipments with your warehouse?",
      answer:
        "Definitely. We handle inbound receiving, outbound loading, staging, and complete distribution support.",
    },
    {
      question: "Do you offer supply chain consulting or optimization?",
      answer:
        "Yes. Our specialists provide end-to-end supply chain analysis, cost optimization, and logistics planning.",
    },
    {
      question: "Are same-day services available?",
      answer:
        "Many services—cross docking, trucking, pallet rebuilds, select warehousing tasks—can be scheduled same day based on availability.",
    },
    {
      question: "How do I get a quote for your services?",
      answer:
        "Submit our Get a Quote form, call us directly, or send a text for faster communication and pricing.",
    },
    {
      question: "Where are your facilities located?",
      answer:
        "We operate in Orange County, California with easy access to I-5, I-405, and CA-55 for convenient logistics.",
    },
    {
      question: "Do you work with carriers, 3PLs, and distribution companies?",
      answer:
        "Yes. We support carriers, brokers, 3PLs, e-commerce shippers, manufacturers, and distributors of all sizes.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "FAQ", url: "https://www.knclogistics.com/faq" }
  ]);

  return (
    <>
      <Script
        id="faq-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
        <div className="section-header">
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
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
              Contact us directly and we&apos;ll be happy to assist you.
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
    </>
  );
}
