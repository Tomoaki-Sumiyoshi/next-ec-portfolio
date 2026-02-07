import { NextResponse } from 'next/server';

import { createJsonProductRepository } from '@/features/products/repositories/jsonProductRepository';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const data = await createJsonProductRepository().getById(params.id);
  return NextResponse.json(data);
}
