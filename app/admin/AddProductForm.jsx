"use client";
import React, { useState } from "react";

export default function AddProductForm() {
  const [form, setForm] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
    });
    setLoading(false);
    if (res.ok) {
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      window.location.reload();
    } else {
      setError("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full p-2 border rounded" required />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
      <button type="submit" className="px-4 py-2 bg-deep-orange text-white rounded" disabled={loading}>{loading ? "Adding..." : "Add Product"}</button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
} 