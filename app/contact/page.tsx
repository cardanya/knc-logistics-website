"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";
import Toast, { ToastType } from "@/components/Toast";
import MapWithSkeleton from "@/components/MapWithSkeleton";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface FormErrors {
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

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

    const elements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    const service = formData.get("service") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!service || service === "Select a service") {
      errors.service = "Please select a service";
      isValid = false;
    }

    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (phone) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 10) {
        errors.phone = "Please enter a valid phone number (min 10 digits)";
        isValid = false;
      }
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      setToast({
        message: "Please fix the errors in the form before submitting.",
        type: "error"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.get('service'),
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsLoading(false);
      (e.target as HTMLFormElement).reset();

      setToast({
        message: data.message || "Thank you for contacting us! We'll get back to you soon.",
        type: "success"
      });

    } catch (error) {
      setIsLoading(false);

      setToast({
        message: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        type: "error"
      });

    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Contact Us", url: "https://www.knclogistics.com/contact" }
  ]);

  return (
    <>
      <Script
        id="contact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Breadcrumb */}
      <section className="breadcrumb">
        <div className="breadcrumb-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span>Contact Us</span>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="section-header scroll-animate">
          <h1>Contact Us</h1>
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
                <h2>Our Addresses</h2>
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
                <h3>Phone Numbers</h3>
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
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@knclogistics.com">
                    info@knclogistics.com
                  </a>
                </p>
                <p>
                  <a href="mailto:social@knclogistics.com">
                    social@knclogistics.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Business Hours</h3>
                <p>
                  <strong>24/7 Operations:</strong> Parking & Warehouse Access
                </p>
                <p>
                  <strong>Office:</strong> Mon-Fri: 8:00 AM - 5:00 PM
                </p>
                <p>
                  <strong>Weekend:</strong> On-call support available
                </p>
              </div>
            </div>
          </div>

          <form
            className="contact-form scroll-animate-right"
            onSubmit={handleContactSubmit}
            noValidate
          >
            <h2>Send Us a Message</h2>

            <div className={`form-group ${formErrors.service ? "error" : ""}`}>
              <label htmlFor="service">Service Interested In</label>
              <select
                id="service"
                name="service"
                ref={serviceRef}
                required
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
                placeholder="John Doe"
                ref={nameRef}
                required
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
          </div>
          <div className="map-card scroll-animate-fade">
            <h3>
              <i className="fas fa-map-marker-alt"></i> Orange County Truck Stop
            </h3>
            <p>3100 S Standard Ave, Santa Ana, CA 92705</p>
            <MapWithSkeleton
              src="https://maps.google.com/maps?q=Orange%20County%20Truck%20Stop%20%26%20Warehousing&output=embed"
              title="Map of Orange County Truck Stop location"
            />
          </div>
          <div className="map-card scroll-animate-fade">
            <h3>
              <i className="fas fa-map-marker-alt"></i> K&C Alton Branch
            </h3>
            <p>133 E Alton Ave, Santa Ana, CA 92707</p>
            <MapWithSkeleton
              src="https://maps.google.com/maps?q=K%26C%20Logistics%2C%20Warehousing%20Alton%20Branch&output=embed"
              title="Map of K&C Alton Branch location"
            />
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
