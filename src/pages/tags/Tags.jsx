import { useEffect, useState } from "react";
import api from "../../api/interceptor";

const Tags = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", status: "active" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH
  const fetchTags = async () => {
    try {
      const res = await api.get("tag");
      setList(res.data?.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await api.put(`tag/${editId}`, form);
      } else {
        // CREATE
        await api.post("tag", form);
      }

      // safest approach
      await fetchTags();

      // RESET
      setForm({ name: "", status: "active" });
      setEditId(null);

    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  // EDIT CLICK
  const handleEdit = (item) => {
    if (!item) return;
    setForm({
      name: item.name || "",
      status: item.status || "active",
    });

    setEditId(item._id);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this type?")) return;

    try {
      await api.delete(`tag/${id}`);
      setList(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // STATUS TOGGLE
  const toggleStatus = async (item) => {
    if (!item) return;

    const newStatus = item.status === "active" ? "inactive" : "active";

    try {
      await api.patch(`tag/${item._id}/status`, {
        status: newStatus,
      });

      setList(prev =>
        prev.map(t =>
          t._id === item._id ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      alert("Status update failed");
    }
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Tags</h4>
      </div>

      {/* FORM */}
      <div className="card shadow-sm rounded-4 border-0 mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">

            {/* NAME */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter tag name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            {/* BUTTON */}
            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update"
                  : "Add"}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm rounded-4 border-0">
        <div className="card-body p-0">

          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th className="ps-3">#</th>
                <th>Name</th>
                <th>Status</th>
                <th className="text-end pe-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    No Tags Found
                  </td>
                </tr>
              ) : (
                list.map((item, index) => {
                  if (!item) return null;

                  return (
                    <tr key={item._id}>
                      <td className="ps-3">{index + 1}</td>

                      <td className="fw-semibold">
                        {item?.name || "-"}
                      </td>

                      {/* SWITCH */}
                      <td>
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={item.status === "active"}
                            onChange={() => toggleStatus(item)}
                          />
                        </div>
                      </td>

                      <td className="text-end pe-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default Tags;