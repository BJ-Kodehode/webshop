import React from "react";
import ProductCard from "./components/ProductCard";

const products = [
  {
    id: 1,
    name: "Smartphone X",
    description: "Latest smartphone with cutting-edge technology.",
    price: 999,
  },
  {
    id: 2,
    name: "Laptop Pro",
    description: "High-performance laptop for professionals.",
    price: 1499,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Noise-cancelling headphones with superior sound quality.",
    price: 199,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-soft-beige p-8">
      <h1 className="text-3xl font-bold text-dark-brown mb-8">
        Welcome to Our Electronics Webshop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
