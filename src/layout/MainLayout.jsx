import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api/interceptor";

const MainLayout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");



  useEffect(() => {
    const uName = localStorage.getItem("uname");
    const userRole = localStorage.getItem("role");
    if (uName) setUsername(uName);
    if (userRole) setRole(userRole);

    // Step 2: ProtectedRoute jab set kare tab sun lo
    const handleUserUpdated = () => {
      setUsername(localStorage.getItem("uname"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("userUpdated", handleUserUpdated);

    // Step 3: Cleanup
    return () => {
      window.removeEventListener("userUpdated", handleUserUpdated);
    };
  }, []);

  const handleLogout = async () => {
    if (!window.confirm("Do you really want to logout?")) return;

    try {
      const res = await api.post("auth/logout", {}, {
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* Sidebar */}
      <aside
        className="d-flex flex-column bg-dark text-white"
        style={{
          width: "250px",
          minWidth: "250px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Brand */}
        <div className="px-4 py-3 border-bottom border-secondary d-flex align-items-center gap-2">
          <i className="fas fa-layer-group text-primary fs-5"></i>
          <span className="fw-bold">{"News Management"}</span>
        </div>

        {/* Nav */}
        <nav className="flex-grow-1 overflow-auto py-2">
          <ul className="nav flex-column px-2">
            <li className="nav-item mb-2 p-2 text-center">
              <span className="fw-bold">Hello, {username}!</span>
            </li>
            <hr className="border-bottom border-secondary"/>

            {/* Dashboard */}
            <li className="nav-item mb-1">
              <Link to="/" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded-3">
                <i className="fas fa-tachometer-alt"></i>
                Dashboard
              </Link>
              <hr className="border-bottom border-secondary"/>
            </li>
            {/* USERS - sirf admin */}
            {role === "admin" && (
              <li className="nav-item mb-1">
                <span className="text-white px-3"><i className="fa fa-user"></i> Users</span>
                <ul className="nav flex-column ps-4 mt-1">
                  <li className="nav-item mb-1 small">
                    <Link to="/users" className="nav-link text-white"><i className="fas fa-arrow-right"></i> Users</Link>
                  </li>
                  <li className="nav-item mb-1 small">
                    <Link to="/save-user" className="nav-link text-white"><i className="fas fa-arrow-right"></i> Create User</Link>
                  </li>
                </ul>
                <hr className="border-bottom border-secondary"/>
              </li>
            )}

            {/* Blogs - admin */}
            {(role === "admin") && (
              <li className="nav-item mb-1">
                <span className="text-white px-3"><i className="fas fa-book"></i> News Blogs</span>
                <ul className="nav flex-column ps-4 mt-1">
                  <li className="nav-item mb-1 small">
                    <Link to="/blogs" className="nav-link text-white"><i className="fas fa-arrow-right"></i> All Blogs</Link>
                  </li>
                  <li className="nav-item mb-1 small">
                    <Link to="/save-blog" className="nav-link text-white"><i className="fas fa-arrow-right"></i> Create Blog</Link>
                  </li>
                </ul>
                <hr className="border-bottom border-secondary"/>
              </li>
            )}

            {/* Tags */}
            {(role === "admin") && (
            <li className="nav-item mb-1">
              <Link to="/tags" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded-3">
                <i className="fas fa-at"></i>
                Tags
              </Link>
              <hr className="border-bottom border-secondary"/>
            </li>
            )}

            {/* Categories */}
            {(role === "admin") && (
            <li className="nav-item mb-1">
              <Link to="/categories" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded-3">
                <i className="fas fa-list-check"></i>
                Categories
              </Link>
            </li>
            )}

          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-top border-secondary">
          <small className="text-white">© 2026 {"Your project"}</small>
        </div>
      </aside>

      {/* Main Area */}
      <div className="d-flex flex-column flex-grow-1">

        {/* Navbar */}
        <nav className="navbar bg-white border-bottom px-4 py-2 shadow-sm">
          <div className="d-flex align-items-center gap-3 w-100">

            <button className="btn btn-outline-secondary rounded-3">
              <i className="fas fa-bars"></i>
            </button>

            <span className="fw-semibold text-muted">
              {"Your Project"}
            </span>

            <div className="ms-auto d-flex align-items-center gap-3">
              
              <Link
                className="text-decoration-none text-dark d-flex align-items-center gap-2"
                to="./profile"
              >
                <i className="fas fa-user-circle fs-5"></i>
                <span className="text-capitalize">{ username }</span>
              </Link>

              <button className="btn btn-outline-danger rounded-3" onClick={handleLogout}>
                <i className="fas fa-right-from-bracket me-2"></i>
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;