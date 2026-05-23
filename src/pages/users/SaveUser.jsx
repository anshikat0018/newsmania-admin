import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/interceptor";

const SaveUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    status: "active"
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Edit mode data load
  useEffect(() => {
    if (id) {
      api.get(`user/${id}`)
        .then(res => {
          const data = res.data.data;
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            password: "",
            role: data.role || "",
            status: data.status || ""
          });
        })
        .catch(() => {
          setMessage({ type: "danger", text: "Failed to load user" });
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`user/${id}`, form);
        setMessage({ type: "success", text: "User updated successfully!" });
      } else {
        await api.post("user", form);
        setMessage({ type: "success", text: "User created successfully!" });
      }

      setTimeout(() => navigate("/users"), 1500);

    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Something went wrong"
      });
    }
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-0">{id ? "Edit User" : "New User"}</h4>
          <p className="text-muted small mb-0">
            {id ? "Update user details" : "Fill in the details to create a user"}
          </p>
        </div>
        <Link to="/users" className="btn btn-outline-secondary rounded-3 px-3">
          ← Back
        </Link>
      </div>

      {/* 🔥 Message */}
      {message.text && (
        <div className={`alert alert-${message.type} rounded-3`}>
          {message.text}
        </div>
      )}

      <div className="card shadow-sm rounded-4 border-0">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              {/* Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control rounded-3"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control rounded-3"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Enter 10 digit phone number"
                />
              </div>

              {/* Password (only add) */}
              
              <div className="col-md-6">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control rounded-3"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required={!id}
                  minLength={6}
                />
              </div>
              

              {/* Role */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Role</label>
                <select
                  name="role"
                  className="form-select rounded-3"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Status</label>
                <select
                  name="status"
                  className="form-select rounded-3"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="col-12">
                <hr />
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4"
                  >
                    {id ? "Update User" : "Save User"}
                  </button>

                  <Link to="/users" className="btn btn-outline-secondary rounded-3 px-4">
                    Cancel
                  </Link>
                </div>
              </div>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveUser;