import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            Sorry, the page you are looking for doesn&rsquo;t exist or has been moved.
          </p>

          <div className="not-found-actions">
            <Link href="/" className="btn btn-primary">
              <i className="fas fa-home"></i>
              Back to Home
            </Link>
          </div>

          <div className="not-found-links">
            <h3>Popular Pages</h3>
            <ul>
              <li>
                <Link href="/#services">
                  <i className="fas fa-truck"></i>
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/parking-solutions">
                  <i className="fas fa-parking"></i>
                  Parking Solutions
                </Link>
              </li>
              <li>
                <Link href="/warehousing-services">
                  <i className="fas fa-warehouse"></i>
                  Warehousing Services
                </Link>
              </li>
              <li>
                <Link href="/supply-chain-solutions">
                  <i className="fas fa-network-wired"></i>
                  Supply Chain Solutions
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <i className="fas fa-envelope"></i>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
