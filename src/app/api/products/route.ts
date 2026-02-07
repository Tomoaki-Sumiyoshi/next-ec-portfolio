import { NextResponse } from 'next/server';

import { createJsonProductRepository } from '@/features/products/repositories/jsonProductRepository';

export async function GET() {
  const products = await createJsonProductRepository().list();
  return NextResponse.json(products);
}
