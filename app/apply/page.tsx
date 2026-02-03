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
  const [currentPerksSlide, setCurrentPerksSlide] = useState(0);

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

  const handlePerksPrev = () => {
    setCurrentPerksSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handlePerksNext = () => {
    setCurrentPerksSlide((prev) => (prev === 1 ? 0 : 1));
  };

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
            <h1>Welcome to K&C Logistics Careers Page</h1>
            <p>
              With over 20 years of experience, we provide companies with safe,
              efficient, and reliable transportation solutions across the United
              States.
            </p>
            <div className="hero-subtitle">
              <h2>Drive For Us</h2>
              <p>Company drivers, your journey starts here.</p>
            </div>
          </div>

          {/* Company Drivers Info Section */}
          <div className="full-width-section scroll-animate">
            <div className="section-header">
              <h2>Company Driver Information</h2>
              <p>
                Competitive pay rates, excellent benefits, and consistent routes
                for our valued drivers
              </p>
            </div>

            <div className="company-info-grid">
              <div className="info-card scroll-animate-fade">
                <h3>
                  <i className="fas fa-user"></i> Solo Drivers
                </h3>
                <ul>
                  <li>
                    Up to <span className="highlight-number">$0.65</span> per
                    loaded/empty pro mile
                  </li>
                  <li>100% No Touch dry van freight</li>
                  <li>
                    Average yearly earnings:{" "}
                    <span className="highlight-number">$70,000 - $80,000</span>
                  </li>
                </ul>
              </div>

              <div className="info-card scroll-animate-fade">
                <h3>
                  <i className="fas fa-users"></i> Team Drivers
                </h3>
                <ul>
                  <li>
                    Up to <span className="highlight-number">$0.80</span> per
                    loaded/empty pro mile (split)
                  </li>
                  <li>100% No Touch dry van freight</li>
                  <li>Maximize your earning potential as a team</li>
                </ul>
              </div>

              <div className="info-card scroll-animate-fade">
                <h3>
                  <i className="fas fa-plus-circle"></i> Additional Pay
                </h3>
                <ul>
                  <li>Extra pay for trucks with 400k+ miles</li>
                  <li>Detention pay for delays</li>
                  <li>Layover compensation</li>
                  <li>Extra stops paid</li>
                  <li>No Forced Dispatch</li>
                </ul>
              </div>

              <div className="info-card scroll-animate-fade">
                <h3>
                  <i className="fas fa-shield-check"></i> Benefits & Equipment
                </h3>
                <ul>
                  <li>Company paid Occupational accident insurance</li>
                  <li>Assigned equipment stays with you during home time</li>
                  <li>Prepass and TollPass equipped trucks</li>
                  <li>Well-maintained modern fleet</li>
                </ul>
              </div>

              <div className="info-card scroll-animate-fade">
                <h3>
                  <i className="fas fa-route"></i> Routes & Schedule
                </h3>
                <ul>
                  <li>Primary routes: CA-UT, CA-CA, CA-AZ, CA-NV</li>
                  <li>Monday to Friday schedule</li>
                  <li>Home on weekends if requested</li>
                  <li>Predictable and reliable routing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="contact-container">
            {/* K&C Perks Section - Carousel */}
            <div className="contact-info scroll-animate-left">
              <div className="perks-carousel-container">
                <div
                  className="perks-carousel-track"
                  style={{
                    transform: `translateX(-${currentPerksSlide * 100}%)`,
                    transition: "transform 0.6s ease-in-out",
                  }}
                >
                  {/* Slide 1 - First 7 items */}
                  <div className="perks-slide">
                    <div className="contact-item">
                      <i className="fas fa-truck"></i>
                      <div>
                        <h2>K&C Perks</h2>
                        <p>
                          We value our drivers and offer competitive
                          compensation, modern equipment, and comprehensive
                          support to help you succeed.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-shield-alt"></i>
                      <div>
                        <h3>Safety Bonuses</h3>
                        <p>
                          Level I: $500 per inspection • Level II: $300 per
                          inspection • Level III: $100 per inspection
                          (Inspections without any violation)
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-user-friends"></i>
                      <div>
                        <h3>Driver Referral Bonus</h3>
                        <p>
                          Earn bonuses by referring other qualified drivers to
                          join our team.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-hands"></i>
                      <div>
                        <h3>100% No-Touch Freight</h3>
                        <p>
                          Dry Van with Live Load/Unload - no heavy lifting
                          required.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-headset"></i>
                      <div>
                        <h3>24/7 Support Service</h3>
                        <p>
                          Our team is always available to assist you, day or
                          night.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-file-contract"></i>
                      <div>
                        <h3>1099 Contractor Position</h3>
                        <p>
                          Flexible contractor status with excellent earning
                          potential.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-comments-dollar"></i>
                      <div>
                        <h3>Free Consulting Services</h3>
                        <p>
                          Expert advice on taxes, trucking regulations, and
                          vehicle maintenance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 - Last 7 items */}
                  <div className="perks-slide">
                    <div className="contact-item">
                      <i className="fas fa-flag-usa"></i>
                      <div>
                        <h3>Veterans Extra Pay</h3>
                        <p>
                          Special compensation program for military veterans -
                          thank you for your service.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-gift"></i>
                      <div>
                        <h3>Driver Welcome Package</h3>
                        <p>
                          New drivers receive a comprehensive starter kit to
                          begin their journey.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-paw"></i>
                      <div>
                        <h3>Pet & Rider Friendly</h3>
                        <p>
                          Bring your furry friends or family members along for
                          the ride.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-home"></i>
                      <div>
                        <h3>Guaranteed Home Time</h3>
                        <p>
                          Reliable schedule to ensure quality time with your
                          family - home on weekends if requested.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-money-check-alt"></i>
                      <div>
                        <h3>Weekly Direct Deposit</h3>
                        <p>Get paid every week via secure direct deposit.</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-user-tie"></i>
                      <div>
                        <h3>Expert Dispatchers</h3>
                        <p>
                          All our dispatchers are CDL A holders who understand
                          your needs.
                        </p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <i className="fas fa-ban"></i>
                      <div>
                        <h3>No Forced Dispatch</h3>
                        <p>
                          You have control over your routes and schedule - your
                          choice matters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  className="carousel-nav-btn carousel-prev"
                  onClick={handlePerksPrev}
                  aria-label="Previous perks"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="carousel-nav-btn carousel-next"
                  onClick={handlePerksNext}
                  aria-label="Next perks"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

                {/* Indicators */}
                <div className="carousel-indicators">
                  <button
                    className={`carousel-indicator ${currentPerksSlide === 0 ? "active" : ""}`}
                    onClick={() => setCurrentPerksSlide(0)}
                    aria-label="Go to slide 1"
                  />
                  <button
                    className={`carousel-indicator ${currentPerksSlide === 1 ? "active" : ""}`}
                    onClick={() => setCurrentPerksSlide(1)}
                    aria-label="Go to slide 2"
                  />
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

          {/* Requirements Section */}
          <div className="full-width-section scroll-animate">
            <div className="section-header">
              <h2>Driver Requirements</h2>
              <p>
                Make sure you meet these requirements before applying to join
                our team
              </p>
            </div>

            <div className="requirements-list">
              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>CDL Experience</strong>
                  <p>
                    Minimum 2 years of CDL Class A driving experience required
                  </p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Valid CDL A License</strong>
                  <p>Current and valid CDL Class A license in good standing</p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Age Requirement</strong>
                  <p>Must be at least 25 years old</p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Clean MVR</strong>
                  <p>Clean Motor Vehicle Record with safe driving history</p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Drug Testing</strong>
                  <p>Must pass mandatory pre-employment drug screening</p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>No DWI or DUI</strong>
                  <p>No DWI/DUI violations in driving history</p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Background Check</strong>
                  <p>Must pass clean criminal background check</p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>OTR Commitment</strong>
                  <p>
                    Minimum 14 consecutive days Over The Road (OTR) required
                  </p>
                </div>
              </div>

              <div className="requirement-item scroll-animate-fade">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Home Time Policy</strong>
                  <p>
                    Earn 1 day home time for every extra week spent on the road
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
