import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: 'API_BASE_URL is not defined' },
      { status: 500 },
    );
  }

  const search = request.nextUrl.search;
  const upstreamUrl = `${apiBaseUrl.replace(/\/$/, '')}/api/products${search}`;

  const response = await fetch(upstreamUrl, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
