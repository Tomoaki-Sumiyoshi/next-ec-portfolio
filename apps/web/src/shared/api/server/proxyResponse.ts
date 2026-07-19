import { NextResponse } from 'next/server';

export function missingApiBaseUrlResponse() {
  return NextResponse.json(
    { message: 'API_BASE_URL is not defined' },
    { status: 500 }
  );
}

export function forwardResponse(response: Response) {
  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'Content-Type':
        response.headers.get('Content-Type') ?? 'application/json',
    },
  });
}
