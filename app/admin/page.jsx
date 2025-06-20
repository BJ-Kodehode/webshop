import { auth, currentUser } from '@clerk/nextjs';
import prisma from '../lib/db';
import Link from 'next/link';

const ADMIN_EMAIL = 'admin@example.com'; // Change to your email

export default async function AdminPage() {
  const user = await currentUser();
  if (!user || user.emailAddresses[0].emailAddress !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-soft-beige p-8">
        <h1 className="text-3xl font-bold text-dark-brown mb-8">Admin Panel</h1>
        <p className="text-red-600">Access denied. You are not an admin.</p>
      </div>
    );
  }

  // Fetch all products and purchases
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  const purchases = await prisma.purchase.findMany({
    include: { product: true, user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-soft-beige p-8">
      <h1 className="text-3xl font-bold text-dark-brown mb-8">Admin Panel</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <AddProductForm />
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="flex items-center gap-4 bg-white rounded shadow p-4">
              <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dark-brown">{product.name}</h3>
                <p className="text-gray-700">{product.price} NOK</p>
              </div>
              <Link href={`/products/${product.id}`} className="text-deep-orange underline">View</Link>
              <EditProductButton product={product} />
              <DeleteProductButton productId={product.id} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Purchases</h2>
        <ul className="space-y-4">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="flex items-center gap-4 bg-white rounded shadow p-4">
              <img src={purchase.product.imageUrl} alt={purchase.product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h4 className="text-md font-semibold text-dark-brown">{purchase.product.name}</h4>
                <p className="text-gray-700">{purchase.product.price} NOK</p>
                <p className="text-gray-500 text-sm">By: {purchase.user?.email || purchase.userId}</p>
                <p className="text-gray-500 text-sm">{new Date(purchase.createdAt).toLocaleString()}</p>
                <p className="text-gray-500 text-sm">Quantity: {purchase.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// --- Client Components for Add/Edit/Delete ---

import dynamic from 'next/dynamic';
const AddProductForm = dynamic(() => import('./AddProductForm'), { ssr: false });
const EditProductButton = dynamic(() => import('./EditProductButton'), { ssr: false });
const DeleteProductButton = dynamic(() => import('./DeleteProductButton'), { ssr: false }); 