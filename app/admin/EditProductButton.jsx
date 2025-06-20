"use client";
import React, { useState } from "react";

export default function EditProductButton({ product }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...product });
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), id: product.id }),
    });
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      window.location.reload();
    } else {
      setError("Failed to update product");
    }
  };

  return (
    <>
      <button className="px-3 py-1 bg-warm-brown text-white rounded" onClick={() => setOpen(true)}>
        Edit
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-lg w-full">
            <h3 className="text-lg font-bold mb-2">Edit Product</h3>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full p-2 border rounded" required />
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-deep-orange text-white rounded" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setOpen(false)}>Cancel</button>
            </div>
            {error && <div className="text-red-600">{error}</div>}
          </form>
        </div>
      )}
    </>
  );
} 