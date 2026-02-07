import { NextResponse } from 'next/server';

import { createJsonProductRepository } from '@/features/products/repositories/jsonProductRepository';

export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await props.params;
  const id = resolvedParams.id;
  const product = await createJsonProductRepository().getById(id);

  if (!product) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json(product, { status: 200 });
}
