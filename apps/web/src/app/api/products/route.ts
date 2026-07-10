import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: 'API_BASE_URL is not defined' },
      { status: 500 },
    );
  }

  const upstreamUrl = new URL('/api/products', apiBaseUrl);
  const ids = request.nextUrl.searchParams.getAll('ids');

  if (ids.length > 0) {
    upstreamUrl.searchParams.set('ids', ids.join(','));
  }

  const response = await fetch(upstreamUrl, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
