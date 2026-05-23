import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/interceptor";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState("");

  const limit = 10;

  const fetchBlogs = async () => {
    try {
      const res = await api.get(`blog?page=${page}&limit=${limit}`);
      setBlogs(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");

    const handleUserUpdated = () => {
      setRole(localStorage.getItem("role") || "");
    };

    window.addEventListener("userUpdated", handleUserUpdated);
    return () => window.removeEventListener("userUpdated", handleUserUpdated);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`blog/${id}`);
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleStatus = async (status, id) => {
    try {
      await api.patch(`blog/${id}/status`, { status });

      setBlogs(prev =>
        prev.map(b =>
          b._id === id ? { ...b, status } : b
        )
      );
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between mb-3">
        <h4>Blogs</h4>

        {role !== "employee" && (
          <Link to="/save-blog" className="btn btn-primary">
            + Add Blog
          </Link>
        )}
      </div>

      <div className="card shadow-sm rounded-4 border-0">
        <div className="card-body p-0">

          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th className="ps-4">#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No Blogs Found
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td className="ps-4">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td>
                      <span
                        className="d-inline-block text-truncate text-capitalize"
                        style={{ maxWidth: "400px" }}
                      >
                         {blog.title}
                      </span>
                    </td>

                    <td>
                      {blog.category?.name || "-"}
                    </td>

                    {/* STATUS SWITCH */}
                    <td>
                      <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={blog.status === "active"}
                            onChange={(checked) =>
                            handleStatus(
                                checked ? "active" : "inactive",
                                blog._id
                            )
                            }
                        />
                        </div>
                    </td>

                    <td>
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="text-end pe-4">

                      <Link
                        to={`/blog-details/${blog._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="fa fa-circle-info"></i>
                      </Link>

                      {role !== "employee" && (
                        <>
                          <Link
                            to={`/save-blog/${blog._id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>

                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </>
                      )}

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

            <span>Page {page} of {totalPages}</span>

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

export default Blogs;