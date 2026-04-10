"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";
import Toast, { ToastType } from "@/components/Toast";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useRecaptcha } from "@/lib/useRecaptcha";
import { submitContactForm } from "@/lib/api/contact";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function OfficeOperationsSpecialist() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

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
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade",
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validateForm = (formData: FormData): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (phone && (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 10)) {
      errors.phone = "Please enter a valid phone number (min 10 digits)";
      isValid = false;
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Cover letter must be at least 10 characters";
      isValid = false;
    }

    if (message && message.length > 2000) {
      errors.message = "Cover letter must be 2000 characters or less";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    const recaptchaToken = await executeRecaptcha("apply_form");
    if (!recaptchaToken) {
      setToast({
        message: "Security verification failed. Please try again.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = await submitContactForm({
        data: {
          service: "Office Staff / Operations Specialist",
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: (formData.get("phone") as string) || undefined,
          message: formData.get("message") as string,
        },
        recaptchaToken,
      });

      setIsLoading(false);
      (e.target as HTMLFormElement).reset();

      setToast({
        message:
          data.message ||
          "Thank you for applying! We'll review your application and get back to you soon.",
        type: "success",
      });
    } catch (error) {
      setIsLoading(false);
      setToast({
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit application. Please try again.",
        type: "error",
      });
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.knclogistics.com/" },
    { name: "Careers", url: "https://www.knclogistics.com/apply" },
    {
      name: "Office Operations Specialist",
      url: "https://www.knclogistics.com/apply/office-operations-specialist",
    },
  ]);

  return (
    <>
      <Script
        id="office-operations-breadcrumb-schema"
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
            <Link href="/apply">Careers</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Office Operations Specialist</span>
          </div>
        </section>

        <section className="contact" id="office-operations-specialist">
          {/* Job Header */}
          <div className="section-header scroll-animate">
            <h1>Office Staff / Operations Specialist</h1>
            <p>
              <i className="fas fa-map-marker-alt"></i> K&C Logistics — Santa
              Ana, CA &mdash; In Person
            </p>
          </div>

          {/* Job Details + Form */}
          <div className="contact-container">
            {/* Left: Job Description & Requirements */}
            <div className="contact-info scroll-animate-left">
              <div className="contact-item">
                <i className="fas fa-briefcase"></i>
                <div>
                  <h2>Job Description</h2>
                  <p>
                    We are seeking an experienced and detail-oriented Office
                    Operations Specialist to support daily administrative and
                    logistics operations. The ideal candidate will oversee
                    general office tasks while having strong knowledge of
                    logistics processes and overall operations. This role
                    requires someone who is organized, proactive, and capable of
                    managing multiple responsibilities efficiently.
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-tasks"></i>
                <div>
                  <h2>Responsibilities</h2>
                  <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.9" }}>
                    <li>Handle daily office operations and administrative tasks</li>
                    <li>Support dispatch, logistics, and coordination activities</li>
                    <li>Maintain records, documents, and operational reports</li>
                    <li>Communicate with drivers, clients, and internal teams</li>
                    <li>Assist with scheduling, planning, and workflow coordination</li>
                    <li>Monitor and support overall operational processes</li>
                    <li>Ensure smooth communication between departments</li>
                    <li>Perform general office duties as needed</li>
                  </ul>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-list-check"></i>
                <div>
                  <h2>Requirements</h2>
                  <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.9" }}>
                    <li>Minimum 5 years of experience in office operations and logistics</li>
                    <li>Strong knowledge of logistics and supply chain operations</li>
                    <li>Ability to manage and oversee general operational processes</li>
                    <li>Strong organizational and multitasking skills</li>
                    <li>Good communication and problem-solving abilities</li>
                    <li>Proficiency in basic computer systems (Excel, office tools, logistics software)</li>
                    <li>Reliable, responsible, and detail-oriented</li>
                    <li>Fluent in English and Spanish</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Application Form */}
            <form
              className="contact-form scroll-animate-right"
              onSubmit={handleSubmit}
              noValidate
            >
              <h2>Apply for This Position</h2>
              <p
                style={{
                  marginBottom: "1.5rem",
                  color: "var(--text-secondary)",
                }}
              >
                Fill out the form below and we&apos;ll contact you within 24-48
                hours.
              </p>

              <div className={`form-group ${formErrors.name ? "error" : ""}`}>
                <label htmlFor="name">Full Name *</label>
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
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@email.com"
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
                <label htmlFor="phone">Phone (Optional)</label>
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
                <label htmlFor="message">Cover Letter / Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your qualifications, experience, and why you're a great fit for this role... (max 2000 characters)"
                  ref={messageRef}
                  maxLength={2000}
                  rows={6}
                  autoComplete="off"
                  required
                  aria-invalid={formErrors.message ? "true" : "false"}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                ></textarea>
                {formErrors.message && (
                  <span id="message-error" className="error-message" role="alert">
                    {formErrors.message}
                  </span>
                )}
              </div>

              {/* reCAPTCHA Badge Notice */}
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#666",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Terms of Service
                </a>{" "}
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
                  {isLoading ? "Submitting..." : "Submit Application"}
                </span>
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
