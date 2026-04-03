"use client";

import { useEffect, useMemo, useState } from "react";

const initialForm = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  sku: "",
  rating: "",
  reviewCount: "",
  images: "",
};

const ADMIN_KEY_STORAGE = "luxe_lane_admin_key";

export default function AdminPage() {
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY_STORAGE) || "";
    if (stored) {
      setAdminKey(stored);
    }
  }, []);

  const secureHeaders = useMemo(
    () => ({ "Content-Type": "application/json", Authorization: `Bearer ${adminKey}` }),
    [adminKey],
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/products", { cache: "no-store" });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to load products");
      }

      setProducts(payload.data || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      loadProducts();
    }
  }, [adminKey]);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const trimmed = adminKeyInput.trim();
    if (!trimmed) {
      setError("Enter your admin key to access the portal.");
      return;
    }

    sessionStorage.setItem(ADMIN_KEY_STORAGE, trimmed);
    setAdminKey(trimmed);
    setAdminKeyInput("");
    setError("");
    setMessage("Logged in to admin portal.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAdminKey("");
    setProducts([]);
    resetForm();
    setMessage("Logged out.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      sku: form.sku,
      rating: form.rating ? Number(form.rating) : 0,
      reviewCount: form.reviewCount ? Number(form.reviewCount) : 0,
      images: form.images
        ? form.images
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
    };

    try {
      setError("");
      setMessage("");

      const endpoint = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: secureHeaders,
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Request failed");
      }

      setMessage(editingId ? "Product updated." : "Product created.");
      resetForm();
      await loadProducts();
    } catch (submitError) {
      setError(submitError.message || "Failed to save product");
    }
  };

  const startEditing = (product) => {
    setActiveTab("products");
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      originalPrice: product.original_price ?? "",
      sku: product.sku || "",
      rating: product.rating ?? "",
      reviewCount: product.review_count ?? "",
      images: (product.images || []).join("\n"),
    });
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Delete failed");
      }

      setMessage("Product removed.");
      if (editingId === id) {
        resetForm();
      }
      await loadProducts();
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete");
    }
  };

  const totalProducts = products.length;
  const avgPrice = totalProducts
    ? (products.reduce((sum, item) => sum + Number(item.price || 0), 0) / totalProducts).toFixed(2)
    : "0.00";

  if (!adminKey) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold mb-2">Admin Portal Login</h1>
          <p className="text-sm text-gray-600 mb-5">
            Enter your admin key. By default it is <code>admin123</code> unless set with <code>ADMIN_PORTAL_KEY</code>.
          </p>
          <input
            type="password"
            value={adminKeyInput}
            onChange={(event) => setAdminKeyInput(event.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3"
            placeholder="Admin key"
          />
          <button type="submit" className="w-full bg-black text-white rounded-lg py-2 hover:bg-gray-800">
            Access Portal
          </button>
          {error ? <p className="text-red-600 text-sm mt-3">{error}</p> : null}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-white border border-gray-200 rounded-2xl p-4 h-fit">
          <h1 className="text-xl font-semibold mb-4">Admin Portal</h1>
          <nav className="space-y-2 mb-6">
            {[
              ["dashboard", "Dashboard"],
              ["products", "Products"],
              ["settings", "Settings"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  activeTab === key ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} className="w-full px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Logout
          </button>
        </aside>

        <section className="space-y-4">
          {message ? <p className="text-green-700">{message}</p> : null}
          {error ? <p className="text-red-600">{error}</p> : null}

          {activeTab === "dashboard" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-2xl p-5">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-semibold">{totalProducts}</p>
              </div>
              <div className="bg-white border rounded-2xl p-5">
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="text-3xl font-semibold">₹{avgPrice}</p>
              </div>
            </div>
          ) : null}

          {activeTab === "products" ? (
            <>
              <form
                onSubmit={handleSubmit}
                className="grid gap-3 md:grid-cols-2 bg-white p-4 rounded-2xl border border-gray-200"
              >
                <input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Name" className="border rounded px-3 py-2" required />
                <input value={form.sku} onChange={(event) => updateForm("sku", event.target.value)} placeholder="SKU" className="border rounded px-3 py-2" required />
                <input value={form.price} onChange={(event) => updateForm("price", event.target.value)} placeholder="Price" type="number" min="0" step="0.01" className="border rounded px-3 py-2" required />
                <input value={form.originalPrice} onChange={(event) => updateForm("originalPrice", event.target.value)} placeholder="Original Price" type="number" min="0" step="0.01" className="border rounded px-3 py-2" required />
                <input value={form.rating} onChange={(event) => updateForm("rating", event.target.value)} placeholder="Rating" type="number" min="0" max="5" step="0.1" className="border rounded px-3 py-2" />
                <input value={form.reviewCount} onChange={(event) => updateForm("reviewCount", event.target.value)} placeholder="Review Count" type="number" min="0" className="border rounded px-3 py-2" />
                <textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} placeholder="Description" className="border rounded px-3 py-2 md:col-span-2 min-h-24" required />
                <textarea value={form.images} onChange={(event) => updateForm("images", event.target.value)} placeholder="Image URLs (one URL per line)" className="border rounded px-3 py-2 md:col-span-2 min-h-24" />

                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                  {editingId ? (
                    <button type="button" onClick={resetForm} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>

              {loading ? (
                <p>Loading products...</p>
              ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="p-3">{product.name}</td>
                          <td className="p-3">{product.sku}</td>
                          <td className="p-3">₹{Number(product.price).toFixed(2)}</td>
                          <td className="p-3 flex gap-2">
                            <button onClick={() => startEditing(product)} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : null}

          {activeTab === "settings" ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-sm text-gray-700">
              <p className="font-medium mb-2">Security</p>
              <p>
                Set <code>ADMIN_PORTAL_KEY</code> in your environment to replace the default key.
              </p>
              <p className="mt-2">Example: <code>ADMIN_PORTAL_KEY=your-strong-secret</code></p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
