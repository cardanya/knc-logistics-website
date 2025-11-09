export default function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-logo">
          <div className="loader-text">K&C</div>
          <div className="loader-subtext">LOGISTICS</div>
        </div>
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loader-message">Loading...</p>
      </div>
    </div>
  );
}
