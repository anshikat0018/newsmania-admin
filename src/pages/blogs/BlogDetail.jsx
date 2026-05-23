import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/interceptor";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`blog/${id}`);
      setBlog(res.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const getStatusBadge = (status) => {
    const map = {
      draft: "warning",
      published: "success",
      inactive: "secondary",
    };
    return map[status] || "secondary";
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center py-5">No Blog Found</div>;
  }

  return (
    <div className="container py-5">

      {/* BACK */}
      <Link to="/blogs" className="btn btn-outline-secondary mb-4">
        ← Back
      </Link>

      {/* MAIN CARD */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">

          {/* IMAGE */}
          {blog.image && (
            <img
              src={`http://localhost:5000${blog.image}`}
              alt="blog"
              className="img-fluid rounded-4 mb-3"
              style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
            />
          )}

          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

            <div>
              <h2 className="fw-bold mb-1 text-capitalize">
                {blog.title}
              </h2>

              <p className="text-muted mb-2">
                {blog.category?.name || "No Category"}
              </p>
            </div>

            <span className={`badge bg-${getStatusBadge(blog.status)} px-3 py-2 text-capitalize`}>
              {blog.status}
            </span>

          </div>

          {/* TAGS */}
          {blog.tags?.length > 0 && (
            <div className="mt-3">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="badge bg-light text-dark border me-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* CONTENT */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">

          <h5 className="mb-3">Content</h5>

          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </div>
      </div>

      {/* META */}
      <div className="row g-3 mt-3">

        {/* CREATED */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">

              <p className="text-muted small mb-2">Created On</p>

              <div className="fw-semibold">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>

            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">

              <p className="text-muted small mb-2">Category</p>

              <div className="fw-semibold text-capitalize">
                {blog.category?.name || "-"}
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BlogDetail;