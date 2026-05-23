import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/interceptor";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("auth/login",form);

      if (res.data.success) {
        // alert("Login Successful");

        // optional: localStorage
        localStorage.setItem("user", JSON.stringify(res.data.userData));

        navigate("/");
      } else {
        alert(res.data.message || "Login failed");
      }

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Server error";

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.clear();
  },[])

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "420px" }}>

        {/* Brand */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 mb-3"
            style={{ width: "52px", height: "52px" }}
          >
            <i className="fas fa-layer-group text-white fs-5"></i>
          </div>
          <h4 className="fw-bold mb-0">News Management</h4>
          <p className="text-muted small">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-envelope text-muted"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control border-start-0"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-lock text-muted"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control border-start-0 border-end-0"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text bg-light border-start-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label small text-muted">
                    Remember me
                  </label>
                </div>

                <Link to="#" className="small text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted small mt-4">
          © 2026 Your Project. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Login;