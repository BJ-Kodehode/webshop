"use client";
import React, { useState } from "react";
//commit
export default function DeleteProductButton({ productId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    setError(null);
    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.reload();
    } else {
      setError("Failed to delete product");
    }
  };

  return (
    <>
      <button className="px-3 py-1 bg-bright-red text-white rounded" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </>
  );
} 