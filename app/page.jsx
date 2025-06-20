import React from "react";
import ProductCard from "./components/ProductCard";
import prisma from "./lib/db";
import ClientProductGrid from "./components/ClientProductGrid";

export default async function Home() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return (
    <div className="min-h-screen bg-soft-beige p-8">
      <h1 className="text-3xl font-bold text-dark-brown mb-8">
        Welcome to Our Electronics Webshop
      </h1>
      <ClientProductGrid products={products} />
    </div>
  );
}
