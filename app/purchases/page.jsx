import { auth } from '@clerk/nextjs';
import prisma from '../lib/db';
import Link from 'next/link';

export default async function PurchasesPage() {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="min-h-screen bg-soft-beige p-8">
        <h1 className="text-3xl font-bold text-dark-brown mb-8">Purchase History</h1>
        <p className="text-dark-brown">You must be signed in to view your purchases.</p>
      </div>
    );
  }
  const purchases = await prisma.purchase.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="min-h-screen bg-soft-beige p-8">
      <h1 className="text-3xl font-bold text-dark-brown mb-8">Your Purchases</h1>
      {purchases.length === 0 ? (
        <p className="text-gray-700">You have not made any purchases yet.</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="flex items-center gap-4 bg-white rounded shadow p-4">
              <img src={purchase.product.imageUrl} alt={purchase.product.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-dark-brown">{purchase.product.name}</h2>
                <p className="text-gray-700">{purchase.product.price} NOK</p>
                <p className="text-gray-500 text-sm">Purchased: {new Date(purchase.createdAt).toLocaleString()}</p>
                <p className="text-gray-500 text-sm">Quantity: {purchase.quantity}</p>
              </div>
              <Link href={`/products/${purchase.productId}`} className="text-deep-orange underline">View Product</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 