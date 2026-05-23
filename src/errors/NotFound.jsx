import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center p-5">

            {/* 404 Badge */}
            <div
              className="d-inline-flex align-items-center justify-content-center bg-primary-subtle rounded-circle mb-4"
              style={{ width: "80px", height: "80px" }}
            >
              <i className="fas fa-map-location-dot text-primary fs-2"></i>
            </div>

            {/* Code */}
            <h1 className="fw-bold text-primary mb-1" style={{ fontSize: "4rem" }}>
              404
            </h1>

            {/* Text */}
            <h5 className="fw-bold mb-2">Page Not Found</h5>
            <p className="text-muted mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Actions */}
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/" className="btn btn-primary rounded-3 px-4">
                <i className="fas fa-house me-2"></i>Go to Dashboard
              </Link>
              <Link to={-1} className="btn btn-outline-secondary rounded-3 px-4">
                <i className="fas fa-arrow-left me-2"></i>Go Back
              </Link>
            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted small mt-4">
          © 2026 TaskManager. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;