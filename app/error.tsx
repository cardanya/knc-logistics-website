'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h1>Oops! Something Went Wrong</h1>
          <p className="error-message">
            We encountered an unexpected error. Don&rsquo;t worry, our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="error-details">
              <summary>Error Details (Dev Only)</summary>
              <p>{error.message}</p>
              {error.stack && (
                <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                  {error.stack}
                </pre>
              )}
            </details>
          )}
          {process.env.NODE_ENV === 'production' && (
            <p className="error-hint">
              Error ID: {Math.random().toString(36).substring(7)}
              <br />
              Please contact support if this issue persists.
            </p>
          )}
          <div className="error-actions">
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              <i className="fas fa-redo"></i>
              Try Again
            </button>
            <Link href="/" className="btn btn-secondary">
              <i className="fas fa-home"></i>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
