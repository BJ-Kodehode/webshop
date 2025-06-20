"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";

export default function ClientProductGrid({ products }) {
  const { addToCart } = useCart();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
} 