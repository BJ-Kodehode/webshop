"use client";
import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, isSignedIn } = useUser();
  const [success, setSuccess] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    if (res.ok) {
      clearCart();
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-soft-beige p-8">
      <h1 className="text-3xl font-bold text-dark-brown mb-8">Your Cart</h1>
      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-8">
          Purchase successful! <a href="/purchases" className="underline text-deep-orange">View your purchase history</a>.
        </div>
      ) : cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-8">
            {cart.map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 mb-4 bg-white rounded shadow p-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-dark-brown">{item.name}</h2>
                  <p className="text-gray-700">{item.price} NOK</p>
                </div>
                <button
                  className="px-3 py-1 bg-bright-red text-white rounded hover:bg-deep-orange"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Total: {total} NOK</span>
            <button
              className="px-4 py-2 bg-dark-brown text-white rounded hover:bg-bright-red"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          {isSignedIn ? (
            <button
              className="w-full px-4 py-3 bg-deep-orange text-white rounded text-lg font-bold hover:bg-bright-red transition-colors"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-dark-brown">Please sign in to checkout.</span>
              <SignInButton mode="modal" />
            </div>
          )}
        </>
      )}
    </div>
  );
} 