import { NextResponse } from 'next/server';

// Example CRUD API route for products
export async function GET(request) {
  // Fetch products from the database
  return NextResponse.json({ message: 'Fetch products' });
}

export async function POST(request) {
  // Add a new product to the database
  return NextResponse.json({ message: 'Product added' });
}

export async function PUT(request) {
  // Update a product in the database
  return NextResponse.json({ message: 'Product updated' });
}

export async function DELETE(request) {
  // Delete a product from the database
  return NextResponse.json({ message: 'Product deleted' });
}
