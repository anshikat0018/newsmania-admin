import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/interceptor";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";

const SaveBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    tags: [],
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState([]);

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      setPreview("");
      return;
    }
     if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      e.target.value = null;
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB!");
      e.target.value = null;
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ---------------- FETCH DROPDOWNS ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          api.get("category"),
          api.get("tag"),
        ]);

        setCategories(
          catRes.data.data.map((c) => ({
            value: c._id,
            label: c.name,
          }))
        );

        setTags(
          tagRes.data.data.map((t) => ({
            value: t.name,
            label: t.name,
          }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  // ---------------- LOAD BLOG FOR EDIT ----------------
  useEffect(() => {
    if (!id || !categories.length || !tags.length) return;

    const loadBlog = async () => {
      try {
        const res = await api.get(`blog/${id}`);
        const data = res.data.data;

        const catId = data.category?._id || data.category;

        const tagArray = data.tags
        ? data.tags.map(t => (typeof t === "string" ? t : t.name))
        : [];
        console.log("TAGS",tagArray);

        setForm({
          title: data.title || "",
          category: catId,
          content: data.content || "",
          tags: tagArray,
        });

        // CATEGORY SELECT
        const cat = categories.find((c) => c.value === catId);
        if (cat) setSelectedCategory(cat);

        // TAG SELECT
        const tagSelected = tags.filter((t) =>
          tagArray.includes(t.value)
        );
        setSelectedTag(tagSelected);
        setSelectedTag(tagSelected);

        // IMAGE PREVIEW
        if (data.image) {
          setPreview(`http://localhost:5000${data.image}`);
        }
      } catch (err) {
        setMessage({ type: "danger", text: "Failed to load blog" });
      }
    };

    loadBlog();
  }, [id, categories, tags]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("content", form.content);

      form.tags.forEach(tag => {
        formData.append("tags", tag);
      });

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await api.put(`blog/${id}`, formData);
        setMessage({ type: "success", text: "Blog updated successfully!" });
      } else {
        await api.post("blog", formData);
        setMessage({ type: "success", text: "Blog created successfully!" });
      }

      setTimeout(() => navigate("/blogs"), 1200);
    } catch (err) {
      setMessage({
        type: "danger",
        text: err.response?.data?.message || "Error",
      });
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between mb-3">
        <h4>{id ? "Edit Blog" : "Create Blog"}</h4>
        <Link to="/blogs" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Title"
          required
        />

        {/* CATEGORY */}
        <Select
          options={categories}
          value={selectedCategory}
          onChange={(s) => {
            setSelectedCategory(s);
            setForm({ ...form, category: s?.value || "" });
          }}
          menuPortalTarget={document.body} 
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }), menu: (base) => ({ ...base, zIndex: 9999 }), }}
          className="mb-3"
          required
        />

        {/* CONTENT */}
        <Editor
          apiKey="77oe8yk0fgdorenx3s8vv6mpctwirrlb7cid5jgj1xd1yrqh"
          value={form.content}
          onEditorChange={(content) =>
            setForm({ ...form, content })
          }
          init={{ height: 300 }}
        />

        {/* TAGS */}
        <Select
          isMulti
          options={tags}
          value={selectedTag}
          onChange={(selected) => {
            setSelectedTag(selected);

            setForm({
              ...form,
              tags: selected.map((t) => t.value),
            });
          }}
          className="mt-3 mb-3"
          required
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="form-control mb-2"
          required={!id}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: 200, marginTop: 10 }}
          />
        )}

        {/* BUTTON */}
        <button className="btn btn-primary mt-3">
          {id ? "Update" : "Save"}
        </button>

      </form>
    </div>
  );
};

export default SaveBlog;