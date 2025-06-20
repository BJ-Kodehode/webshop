import { auth } from '@clerk/nextjs';
import prisma from '../../lib/db';

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { items } = await req.json();
  if (!Array.isArray(items) || items.length === 0) {
    return new Response('No items', { status: 400 });
  }
  for (const item of items) {
    await prisma.purchase.create({
      data: {
        userId,
        productId: item.id,
        quantity: 1,
      },
    });
  }
  return new Response('OK', { status: 200 });
} 