import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/interceptor";
const Users = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchList = async () => {
    try {
      const res = await api.get(
        `user?page=${page}&limit=${limit}`
      );

      setList(res.data.data);
      setTotalPages(res.data.pagination.totalPages);

    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [page]);

  // STATUS TOGGLE
  const handleStatusToggle = async (user) => {
    try {
      const newStatus = user.status === "active" ? "inactive" : "active";

      await api.patch(`user/${user._id}/status`, {
        status: newStatus
      });

      setList(prev =>
        prev.map(u =>
          u._id === user._id ? { ...u, status: newStatus } : u
        )
      );

    } catch (error) {
      alert("Failed to update status");
    }
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`user/${id}`);

      setList(prev => prev.filter(user => user._id !== id));

    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between mb-3">
        <h4>Users</h4>

        <Link to="/save-user" className="btn btn-primary">
          + Add User
        </Link>
      </div>

      <div className="card shadow-sm rounded-4 border-0">
        <div className="card-body p-0">

          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th className="ps-4">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Active</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No Users Found
                  </td>
                </tr>
              ) : (
                list.map((user, index) => (
                  <tr key={user._id}>
                    <td className="ps-4">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td className="fw-semibold text-capitalize">
                      {user.name}
                    </td>

                    <td>{user.email}</td>
                    <td>{user.phone}</td>

                    <td>
                      <span className="badge bg-primary-subtle text-primary text-capitalize rounded-pill px-3">
                        {user.role}
                      </span>
                    </td>

                    {/* SWITCH */}
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={user.status === "active"}
                          onChange={() => handleStatusToggle(user)}
                        />
                      </div>
                    </td>

                    <td className="text-end pe-4">
                      <Link
                        className="btn btn-sm btn-outline-secondary me-2"
                        to={`/save-user/${user._id}`}
                      >
                        <i className="fa fa-edit"></i>
                      </Link>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center p-3">

            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Users;