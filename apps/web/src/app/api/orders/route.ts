import { NextRequest } from 'next/server';

import {
  forwardResponse,
  missingApiBaseUrlResponse,
} from '@/shared/api/server/proxyResponse';

const apiBaseUrl = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  const upstreamUrl = createUpstreamUrl(request);
  if (!upstreamUrl) {
    return missingApiBaseUrlResponse();
  }

  const response = await fetch(upstreamUrl, {
    method: 'GET',
    cache: 'no-store',
  });

  return forwardResponse(response);
}

export async function POST(request: NextRequest) {
  const upstreamUrl = createUpstreamUrl(request);
  if (!upstreamUrl) {
    return missingApiBaseUrlResponse();
  }

  const response = await fetch(upstreamUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: await request.text(),
    cache: 'no-store',
  });

  return forwardResponse(response);
}

function createUpstreamUrl(request: NextRequest): URL | null {
  if (!apiBaseUrl) return null;

  const upstreamUrl = new URL('/api/orders', apiBaseUrl);
  const userId = request.nextUrl.searchParams.get('userId');
  const orderId = request.nextUrl.searchParams.get('id');

  if (userId) upstreamUrl.searchParams.set('userId', userId);
  if (orderId) upstreamUrl.searchParams.set('id', orderId);

  return upstreamUrl;
}
