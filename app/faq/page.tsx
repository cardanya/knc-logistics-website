"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useEffect } from "react";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface FAQ {
  id: number;
  category: 'parking' | 'warehousing' | 'trucking' | 'cross-docking' | 'general';
  question: string;
  answer: string;
  featured?: boolean;
  popular?: boolean;
  icon: string;
  tags: string[];
}

export default function FAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>([]);

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const faqs: FAQ[] = [
    {
      id: 1,
      category: "general",
      question: "What services does K&C Logistics provide?",
      answer:
        "We offer warehousing, trucking, cross docking, truck parking, pallet handling, lumping, and complete supply chain solutions.",
      featured: true,
      popular: true,
      icon: "fas fa-boxes",
      tags: ["services", "overview", "capabilities", "solutions"]
    },
    {
      id: 2,
      category: "parking",
      question: "Do you offer 24/7 truck parking access?",
      answer:
        "Yes. Our gated truck yards provide secure 24/7 access with HD camera surveillance and on-site support.",
      featured: true,
      popular: true,
      icon: "fas fa-clock",
      tags: ["parking", "access", "24/7", "availability", "hours"]
    },
    {
      id: 3,
      category: "parking",
      question: "What types of vehicles can park at your yard?",
      answer:
        "We accommodate semi-trucks, trailers, box trucks, sprinter vans, flatbeds, and other commercial vehicles.",
      icon: "fas fa-truck",
      tags: ["parking", "vehicles", "trucks", "capacity"]
    },
    {
      id: 4,
      category: "parking",
      question: "Do you offer daily, weekly, and monthly parking rates?",
      answer:
        "Yes. We provide flexible daily, weekly, and monthly parking options to match your scheduling needs.",
      icon: "fas fa-calendar-alt",
      tags: ["parking", "rates", "pricing", "flexible", "daily", "weekly", "monthly"]
    },
    {
      id: 5,
      category: "parking",
      question: "How secure is your truck parking facility?",
      answer:
        "Every location has gated entry, HD surveillance, yard lighting, and controlled access for maximum security.",
      popular: true,
      icon: "fas fa-shield-alt",
      tags: ["parking", "security", "surveillance", "safety", "protected"]
    },
    {
      id: 6,
      category: "cross-docking",
      question: "Do you provide cross docking services?",
      answer:
        "Yes. We offer truck-to-truck transfers, repalletizing, relabeling, sorting, and same-day cross docking support.",
      icon: "fas fa-exchange-alt",
      tags: ["cross docking", "transfers", "sorting", "relabeling"]
    },
    {
      id: 7,
      category: "warehousing",
      question: "Can I store pallets short-term or long-term?",
      answer:
        "Absolutely. Our warehousing services cover short-term overflow and long-term pallet storage with inventory tracking.",
      popular: true,
      icon: "fas fa-warehouse",
      tags: ["warehousing", "storage", "pallets", "inventory", "short-term", "long-term"]
    },
    {
      id: 8,
      category: "warehousing",
      question: "Do you offer repalletizing and pallet rebuilding?",
      answer:
        "Yes, our team performs pallet rebuilds, stretch wrapping, sorting, and SKU reconfiguration to your specs.",
      icon: "fas fa-tools",
      tags: ["warehousing", "pallets", "rebuilding", "wrapping", "SKU"]
    },
    {
      id: 9,
      category: "trucking",
      question: "Do you offer LTL and FTL trucking?",
      answer:
        "Yes. We provide local and regional LTL/FTL trucking, same-day pickup options, and scheduled delivery routes.",
      popular: true,
      icon: "fas fa-shipping-fast",
      tags: ["trucking", "LTL", "FTL", "delivery", "transport", "shipping"]
    },
    {
      id: 10,
      category: "warehousing",
      question: "Can I coordinate inbound/outbound shipments with your warehouse?",
      answer:
        "Definitely. We handle inbound receiving, outbound loading, staging, and complete distribution support.",
      icon: "fas fa-dolly",
      tags: ["warehousing", "shipments", "inbound", "outbound", "distribution"]
    },
    {
      id: 11,
      category: "general",
      question: "Do you offer supply chain consulting or optimization?",
      answer:
        "Yes. Our specialists provide end-to-end supply chain analysis, cost optimization, and logistics planning.",
      icon: "fas fa-chart-line",
      tags: ["consulting", "optimization", "supply chain", "analysis", "planning"]
    },
    {
      id: 12,
      category: "trucking",
      question: "Are same-day services available?",
      answer:
        "Many services—cross docking, trucking, pallet rebuilds, select warehousing tasks—can be scheduled same day based on availability.",
      featured: true,
      icon: "fas fa-bolt",
      tags: ["same-day", "fast", "quick", "urgent", "express"]
    },
    {
      id: 13,
      category: "general",
      question: "How do I get a quote for your services?",
      answer:
        "Submit our Get a Quote form, call us directly, or send a text for faster communication and pricing.",
      icon: "fas fa-file-invoice-dollar",
      tags: ["quote", "pricing", "contact", "estimate"]
    },
    {
      id: 14,
      category: "parking",
      question: "Where are your facilities located?",
      answer:
        "We operate in Orange County, California with easy access to I-5, I-405, and CA-55 for convenient logistics.",
      icon: "fas fa-map-marker-alt",
      tags: ["location", "facilities", "Orange County", "California", "address"]
    },
    {
      id: 15,
      category: "trucking",
      question: "Do you work with carriers, 3PLs, and distribution companies?",
      answer:
        "Yes. We support carriers, brokers, 3PLs, e-commerce shippers, manufacturers, and distributors of all sizes.",
      icon: "fas fa-handshake",
      tags: ["partners", "3PL", "carriers", "brokers", "distribution"]
    },
    {
      id: 16,
      category: "cross-docking",
      question: "What is the turnaround time for cross docking?",
      answer:
        "Most cross docking operations are completed within 24 hours. Same-day service is available for urgent shipments based on availability.",
      icon: "fas fa-stopwatch",
      tags: ["cross docking", "turnaround", "speed", "timing", "fast"]
    },
  ];

  // Filter logic
  useEffect(() => {
    let results = faqs;

    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(faq => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredFAQs(results);
  }, [searchQuery, activeCategory, faqs]);

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
        {/* Hero Section */}
        <div className="faq-hero">
          <h1 className="faq-hero-title">
            Your Questions, Answered
          </h1>
          <p className="faq-hero-subtitle">
            Find everything you need to know about our logistics services
          </p>
          <div className="faq-search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for parking, warehousing, trucking..."
              className="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <div className="faq-quick-stats">
            <div className="stat-item">
              <span className="stat-number">{faqs.length}</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="faq-categories">
          <button
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <i className="fas fa-th-large"></i> All
          </button>
          <button
            className={`category-pill ${activeCategory === 'parking' ? 'active' : ''}`}
            onClick={() => setActiveCategory('parking')}
          >
            <i className="fas fa-truck"></i> Truck Parking
          </button>
          <button
            className={`category-pill ${activeCategory === 'warehousing' ? 'active' : ''}`}
            onClick={() => setActiveCategory('warehousing')}
          >
            <i className="fas fa-warehouse"></i> Warehousing
          </button>
          <button
            className={`category-pill ${activeCategory === 'trucking' ? 'active' : ''}`}
            onClick={() => setActiveCategory('trucking')}
          >
            <i className="fas fa-shipping-fast"></i> Trucking
          </button>
          <button
            className={`category-pill ${activeCategory === 'cross-docking' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cross-docking')}
          >
            <i className="fas fa-exchange-alt"></i> Cross Docking
          </button>
          <button
            className={`category-pill ${activeCategory === 'general' ? 'active' : ''}`}
            onClick={() => setActiveCategory('general')}
          >
            <i className="fas fa-info-circle"></i> General
          </button>
        </div>

        {/* FAQ Grid */}
        {filteredFAQs.length > 0 ? (
          <div className="faq-grid">
            {/* Featured FAQs */}
            {filteredFAQs.filter(faq => faq.featured).map((faq) => (
              <div key={faq.id} className="faq-featured">
                <div className="featured-icon">
                  <i className={faq.icon}></i>
                </div>
                <div className="featured-content">
                  <span className="featured-badge">Most Popular</span>
                  <h3 className="featured-question">{faq.question}</h3>
                  <p className="featured-answer">{faq.answer}</p>
                </div>
              </div>
            ))}

            {/* Standard FAQ Cards */}
            {filteredFAQs.filter(faq => !faq.featured).map((faq, index) => (
              <div
                key={faq.id}
                className={`faq-card ${activeFAQ === faq.id ? 'expanded' : ''}`}
                data-category={faq.category}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="faq-card-header" onClick={() => toggleFAQ(faq.id)}>
                  <div className="faq-card-icon">
                    <i className={faq.icon}></i>
                  </div>
                  <h3 className="faq-card-question">{faq.question}</h3>
                  <div className="faq-card-toggle">
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
                <div className="faq-card-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="faq-no-results">
            <i className="fas fa-search"></i>
            <h3>No results found</h3>
            <p>Try adjusting your search or browse all categories</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Show All FAQs
            </button>
          </div>
        )}

        {/* Custom FAQ CTA Section */}
        <div className="faq-cta">
          <div className="faq-cta-content">
            <div className="faq-cta-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h2>Still Have Questions?</h2>
            <p>
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
              Contact us directly and we&apos;ll be happy to assist you.
            </p>
            <div className="faq-cta-buttons">
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
