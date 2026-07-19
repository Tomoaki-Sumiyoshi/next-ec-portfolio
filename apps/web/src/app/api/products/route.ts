import { NextRequest } from 'next/server';

import {
  forwardResponse,
  missingApiBaseUrlResponse,
} from '@/shared/api/server/proxyResponse';

const apiBaseUrl = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  if (!apiBaseUrl) {
    return missingApiBaseUrlResponse();
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

  return forwardResponse(response);
}
