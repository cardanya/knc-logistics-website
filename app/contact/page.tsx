"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";
import Toast, { ToastType } from "@/components/Toast";
import MapWithSkeleton from "@/components/MapWithSkeleton";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useRecaptcha } from "@/lib/useRecaptcha";
import { COMPANY_INFO, getTelLink, getWhatsAppLink, getMailtoLink, getDirectionsLink, getGoogleMapsEmbedUrl } from "@/lib/constants";
import { submitContactForm } from "@/lib/api/contact";

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

    const elements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openDirections = (addressIndex: number) => {
    const address = COMPANY_INFO.addresses[addressIndex];
    window.open(getDirectionsLink(address), "_blank", "noopener,noreferrer");
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
      const data = await submitContactForm({
        data: {
          service: formData.get('service') as string,
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string || undefined,
          message: formData.get('message') as string,
        },
        recaptchaToken,
      });

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
                {COMPANY_INFO.addresses.map((address, index) => (
                  <div key={index} className="address-entry">
                    <div>
                      <strong>{address.name}</strong>
                      <span>{address.fullAddress}</span>
                    </div>
                    <button
                      className="address-directions-btn"
                      onClick={() => openDirections(index)}
                      aria-label={`Get directions to ${address.name}`}
                    >
                      <i className="fas fa-directions"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone Numbers</h3>
                <p>
                  <strong>Direct:</strong>{" "}
                  <a href={getTelLink(`+1${COMPANY_INFO.phones.direct}`)}>
                    {COMPANY_INFO.phones.directFormatted}
                  </a>
                </p>
                <p>
                  <strong>Cell:</strong>{" "}
                  <a href={getTelLink(COMPANY_INFO.phones.cellE164)}>
                    {COMPANY_INFO.phones.cellFormatted}
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {COMPANY_INFO.phones.whatsappFormatted}
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
                  <a href={getMailtoLink(COMPANY_INFO.emails.info)}>
                    {COMPANY_INFO.emails.info}
                  </a>
                </p>
                <p>
                  <a href={getMailtoLink(COMPANY_INFO.emails.social)}>
                    {COMPANY_INFO.emails.social}
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

      {/* Maps Section */}
      <section className="maps-section">
        <div className="section-header scroll-animate" style={{ marginTop: "4rem" }}>
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
                src={getGoogleMapsEmbedUrl(address)}
                title={`Map of ${address.name}`}
              />
            </div>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}
