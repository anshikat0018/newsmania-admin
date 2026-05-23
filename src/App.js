import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";

import ProtectedRoute from "./components/ProtectedRoute";

// Users
import SaveUser from "./pages/users/SaveUser";
import Users from "./pages/users/Users";

// Blogs
import SaveBlog from "./pages/blogs/SaveBlog";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blogs/BlogDetail";

// Categories
import Categories from "./pages/categories/Categories";

// Tags
import Tags from "./pages/tags/Tags";

// Errors
import NotFound from "./errors/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />


        {/* ================= DASHBOARD ================= */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>


        {/* ================= USERS ================= */}
        <Route element={<MainLayout />}>
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/save-user/:id?"
            element={
              <ProtectedRoute>
                <SaveUser />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= BLOGS================= */}
        <Route element={<MainLayout />}>
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/save-blog/:id?"
            element={
              <ProtectedRoute>
                <SaveBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog-details/:id"
            element={
              <ProtectedRoute>
                <BlogDetail />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= CATEGORIES ================= */}
        <Route element={<MainLayout />}>
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* ================= TAGS ================= */}
        <Route element={<MainLayout />}>
          <Route
            path="/tags"
            element={
              <ProtectedRoute>
                <Tags />
              </ProtectedRoute>
            }
          />
        </Route>


        {/* ================= ERROR ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;