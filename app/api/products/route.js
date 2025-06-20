import { NextResponse } from 'next/server';
import prisma from '../../lib/db';

// Example CRUD API route for products
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  }
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request) {
  const data = await request.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(request) {
  const data = await request.json();
  const { id, ...rest } = data;
  const product = await prisma.product.update({ where: { id }, data: rest });
  return NextResponse.json(product);
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: 'Product deleted' });
}
