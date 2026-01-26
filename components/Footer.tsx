import Link from 'next/link';
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>{COMPANY_INFO.name}</h3>
          <p>{COMPANY_INFO.tagline} with {COMPANY_INFO.yearsOfExperience} of experience. Customer satisfaction is our priority.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li><Link href="/warehousing-services">Warehousing</Link></li>
            <li><Link href="/trucking">Trucking</Link></li>
            <li><Link href="/supply-chain-solutions">Supply Chain</Link></li>
            <li><Link href="/truck-parking">Truck Parking</Link></li>
            <li><Link href="/cross-docking">Cross Docking</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links-footer">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 {COMPANY_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
