"use client";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartLink() {
  const { cart } = useCart();
  return (
    <Link href="/cart" className="relative flex items-center group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 text-dark-brown group-hover:text-deep-orange transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 006 0m-6 0V6.75A2.25 2.25 0 019.75 4.5h4.5A2.25 2.25 0 0116.5 6.75v7.5m-9 0h9m-9 0l-1.5 6.75m10.5-6.75l1.5 6.75"
        />
      </svg>
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-bright-red text-white text-xs rounded-full px-2 py-0.5 font-bold">
          {cart.length}
        </span>
      )}
    </Link>
  );
} 