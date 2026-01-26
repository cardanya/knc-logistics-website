"use client";

import Link from "next/link";
import Image from "next/image";
import { validateEmail, validatePhone } from "@/lib/utils/validation";
import { useState, useEffect, useRef } from "react";
import HeroSlider from "@/components/HeroSlider";
import StatsCounter from "@/components/StatsCounter";
import Toast, { ToastType } from "@/components/Toast";
import MapWithSkeleton from "@/components/MapWithSkeleton";
import { useRecaptcha } from "@/lib/useRecaptcha";
import { COMPANY_INFO, getTelLink, getWhatsAppLink, getMailtoLink } from "@/lib/constants";
import { submitContactForm } from "@/lib/api/contact";

interface FormErrors {
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for form inputs
  const serviceRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { executeRecaptcha } = useRecaptcha();

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

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);


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

    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
      if (!firstErrorField) firstErrorField = emailRef.current;
    }

    if (phone && !validatePhone(phone)) {
      errors.phone = "Phone number must be valid and contain at least 10 digits";
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

    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha('contact_form');
    if (!recaptchaToken) {
      setFormErrors({
        ...formErrors,
      });
      setToast({
        message: 'Security verification failed. Please try again.',
        type: 'error'
      });
      setIsLoading(false);
      return;
    }

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
          recaptchaToken,
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
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = setTimeout(() => {
        setFormStatus("idle");
        successTimeoutRef.current = null;
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
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        setFormStatus("idle");
        errorTimeoutRef.current = null;
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
      <section className="stats">
        <div className="stats-container">
          <StatsCounter
            icon="fas fa-calendar-check"
            targetValue="20+"
            label="Years of Experience"
          />
          <StatsCounter
            icon="fas fa-warehouse"
            targetValue="99%"
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
          <h2>Need Immediate Cross Docking Support?</h2>
          <p>
            Contact our operations team for same-day transfer and keep your
            freight moving without warehouse delays.
          </p>
          <div className="cta-buttons">
            <Link href="/cross-docking" className="btn btn-primary">
              Learn More
            </Link>
            <a href={getTelLink(COMPANY_INFO.phones.cellE164)} className="btn btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Call/Text Us
            </a>
          </div>
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
            <h3>Warehousing & Distribution</h3>
            <p>
              Secure, scalable storage in Orange County with 24/7 access,
              inventory management, and seamless inbound/outbound coordination
              to keep your products protected and delivered on schedule.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> Short &amp; long-term
                pallet storage
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Inventory tracking &amp;
                reporting
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Inbound / outbound
                coordination
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Palletizing &amp; SKU
                organization
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
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Trucking - Image Left, Content Right */}
        <div className="service-row scroll-animate-right">
          <div className="service-image">
            <Image
              src="/trucking-service.jpg"
              alt="K&C Logistics trucking services with reliable freight transportation"
              width={600}
              height={400}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="service-content-box">
            <div className="service-icon">
              <i className="fas fa-truck-moving"></i>
            </div>
            <h3>Trucking Services</h3>
            <p>
              Keep freight moving with experienced drivers, a well-maintained
              fleet, and real-time tracking for local and regional routes across
              Southern California.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> Local &amp; regional
                delivery
              </li>
              <li>
                <i className="fas fa-check-circle"></i> LTL &amp; FTL transport
                options
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Same-day and scheduled
                pickups
              </li>
              <li>
                <i className="fas fa-check-circle"></i> 24/7 dispatch and
                tracking
              </li>
            </ul>
            <Link href="/trucking" className="learn-more-btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Supply Chain - Content Left, Image Right */}
        <div className="service-row reverse scroll-animate-left">
          <div className="service-content-box">
            <div className="service-icon">
              <i className="fas fa-network-wired"></i>
            </div>
            <h3>Supply Chain & Logistics Management</h3>
            <p>
              Integrated supply chain solutions that combine warehousing,
              trucking, cross docking, and real-time coordination to keep
              freight moving and costs under control.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> End-to-end freight
                coordination
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Warehousing &amp;
                inventory management
              </li>
              <li>
                <i className="fas fa-check-circle"></i> LTL / FTL trucking
                support
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Real-time visibility and
                tracking
              </li>
            </ul>
            <Link href="/supply-chain-solutions" className="learn-more-btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="service-image">
            <Image
              src="/supply-chain-service.jpg"
              alt="K&C Logistics supply chain management and freight distribution network"
              width={600}
              height={400}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Truck Parking - Image Left, Content Right */}
        <div className="service-row scroll-animate-right">
          <div className="service-image">
            <Image
              src="/parking-service.jpg"
              alt="K&C Logistics truck parking facilities with secure overnight parking and easy access"
              width={600}
              height={400}
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="service-content-box">
            <div className="service-icon">
              <i className="fas fa-parking"></i>
            </div>
            <h3>Truck Parking</h3>
            <p>
              Secure 24/7 yard storage with gated access, HD surveillance, and
              flexible daily, weekly, or monthly parking for semi-trucks,
              trailers, box trucks, and commercial fleets.
            </p>
            <ul className="service-features">
              <li>
                <i className="fas fa-check-circle"></i> 24/7 gated access &
                cameras
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Dedicated spaces for
                truck & trailer
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Flexible
                daily/weekly/monthly rates
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Quick access to I-5,
                405, and 55
              </li>
            </ul>
            <Link href="/truck-parking" className="learn-more-btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross Docking CTA Section */}
      <section className="cross-docking-cta scroll-animate">
        <div className="cta-container">
          <div className="cta-icon">
            <i className="fas fa-truck-loading"></i>
          </div>
          <h2>Need Immediate Cross Docking Support?</h2>
          <p>
            Same-day transfers, consolidation, and repalletizing to keep your
            shipments on schedule.
          </p>
          <div className="cta-buttons">
            <Link href="/cross-docking" className="btn btn-primary">
              Learn More
            </Link>
            <a href={getTelLink(COMPANY_INFO.phones.cellE164)} className="btn btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Call/Text Us
            </a>
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
            <h2>
              Your Trusted Partner in Logistics &amp; Supply Chain Excellence
            </h2>
            <p>
              At K&amp;C Logistics, we deliver reliable, scalable logistics
              solutions that help businesses move freight faster, store smarter,
              and operate more efficiently. From warehousing and trucking to
              truck parking, cross docking, and supply chain support, our Orange
              County team keeps your freight on schedule with 24/7 visibility.
            </p>
            <p>
              With a customer-first mindset and professional handling, every
              shipment, pallet, and vehicle is managed with precision. We
              continue to invest in secure facilities, advanced yard processes,
              and a dedicated team to keep logistics simple for our partners.
            </p>
            <div className="values-grid">
              <div className="value-item">
                <i className="fas fa-handshake"></i>
                <div>
                  <h4>Integrity &amp; Transparency</h4>
                  <p>
                    Clear communication and accountability in every project.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <h4>Reliability &amp; Consistency</h4>
                  <p>Precision operations from storage to transport.</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-users"></i>
                <div>
                  <h4>Customer-First Service</h4>
                  <p>We adapt to your schedule, volume, and requirements.</p>
                </div>
              </div>
              <div className="value-item">
                <i className="fas fa-expand-alt"></i>
                <div>
                  <h4>Scalable Solutions</h4>
                  <p>From single loads to full supply chain management.</p>
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
                  <a href={getTelLink(COMPANY_INFO.phones.cellE164)}>{COMPANY_INFO.phones.cellFormatted}</a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={getWhatsAppLink()}
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
                  <a href={getMailtoLink(COMPANY_INFO.emails.info)}>
                    {COMPANY_INFO.emails.info}
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
              <label htmlFor="service">Service Interested In</label>
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
                <option value="">Select a service</option>
                <option value="Warehousing Services">Warehousing Services</option>
                <option value="Trucking">Trucking</option>
                <option value="Truck Parking">Truck Parking</option>
                <option value="Cross Docking">Cross Docking</option>
                <option value="Supply Chain Solutions">Supply Chain Solutions</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
              {formErrors.service && (
                <span id="service-error" className="error-message" role="alert">
                  {formErrors.service}
                </span>
              )}
            </div>

            <div className={`form-group ${formErrors.name ? "error" : ""}`}>
              <label htmlFor="name">Full Name</label>
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

            {/* reCAPTCHA Badge Notice */}
            <div style={{
              fontSize: '0.75rem',
              color: '#666',
              textAlign: 'center',
              marginTop: '1rem'
            }}>
              This site is protected by reCAPTCHA and the Google{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-color)' }}
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-color)' }}
              >
                Terms of Service
              </a>{' '}
              apply.
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
          <a
            href={getTelLink(COMPANY_INFO.phones.cellE164)}
            className="btn btn-primary"
            style={{ background: "var(--accent-color)" }}
          >
            <i className="fas fa-phone-alt"></i>
            <span>Call Us Now</span>
          </a>
        </div>
      </section>

      {/* Maps Section */}
      <section className="maps-section">
        <div
          className="section-header scroll-animate"
          style={{ marginTop: "4rem" }}
        >
          <h2>Our Locations</h2>
          <p>Visit us at any of our three convenient Orange County locations</p>
        </div>
        <div className="maps-grid">
          {COMPANY_INFO.addresses.map((address, index) => (
            <div key={index} className="map-card scroll-animate-fade">
              <h3>
                <i className="fas fa-map-marker-alt"></i> {address.name}
              </h3>
              <p>{address.fullAddress}</p>
              <MapWithSkeleton
                latitude={address.latitude}
                longitude={address.longitude}
                title={address.name}
                address={address.fullAddress}
              />
              <button
                className="map-directions-btn"
                onClick={() => openDirections(address.fullAddress)}
                aria-label={`Get directions to ${address.name}`}
              >
                <i className="fas fa-directions"></i>
                Get Directions
              </button>
            </div>
          ))}
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
