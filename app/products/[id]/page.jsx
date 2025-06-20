"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '../../components/CartContext';

const ProductPage = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${id}`);
        if (!response.ok) throw new Error('Not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Product not found');
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <div className="p-8 text-red-600">Product not found.</div>;
  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-soft-beige flex flex-col items-center p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full flex flex-col items-center">
        <img src={product.imageUrl} alt={product.name} className="w-64 h-64 object-cover rounded mb-6 bg-gray-100" />
        <h1 className="text-3xl font-bold text-dark-brown mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4 text-center">{product.description}</p>
        <p className="text-2xl font-bold text-deep-orange mb-6">{product.price} NOK</p>
        <button
          className="px-6 py-3 bg-deep-orange text-white rounded text-lg font-bold hover:bg-bright-red transition-colors"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
