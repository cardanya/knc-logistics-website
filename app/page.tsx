"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import HeroSlider from "@/components/HeroSlider";
import StatsCounter from "@/components/StatsCounter";
import Toast, { ToastType } from "@/components/Toast";
import MapWithSkeleton from "@/components/MapWithSkeleton";

interface FormErrors {
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  // Refs for form inputs
  const serviceRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade"
    );
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: FormErrors = {};
    let firstErrorField: HTMLElement | null = null;

    const service = formData.get("service") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!service) {
      errors.service = "Please select a service";
      if (!firstErrorField) firstErrorField = serviceRef.current;
    }

    if (!name || name.trim().length < 2) {
      errors.name = "Please enter a valid name (at least 2 characters)";
      if (!firstErrorField) firstErrorField = nameRef.current;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
      if (!firstErrorField) firstErrorField = emailRef.current;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid phone number";
      if (!firstErrorField) firstErrorField = phoneRef.current;
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Please enter a message (at least 10 characters)";
      if (!firstErrorField) firstErrorField = messageRef.current;
    }

    setFormErrors(errors);

    // Focus on first error field
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("idle");
    setFormErrors({});

    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      setToast({
        message: "Please fix the errors in the form before submitting.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: formData.get("service"),
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsLoading(false);
      setFormStatus("success");
      (e.target as HTMLFormElement).reset();

      setToast({
        message:
          data.message ||
          "Thank you for contacting us! We'll get back to you soon.",
        type: "success",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      setFormStatus("error");

      setToast({
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        type: "error",
      });

      // Clear error message after 7 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 7000);
    }
  };

  const openDirections = (destination: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main id="main-content">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="stats scroll-animate">
        <div className="stats-container">
          <StatsCounter
            icon="fas fa-calendar-check"
            targetValue="20+"
            label="Years of Experience"
          />
          <StatsCounter
            icon="fas fa-warehouse"
            targetValue="100%"
            label="Customer Satisfaction"
          />
          <StatsCounter
            icon="fas fa-shipping-fast"
            targetValue="24/7"
            label="Support Service"
          />
          <StatsCounter
            icon="fas fa-award"
            targetValue="1000+"
            label="Completed Projects"
          />
        </div>
      </section>

      {/* Cross Docking CTA Section */}
      <section className="cross-docking-cta scroll-animate">
        <div className="cta-container">
          <div className="cta-icon">
            <i className="fas fa-truck-loading"></i>
          </div>
          <h2>Cross Docking Services for Your Business</h2>
          <p>
            Cross-Docking keeps operations fast and efficient by moving goods
            directly from inbound to outbound trucks, no warehouse delay, no
            wasted time. It&rsquo;s how K&amp;C Logistics keeps your supply
            chain moving smoothly.
          </p>
          <Link href="tel:7145882005" className="cta-call-btn">
            <i className="fas fa-phone-alt"></i>
            <span>Call Us: (714) 588-2005</span>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="section-header scroll-animate">
          <h2>Comprehensive Logistics & Supply Chain Solutions</h2>
          <p>
            Professional warehousing, cross docking, freight consolidation, and
            distribution services designed to optimize your supply chain
            operations and reduce costs
          </p>
        </div>

        {/* Warehousing - Content Left, Image Right */}
        <div className="service-row reverse scroll-animate-left">
          <div className="service-content-box">
            <div className="service-icon">
              <i className="fas fa-warehouse"></i>
            </div>
            <h3>Warehousing & Distribution Services</h3>
            <p>
              State-of-the-art warehouse facilities offering secure storage,
              advanced inventory management, and efficient distribution
              solutions. Our warehousing services include cross docking
              capabilities, freight handling, and strategic distribution center
              operations to optimize your supply chain.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> Climate-controlled
                storage facilities
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Real-time inventory
                management systems
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Multi-dock loading
                facilities
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Flexible short &
                long-term storage
              </li>
            </ul>
            <Link href="/warehousing-services" className="learn-more-btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-image">
            <Image
              src="/warehousing-service.jpg"
              alt="K&C Logistics modern warehousing facilities with organized storage and cross docking services"
              width={600}
              height={400}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Supply Chain - Image Left, Content Right */}
        <div className="service-row scroll-animate-right">
          <div className="service-image">
            <Image
              src="/supply-chain-service.jpg"
              alt="K&C Logistics supply chain management and freight distribution network"
              width={600}
              height={400}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="service-content-box">
            <div className="service-icon">
              <i className="fas fa-network-wired"></i>
            </div>
            <h3>Supply Chain & Logistics Management</h3>
            <p>
              Complete supply chain solutions with integrated cross docking,
              freight consolidation, and transloading services. We optimize
              logistics operations through strategic planning, advanced tracking
              systems, and efficient cargo handling to reduce costs and improve
              delivery performance across your distribution network.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> End-to-end supply chain
                management
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Real-time freight
                tracking & visibility
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Cross docking &
                consolidation services
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Just-in-time delivery
                optimization
              </li>
            </ul>
            <Link href="/supply-chain-solutions" className="learn-more-btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Parking - Content Left, Image Right */}
        <div className="service-row reverse scroll-animate-left">
          <div className="service-content-box">
            <div className="service-icon">
              <i className="fas fa-parking"></i>
            </div>
            <h3>Professional Truck Parking & Staging</h3>
            <p>
              Secure truck parking and freight staging solutions with 24/7
              access for commercial vehicles. Our facilities support cross
              docking operations, transloading activities, and temporary freight
              storage with convenient access for efficient logistics operations
              and cargo transfer.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> 24/7 secure truck
                parking access
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Monitored facilities
                with security
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Staging areas for
                freight operations
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Strategic location for
                distribution
              </li>
            </ul>
            <Link href="/parking-solutions" className="learn-more-btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-image">
            <Image
              src="/parking-service.jpg"
              alt="K&C Logistics truck parking facilities with secure overnight parking and easy access"
              width={600}
              height={400}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about scroll-animate" id="about">
        <div className="about-container">
          <div className="about-image">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
              alt="K&C Logistics warehousing and truck parking facilities in Santa Ana, Orange County"
              width={800}
              height={600}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
            />
          </div>
          <div className="about-content">
            <h2>Leading Cross Docking & Logistics Solutions Provider</h2>
            <p>
              K&C Logistics specializes in professional cross docking services,
              freight consolidation, and comprehensive supply chain management
              solutions. With over 20 years of experience in warehousing,
              transloading, and distribution operations, we help businesses
              optimize their logistics processes, reduce operational costs, and
              improve delivery efficiency.
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
                  <h4>Reliability</h4>
                  <p>20 years of industry experience</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Speed</h4>
                  <p>On-time delivery guarantee</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-handshake"></i>
                <div>
                  <h4>Professionalism</h4>
                  <p>Expert team and service</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-chart-line"></i>
                <div>
                  <h4>Efficiency</h4>
                  <p>Optimized process management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="section-header scroll-animate">
          <h2>Contact Us</h2>
          <p>
            Get in touch with us for your questions or requests. We&apos;ll get
            back to you as soon as possible.
          </p>
        </div>
        <div className="contact-container">
          <div className="contact-info scroll-animate-left">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Our Addresses</h4>
                <div className="address-entry">
                  <div>
                    <strong>
                      K&C Warehousing, Cross Docking, Lumper Services and
                      Trucking
                    </strong>
                    <span>3060 Daimler St, Santa Ana, CA 92705</span>
                  </div>
                  <button
                    className="address-directions-btn"
                    onClick={() =>
                      openDirections(
                        "K&C Warehousing, Cross Docking, Lumper Services and Trucking, 3060 Daimler St, Santa Ana, CA 92705"
                      )
                    }
                    aria-label="Get directions to K&C Warehousing"
                  >
                    <i className="fas fa-directions"></i>
                  </button>
                </div>
                <div className="address-entry">
                  <div>
                    <strong>Orange County Truck Stop & Warehousing</strong>
                    <span>3100 S Standard Ave, Santa Ana, CA 92705</span>
                  </div>
                  <button
                    className="address-directions-btn"
                    onClick={() =>
                      openDirections(
                        "Orange County Truck Stop & Warehousing, 3100 S Standard Ave, Santa Ana, CA 92705"
                      )
                    }
                    aria-label="Get directions to Orange County Truck Stop"
                  >
                    <i className="fas fa-directions"></i>
                  </button>
                </div>
                <div className="address-entry">
                  <div>
                    <strong>K&C Logistics, Warehousing Alton Branch</strong>
                    <span>133 E Alton Ave, Santa Ana, CA 92707</span>
                  </div>
                  <button
                    className="address-directions-btn"
                    onClick={() =>
                      openDirections(
                        "K&C Logistics, Warehousing Alton Branch, 133 E Alton Ave, Santa Ana, CA 92707"
                      )
                    }
                    aria-label="Get directions to K&C Alton Branch"
                  >
                    <i className="fas fa-directions"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone Numbers</h4>
                <p>
                  <strong>Direct:</strong>{" "}
                  <a href="tel:+19494844686">(949) 484-4686</a>
                </p>
                <p>
                  <strong>Cell:</strong>{" "}
                  <a href="tel:+17145882005">(714) 588-2005</a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/17149097190"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (714) 909-7190
                  </a>
                </p>
                <p>
                  <strong>Fax:</strong> (949) 484-7146
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:info@knclogistics.com">
                    info@knclogistics.com
                  </a>
                </p>
                <p>
                  <a href="mailto:info@orangecountytruckstop.com">
                    info@orangecountytruckstop.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Working Hours</h4>
                <p>Monday - Sunday: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <form
            className="contact-form scroll-animate-right"
            onSubmit={handleContactSubmit}
          >
            {formStatus === "success" && (
              <div
                className="form-alert success"
                role="status"
                aria-live="polite"
              >
                <i className="fas fa-check-circle"></i>
                <span>
                  Your message has been sent successfully! We will get back to
                  you as soon as possible.
                </span>
              </div>
            )}

            <div className={`form-group ${formErrors.service ? "error" : ""}`}>
              <label htmlFor="service">Service Interest</label>
              <select
                id="service"
                name="service"
                ref={serviceRef}
                required
                autoComplete="off"
                aria-invalid={formErrors.service ? "true" : "false"}
                aria-describedby={
                  formErrors.service ? "service-error" : undefined
                }
              >
                <option value="">Select a service...</option>
                <option value="parking">Parking Solutions</option>
                <option value="warehousing">Warehousing Services</option>
                <option value="supply-chain">Supply Chain Solutions</option>
              </select>
              {formErrors.service && (
                <span id="service-error" className="error-message" role="alert">
                  {formErrors.service}
                </span>
              )}
            </div>

            <div className={`form-group ${formErrors.name ? "error" : ""}`}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                ref={nameRef}
                required
                minLength={2}
                autoComplete="name"
                aria-invalid={formErrors.name ? "true" : "false"}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {formErrors.name}
                </span>
              )}
            </div>

            <div className={`form-group ${formErrors.email ? "error" : ""}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                ref={emailRef}
                required
                autoComplete="email"
                aria-invalid={formErrors.email ? "true" : "false"}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {formErrors.email}
                </span>
              )}
            </div>

            <div className={`form-group ${formErrors.phone ? "error" : ""}`}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (XXX) XXX-XXXX"
                ref={phoneRef}
                autoComplete="tel"
                aria-invalid={formErrors.phone ? "true" : "false"}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
              />
              {formErrors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {formErrors.phone}
                </span>
              )}
            </div>

            <div className={`form-group ${formErrors.message ? "error" : ""}`}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                ref={messageRef}
                required
                minLength={10}
                autoComplete="off"
                aria-invalid={formErrors.message ? "true" : "false"}
                aria-describedby={
                  formErrors.message ? "message-error" : undefined
                }
              ></textarea>
              {formErrors.message && (
                <span id="message-error" className="error-message" role="alert">
                  {formErrors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading && <span className="spinner"></span>}
              <span>
                <i className="fas fa-paper-plane"></i>{" "}
                {isLoading ? "Sending..." : "Send Message"}
              </span>
            </button>
          </form>
        </div>
      </section>



      {/* CTA Section */}
      <section className="cta scroll-animate">
        <div className="cta-content">
          <h2>
            Transform Your Supply Chain with Expert Cross Docking Solutions
          </h2>
          <p>
            Optimize your freight operations with our comprehensive cross
            docking, warehousing, and logistics management services. Reduce
            costs, improve efficiency, and accelerate delivery times with K&C
            Logistics - your trusted partner for freight consolidation,
            transloading, and complete supply chain optimization.
          </p>
          <Link
            href="tel:7145882005"
            className="btn btn-primary"
            style={{ background: "var(--accent-color)" }}
          >
            <i className="fas fa-phone-alt"></i>
            <span>Call Us Now</span>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="section-header scroll-animate">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our services</p>
        </div>
        <div className="faq-container">
          {[
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
                "You can easily book parking through our online booking system. Simply select your location, vehicle type, dates, and payment method. You'll receive immediate confirmation of your reservation.",
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
                "We accept cash, Zelle, and online payments for your convenience. Payment is typically required at the time of booking or check-in.",
            },
          ].map((faq, index) => (
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
                <h3>{faq.question}</h3>
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
      </section>



      {/* Maps Section */}
      <section className="maps-section">
        <div className="section-header scroll-animate" style={{ marginTop: "4rem" }}>
          <h2>Our Locations</h2>
          <p>Visit us at any of our three convenient Orange County locations</p>
        </div>
        <div className="maps-grid">
          <div className="map-card scroll-animate-fade">
            <h3>
              <i className="fas fa-map-marker-alt"></i> K&C Warehousing & Trucking
            </h3>
            <p>3060 Daimler St, Santa Ana, CA 92705</p>
            <MapWithSkeleton
              src="https://maps.google.com/maps?q=K%26C%20Warehousing%2C%20Cross%20Docking%2C%20Lumper%20Services%2C%20Trucking&output=embed"
              title="Map of K&C Warehousing and Trucking location"
            />
            <button
              className="map-directions-btn"
              onClick={() =>
                openDirections(
                  "K&C Warehousing, Cross Docking, Lumper Services, Trucking"
                )
              }
              aria-label="Get directions to K&C Warehousing & Trucking"
            >
              <i className="fas fa-directions"></i>
              Get Directions
            </button>
          </div>

          <div className="map-card scroll-animate-fade">
            <h3>
              <i className="fas fa-map-marker-alt"></i> Orange County Truck Stop
            </h3>
            <p>3100 S Standard Ave, Santa Ana, CA 92705</p>
            <MapWithSkeleton
              src="https://maps.google.com/maps?q=Orange%20County%20Truck%20Stop%20%26%20Warehousing&output=embed"
              title="Map of Orange County Truck Stop and Warehousing"
            />
            <button
              className="map-directions-btn"
              onClick={() => openDirections("Orange County Truck Stop & Warehousing")}
              aria-label="Get directions to Orange County Truck Stop & Warehousing"
            >
              <i className="fas fa-directions"></i>
              Get Directions
            </button>
          </div>

          <div className="map-card scroll-animate-fade">
            <h3>
              <i className="fas fa-map-marker-alt"></i> K&C Alton Branch
            </h3>
            <p>133 E Alton Ave, Santa Ana, CA 92707</p>
            <MapWithSkeleton
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.2!2d-117.8670!3d33.7420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd7e1a0b8c6d5%3A0x3456789012cdefgh!2s133%20E%20Alton%20Ave%2C%20Santa%20Ana%2C%20CA%2092707!5e0!3m2!1sen!2sus!4v1234567892"
              title="Map of K&C Logistics Alton Branch"
            />
            <button
              className="map-directions-btn"
              onClick={() =>
                openDirections("K&C Alton Branch, 133 E Alton Ave, Santa Ana CA")
              }
              aria-label="Get directions to K&C Alton Branch"
            >
              <i className="fas fa-directions"></i>
              Get Directions
            </button>
          </div>
        </div>
      </section>



      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
