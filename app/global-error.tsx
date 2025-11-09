'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error occurred:', error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Error - K&C Logistics</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .error-container {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
          }
          .error-icon { font-size: 4rem; color: #ef4444; margin-bottom: 1.5rem; }
          h1 { color: #812530; margin-bottom: 1rem; font-size: 2rem; }
          p { color: #666; margin-bottom: 2rem; line-height: 1.6; }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid;
            cursor: pointer;
            font-size: 1rem;
          }
          .btn-primary {
            background: #FFD700;
            color: #812530;
            border-color: #FFD700;
          }
          .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255,215,0,0.3); }
        `}</style>
      </head>
      <body>
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h1>Critical Application Error</h1>
          <p>
            We&rsquo;re sorry, but something went critically wrong. Please try refreshing the page.
          </p>
          <button onClick={reset} className="btn btn-primary">
            <i className="fas fa-redo"></i>
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
