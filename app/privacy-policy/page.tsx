import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | K&C Logistics",
  description: "Read K&C Logistics' privacy policy to understand how we collect, use, and protect your personal information.",
  robots: "index, follow",
};

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <section className="privacy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: November 6, 2025</p>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container">
          <div className="policy-section">
            <h2>1. Introduction</h2>
            <p>
              K&C Logistics (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services. Please read this
              privacy policy carefully. If you do not agree with the terms of this privacy
              policy, please do not access the site.
            </p>
          </div>

          <div className="policy-section">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Request information about our cross docking and logistics services</li>
              <li>Fill out contact forms or inquiry forms</li>
              <li>Subscribe to our newsletters or updates</li>
              <li>Communicate with us via phone, email, or other channels</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Company name and business information</li>
              <li>Service preferences and requirements</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about
              your device, including:
            </p>
            <ul>
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
              <li>Click and navigation patterns</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain our logistics services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you information about our cross docking and warehousing services</li>
              <li>Improve our website and service offerings</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website
              and store certain information. Cookies are files with a small amount of data that
              are sent to your browser from a website and stored on your device.
            </p>
            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie
              is being sent. However, if you do not accept cookies, you may not be able to use
              some portions of our website.
            </p>
          </div>

          <div className="policy-section">
            <h2>5. How We Share Your Information</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third-party
                service providers who perform services on our behalf, such as payment processing,
                data analysis, email delivery, and customer service.</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale of company
                assets, financing, or acquisition of all or a portion of our business.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights,
                privacy, safety, or property.</li>
              <li><strong>With Your Consent:</strong> We may disclose your information for any other
                purpose with your consent.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect
              your personal information. However, please note that no method of transmission over
              the Internet or electronic storage is 100% secure. While we strive to use commercially
              acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
          </div>

          <div className="policy-section">
            <h2>7. Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another party</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on your consent
                to process your information</li>
            </ul>
            <p>
              To exercise these rights, please contact us at info@knclogistics.com
            </p>
          </div>

          <div className="policy-section">
            <h2>8. GDPR Compliance (European Users)</h2>
            <p>
              If you are located in the European Economic Area (EEA), you have certain data
              protection rights under the General Data Protection Regulation (GDPR). We aim to
              take reasonable steps to allow you to correct, amend, delete, or limit the use of
              your personal information.
            </p>
            <p>
              <strong>Legal Basis for Processing:</strong> We process your personal information
              based on:
            </p>
            <ul>
              <li>Your consent</li>
              <li>Performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate business interests</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly
              collect personal information from children. If we become aware that we have collected
              personal information from a child without parental consent, we will take steps to
              delete that information.
            </p>
          </div>

          <div className="policy-section">
            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for
              the privacy practices or content of these third-party sites. We encourage you to
              review the privacy policies of any third-party sites you visit.
            </p>
          </div>

          <div className="policy-section">
            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo;
              date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="policy-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices,
              please contact us:
            </p>
            <div className="contact-info">
              <p><strong>K&C Logistics</strong></p>
              <p>3060 Daimler St, Santa Ana, CA 92705</p>
              <p>Phone: (949) 484-4686</p>
              <p>Cell: (714) 588-2005</p>
              <p>Email: info@knclogistics.com</p>
            </div>
          </div>

          <div className="back-link">
            <Link href="/" className="btn btn-primary">
              <i className="fas fa-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
