import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Employee Referral Program | K&C Logistics LLC",
  description:
    "Refer a qualified candidate to K&C Logistics LLC and earn a $500 bonus. Learn about our Employee Referral Program, eligibility requirements, and how to submit a referral.",
  robots: "index, follow",
};

export default function EmployeeReferralProgram() {
  return (
    <main className="privacy-policy-page">
      <section className="privacy-hero">
        <div className="container">
          <h1>Employee Referral Program</h1>
          <p className="last-updated">
            Effective Date: April 15, 2026 &nbsp;|&nbsp; Company: K&amp;C
            Logistics LLC
          </p>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container">
          {/* Policy Overview */}
          <div className="policy-section">
            <h2>Policy Overview &amp; Purpose</h2>
            <p>
              At K&amp;C Logistics LLC, we value our team and believe great
              people know great people.
            </p>
            <p>
              Our Employee Referral Program is designed to encourage employees,
              partners, and affiliates to refer qualified candidates for open
              positions within our company. We aim to make this process simple,
              transparent, and beneficial for everyone involved.
            </p>
          </div>

          {/* Scope */}
          <div className="policy-section">
            <h2>Scope</h2>
            <p>
              This Employee Referral Program applies to all individuals who
              refer candidates to K&amp;C Logistics LLC, including employees,
              vendors, contractors, consultants, and external partners.
            </p>
          </div>

          {/* Referral Bonus */}
          <div className="policy-section">
            <h2>Referral Bonus Program</h2>
            <p>
              K&amp;C Logistics LLC offers a{" "}
              <strong>$500 referral bonus</strong> for successful hires.
            </p>
            <p>
              If you refer a candidate who is hired and meets all eligibility
              requirements, you will receive:
            </p>
            <ul>
              <li>
                <strong>50% ($250)</strong> upon successful hiring
              </li>
              <li>
                <strong>50% ($250)</strong> after the employee completes 3
                months of employment
              </li>
            </ul>
            <p>
              Additional incentives may be offered for hard-to-fill or
              specialized roles.
            </p>
          </div>

          {/* Additional Rules */}
          <div className="policy-section">
            <h2>Additional Rules</h2>
            <ul>
              <li>
                There is no limit to the number of referrals you can submit
              </li>
              <li>
                If multiple people refer the same candidate, only the first
                referrer will receive the bonus
              </li>
              <li>
                Referrals remain eligible even if the candidate is hired later
                or for a different position
              </li>
              <li>Referral bonuses may be subject to applicable taxes</li>
            </ul>
          </div>

          {/* Eligibility to Participate */}
          <div className="policy-section">
            <h2>Eligibility to Participate</h2>
            <h3>Eligible participants include:</h3>
            <ul>
              <li>All employees of K&amp;C Logistics LLC</li>
              <li>Vendors, contractors, consultants, and external partners</li>
            </ul>
            <h3>Not eligible:</h3>
            <ul>
              <li>Senior management (CEO, Managing Director)</li>
              <li>
                Recruiters or hiring managers for roles they are directly
                responsible for
              </li>
            </ul>
            <p>
              Hiring managers may refer candidates only for positions outside
              their department or responsibility.
            </p>
          </div>

          {/* Candidate Eligibility */}
          <div className="policy-section">
            <h2>Candidate Eligibility</h2>
            <p>To qualify for referral rewards, candidates must:</p>
            <ul>
              <li>
                Not have applied to K&amp;C Logistics LLC within the past 12
                months
              </li>
              <li>Be hired as a permanent full-time or part-time employee</li>
              <li>Not be hired as a temporary employee or contractor</li>
            </ul>
          </div>

          {/* How to Submit */}
          <div className="policy-section">
            <h2>How to Submit a Referral</h2>
            <p>Please send all referrals to:</p>
            <div className="contact-info">
              <p>
                <i
                  className="fas fa-envelope"
                  style={{
                    color: "var(--primary-color)",
                    marginRight: "0.5rem",
                  }}
                ></i>
                <strong>
                  <a
                    href="mailto:info@knclogiics.com"
                    style={{ color: "var(--primary-color)" }}
                  >
                    info@knclogistics.com
                  </a>
                </strong>
              </p>
            </div>
            <p>Include:</p>
            <ul>
              <li>Candidate&apos;s resume</li>
              <li>Job title in the subject line</li>
              <li>Referrer&apos;s name and contact information</li>
            </ul>
          </div>

          {/* Recruitment Process */}
          <div className="policy-section">
            <h2>Recruitment Process</h2>
            <p>
              All referred candidates will be evaluated through K&amp;C
              Logistics LLC&apos;s standard hiring process. While referrals are
              valued, all applicants are considered fairly and equally.
            </p>
            <p>
              K&amp;C Logistics LLC is an Equal Opportunity Employer and does
              not discriminate based on protected characteristics.
            </p>
          </div>

          {/* Program Modifications */}
          <div className="policy-section">
            <h2>Program Modifications</h2>
            <p>
              K&amp;C Logistics LLC reserves the right to modify or discontinue
              this program at any time.
            </p>
            <p>
              Any changes will be communicated clearly. Referrals submitted
              prior to any change will still be honored under the original
              terms.
            </p>
          </div>

          {/* Current Open Positions */}
          <div className="policy-section">
            <h2>Current Open Positions Eligible for Referral</h2>
            <p>
              Please visit our Careers Page to see all open positions currently
              eligible for referral:
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <Link href="/apply" className="btn btn-primary">
                <i
                  className="fas fa-briefcase"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                View Open Positions
              </Link>
            </div>
          </div>

          {/* Back button */}
          <div className="back-link">
            <Link href="/apply" className="btn btn-primary">
              <i className="fas fa-arrow-left"></i>
              <span>Back to Careers</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
