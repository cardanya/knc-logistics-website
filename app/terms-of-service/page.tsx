import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | K&C Logistics",
  description: "Read K&C Logistics' terms of service to understand the rules and regulations governing the use of our services and website.",
  robots: "index, follow",
};

export default function TermsOfService() {
  return (
    <main className="privacy-policy-page">
      <section className="privacy-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: November 8, 2025</p>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container">
          <div className="policy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to K&C Logistics. By accessing or using our website and services, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use our services. These Terms apply to all users of the website, including visitors, customers, and others who access the service.
            </p>
            <p>
              We reserve the right to update, change, or replace any part of these Terms by posting updates on our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
            </p>
          </div>

          <div className="policy-section">
            <h2>2. Description of Services</h2>
            <p>
              K&C Logistics provides comprehensive logistics, warehousing, and supply chain management services, including but not limited to:
            </p>
            <ul>
              <li>Cross docking services and freight consolidation</li>
              <li>Warehousing and distribution center operations</li>
              <li>Truck parking and staging facilities</li>
              <li>Supply chain optimization and logistics management</li>
              <li>Transloading and cargo handling services</li>
              <li>Just-in-time delivery solutions</li>
            </ul>
            <p>
              We reserve the right to modify or discontinue any service at any time without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the service.
            </p>
          </div>

          <div className="policy-section">
            <h2>3. User Obligations and Account Responsibility</h2>
            <p>
              When using our services or website, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration and booking</li>
              <li>Maintain the security of your account credentials and password</li>
              <li>Promptly update your account information to keep it accurate and current</li>
              <li>Accept all responsibility for activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Comply with all applicable federal, state, and local laws and regulations</li>
            </ul>
            <p>
              You are responsible for all charges incurred under your account. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
            </p>
          </div>

          <div className="policy-section">
            <h2>4. Prohibited Activities</h2>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul>
              <li>Using our services for any illegal purpose or in violation of any laws</li>
              <li>Storing or transporting prohibited, hazardous, or illegal materials without proper authorization</li>
              <li>Interfering with or disrupting the operation of our facilities or services</li>
              <li>Attempting to gain unauthorized access to our systems or networks</li>
              <li>Transmitting viruses, malware, or any other malicious code</li>
              <li>Harassing, threatening, or intimidating our staff or other users</li>
              <li>Misrepresenting your identity or affiliation with any person or entity</li>
              <li>Collecting or harvesting personal information from other users</li>
              <li>Using our services to compete with our business</li>
            </ul>
            <p>
              Violation of these prohibitions may result in immediate termination of services and potential legal action.
            </p>
          </div>

          <div className="policy-section">
            <h2>5. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, photographs, videos, and software, is the property of K&C Logistics or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, republish, download, store, or transmit any of the material on our website without our prior written consent, except as follows:
            </p>
            <ul>
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
              <li>You may print or download one copy of a reasonable number of pages for your own personal, non-commercial use</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, K&C Logistics shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use our services</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Delays, interruptions, or errors in the operation of our services</li>
              <li>Damage to or loss of goods while in storage or transit, except as specifically covered by our insurance and service agreements</li>
            </ul>
            <p>
              Our aggregate liability for all claims relating to the services shall not exceed the greater of one hundred dollars ($100) or the amount you paid us, if any, in the past six months for the services giving rise to the claim.
            </p>
          </div>

          <div className="policy-section">
            <h2>7. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless K&C Logistics, its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to:
            </p>
            <ul>
              <li>Your violation of these Terms of Service</li>
              <li>Your use of our services</li>
              <li>Your violation of any law or the rights of a third party</li>
              <li>The content or nature of goods stored or transported through our services</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>8. Service Availability and Warranties</h2>
            <p>
              We strive to provide reliable and uninterrupted service, but we do not guarantee that:
            </p>
            <ul>
              <li>Our services will be uninterrupted, secure, or error-free</li>
              <li>The results obtained from the use of our services will be accurate or reliable</li>
              <li>The quality of any services, information, or materials obtained will meet your expectations</li>
              <li>Any errors in our software or systems will be corrected</li>
            </ul>
            <p>
              <strong>Our services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</strong>
            </p>
          </div>

          <div className="policy-section">
            <h2>9. Payment Terms and Billing</h2>
            <p>
              Payment for our services is due as specified in our service agreements or invoices. By using our services, you agree to:
            </p>
            <ul>
              <li>Pay all charges at the prices then in effect for your purchases</li>
              <li>Pay any applicable taxes relating to your purchases</li>
              <li>Provide current, complete, and accurate purchase and account information</li>
              <li>Promptly update your account and payment information as needed</li>
            </ul>
            <p>
              We reserve the right to refuse or cancel orders, change prices, or implement late payment fees at any time. Unpaid balances may result in suspension or termination of services and may be referred to collection agencies. You will be responsible for all collection costs, including reasonable attorney fees.
            </p>
          </div>

          <div className="policy-section">
            <h2>10. Cargo and Vehicle Responsibility</h2>
            <p>
              For warehousing, parking, and logistics services:
            </p>
            <ul>
              <li>You are responsible for the accuracy of all information provided about your cargo or vehicles</li>
              <li>You must declare any hazardous materials, special handling requirements, or valuable cargo in advance</li>
              <li>You are responsible for ensuring all cargo and vehicles comply with applicable regulations</li>
              <li>Insurance coverage is your responsibility unless otherwise specified in a service agreement</li>
              <li>We reserve the right to inspect cargo and refuse service for prohibited or undeclared items</li>
              <li>Vehicles must be properly registered, insured, and roadworthy</li>
              <li>You must remove vehicles and cargo within agreed timeframes or face storage fees</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including but not limited to:
            </p>
            <ul>
              <li>Breach of these Terms of Service</li>
              <li>Failure to pay for services rendered</li>
              <li>Fraudulent or illegal activity</li>
              <li>At our sole discretion for business reasons</li>
            </ul>
            <p>
              Upon termination, your right to use our services will immediately cease. You remain obligated to pay all outstanding charges. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </div>

          <div className="policy-section">
            <h2>12. Dispute Resolution and Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising from or relating to these Terms or our services shall first be attempted to be resolved through good-faith negotiations. If negotiations fail, the dispute shall be resolved through binding arbitration in Orange County, California, in accordance with the rules of the American Arbitration Association.
            </p>
            <p>
              You agree that any arbitration or legal action shall be conducted on an individual basis and not as a class action or representative proceeding. You waive any right to participate in a class action lawsuit or class-wide arbitration.
            </p>
          </div>

          <div className="policy-section">
            <h2>13. Force Majeure</h2>
            <p>
              We shall not be liable for any failure or delay in performance of our obligations under these Terms due to circumstances beyond our reasonable control, including but not limited to:
            </p>
            <ul>
              <li>Acts of God, natural disasters, severe weather conditions</li>
              <li>War, terrorism, riots, civil unrest</li>
              <li>Government actions, laws, or regulations</li>
              <li>Labor disputes, strikes, or lockouts</li>
              <li>Supply chain disruptions or transportation delays</li>
              <li>Pandemics, epidemics, or public health emergencies</li>
              <li>Equipment failures, power outages, or system failures</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>14. Severability and Waiver</h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable, the validity, legality, and enforceability of the remaining provisions shall not be affected or impaired.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. Any waiver of any provision of these Terms will be effective only if in writing and signed by an authorized representative of K&C Logistics.
            </p>
          </div>

          <div className="policy-section">
            <h2>15. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any service agreements or contracts, constitute the entire agreement between you and K&C Logistics regarding the use of our services, superseding any prior agreements between you and K&C Logistics.
            </p>
          </div>

          <div className="policy-section">
            <h2>16. Changes to Terms of Service</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website with a new &ldquo;Last Updated&rdquo; date. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
            </p>
            <p>
              We encourage you to review these Terms periodically to stay informed of any updates. If you do not agree to the modified Terms, you must stop using our services.
            </p>
          </div>

          <div className="policy-section">
            <h2>17. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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
