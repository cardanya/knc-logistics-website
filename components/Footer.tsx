import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>K&C Logistics</h3>
          <p>Your trusted solution partner in the logistics industry with 20 years of experience. Customer satisfaction is our priority.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/#home">Home</Link></li>
            <li><Link href="/#services">Our Services</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li><Link href="/parking-solutions">Parking Solutions</Link></li>
            <li><Link href="/warehousing-services">Warehousing Services</Link></li>
            <li><Link href="/supply-chain-solutions">Supply Chain Solutions</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links-footer">
            <a href="https://www.facebook.com/profile.php?id=61581692743100" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/knclogistics.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/knclogistics" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/knclogistics/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.tiktok.com/@knclogistics" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 K&C Logistics. All rights reserved.</p>
      </div>
    </footer>
  );
}
