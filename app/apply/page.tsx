"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";
import Toast, { ToastType } from "@/components/Toast";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useRecaptcha } from "@/lib/useRecaptcha";
import { submitApplyForm } from "@/lib/api/apply";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  cdlType?: string;
  experience?: string;
  message?: string;
}

export default function Apply() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cdlTypeRef = useRef<HTMLSelectElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);
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
    const cdlType = formData.get("cdlType") as string;
    const experience = formData.get("experience") as string;
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
    if (
      !phone ||
      !phoneRegex.test(phone) ||
      phone.replace(/\D/g, "").length < 10
    ) {
      errors.phone = "Please enter a valid phone number (min 10 digits)";
      isValid = false;
    }

    if (!cdlType || cdlType === "") {
      errors.cdlType = "Please select your CDL license type";
      isValid = false;
    }

    const experienceNum = parseInt(experience, 10);
    if (
      !experience ||
      isNaN(experienceNum) ||
      experienceNum < 0 ||
      experienceNum > 50
    ) {
      errors.experience = "Please enter years of experience (0-50)";
      isValid = false;
    }

    if (message && message.length > 500) {
      errors.message = "Message must be 500 characters or less";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha("apply_form");
    if (!recaptchaToken) {
      setFormErrors({
        ...formErrors,
      });
      setToast({
        message: "Security verification failed. Please try again.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = await submitApplyForm({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          cdlType: formData.get("cdlType") as string,
          experience: parseInt(formData.get("experience") as string, 10),
          message: (formData.get("message") as string) || undefined,
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
  ]);

  return (
    <>
      <Script
        id="apply-breadcrumb-schema"
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
            <span>Careers</span>
          </div>
        </section>

        {/* Hero Section */}
        <section className="contact" id="apply">
          <div className="section-header scroll-animate">
            <h1>Join Our Team</h1>
            <p>
              K&C Logistics is hiring experienced CDL drivers. Apply now and
              become part of our professional team.
            </p>
          </div>

          <div className="contact-container">
            {/* Why Join Us Section */}
            <div className="contact-info scroll-animate-left">
              <div className="contact-item">
                <i className="fas fa-truck"></i>
                <div>
                  <h2>Why Drive with K&C Logistics?</h2>
                  <p>
                    We value our drivers and offer competitive compensation,
                    modern equipment, and a supportive work environment.
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-dollar-sign"></i>
                <div>
                  <h3>Competitive Pay</h3>
                  <p>
                    Earn competitive wages with regular increases based on
                    performance and experience.
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-calendar-check"></i>
                <div>
                  <h3>Flexible Schedule</h3>
                  <p>
                    We offer various routes and schedules to fit your lifestyle
                    and preferences.
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-tools"></i>
                <div>
                  <h3>Modern Fleet</h3>
                  <p>
                    Drive well-maintained, modern trucks equipped with the
                    latest safety features.
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-heart"></i>
                <div>
                  <h3>Great Benefits</h3>
                  <p>
                    Paid time off, and other benefits available for full-time
                    drivers.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form
              className="contact-form scroll-animate-right"
              onSubmit={handleApplySubmit}
              noValidate
            >
              <h2>Apply Now</h2>
              <p
                style={{
                  marginBottom: "1.5rem",
                  color: "var(--text-secondary)",
                }}
              >
                Fill out the form below and we'll contact you within 24-48
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
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
                />
                {formErrors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className={`form-group ${formErrors.phone ? "error" : ""}`}>
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (XXX) XXX-XXXX"
                  ref={phoneRef}
                  required
                  autoComplete="tel"
                  aria-invalid={formErrors.phone ? "true" : "false"}
                  aria-describedby={
                    formErrors.phone ? "phone-error" : undefined
                  }
                />
                {formErrors.phone && (
                  <span id="phone-error" className="error-message" role="alert">
                    {formErrors.phone}
                  </span>
                )}
              </div>

              <div
                className={`form-group ${formErrors.cdlType ? "error" : ""}`}
              >
                <label htmlFor="cdlType">CDL License Type *</label>
                <select
                  id="cdlType"
                  name="cdlType"
                  ref={cdlTypeRef}
                  required
                  aria-invalid={formErrors.cdlType ? "true" : "false"}
                  aria-describedby={
                    formErrors.cdlType ? "cdlType-error" : undefined
                  }
                >
                  <option value="">Select license type</option>
                  <option value="Class A">Class A</option>
                  <option value="Class B">Class B</option>
                  <option value="Class C">Class C</option>
                </select>
                {formErrors.cdlType && (
                  <span
                    id="cdlType-error"
                    className="error-message"
                    role="alert"
                  >
                    {formErrors.cdlType}
                  </span>
                )}
              </div>

              <div
                className={`form-group ${formErrors.experience ? "error" : ""}`}
              >
                <label htmlFor="experience">
                  Years of Driving Experience *
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  placeholder="5"
                  min="0"
                  max="50"
                  ref={experienceRef}
                  required
                  aria-invalid={formErrors.experience ? "true" : "false"}
                  aria-describedby={
                    formErrors.experience ? "experience-error" : undefined
                  }
                />
                {formErrors.experience && (
                  <span
                    id="experience-error"
                    className="error-message"
                    role="alert"
                  >
                    {formErrors.experience}
                  </span>
                )}
              </div>

              <div
                className={`form-group ${formErrors.message ? "error" : ""}`}
              >
                <label htmlFor="message">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your experience, qualifications, or ask any questions... (max 500 characters)"
                  ref={messageRef}
                  maxLength={500}
                  autoComplete="off"
                  aria-invalid={formErrors.message ? "true" : "false"}
                  aria-describedby={
                    formErrors.message ? "message-error" : undefined
                  }
                ></textarea>
                {formErrors.message && (
                  <span
                    id="message-error"
                    className="error-message"
                    role="alert"
                  >
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
