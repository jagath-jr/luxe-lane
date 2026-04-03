"use client";

import { useEffect, useState } from "react";

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

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    loadProducts();
  }, []);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
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
        headers: { "Content-Type": "application/json" },
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

      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
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

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-semibold mb-6">Admin Product Manager</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8">
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

      {message ? <p className="text-green-700 mb-4">{message}</p> : null}
      {error ? <p className="text-red-600 mb-4">{error}</p> : null}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
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
    </main>
  );
}
