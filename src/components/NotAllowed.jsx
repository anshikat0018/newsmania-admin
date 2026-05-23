import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotAllowed() {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center p-5">

            {/* Icon */}
            <div
              className="d-inline-flex align-items-center justify-content-center bg-danger-subtle rounded-circle mb-4"
              style={{ width: "80px", height: "80px" }}
            >
              <FaLock size="2em" className="text-danger" />
            </div>

            {/* Text */}
            <h4 className="fw-bold mb-2">Access Denied</h4>
            <p className="text-muted mb-4">
              You don't have permission to view this page. Please contact
              your administrator to request access.
            </p>

            {/* Actions */}
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/" className="btn btn-primary rounded-3 px-4">
                <i className="fas fa-tachometer-alt me-2"></i>Go to Dashboard
              </Link>
              <Link to={-1} className="btn btn-outline-secondary rounded-3 px-4">
                <i className="fas fa-arrow-left me-2"></i>Go Back
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}