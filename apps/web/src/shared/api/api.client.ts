/**
 * Generic API Client for typed-openapi generated code
 *
 * This is a simple, production-ready wrapper that you can copy and customize.
 * It handles:
 * - Path parameter replacement
 * - Query parameter serialization
 * - JSON request/response handling
 * - Basic error handling
 *
 * Usage:
 * 1. Replace './C:/Users/pp7m4/Desktop/work/sub/apps/web/src/shared/api/generated.ts' with your actual generated file path
 * 2. Set your API_BASE_URL
 * 3. Customize error handling and headers as needed
 */

import { type Fetcher, createApiClient } from '@/shared/api/generated';

// Basic configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

/**
 * Simple fetcher implementation without external dependencies
 */
const defaultFetcher: Fetcher['fetch'] = async (input) => {
  const headers = new Headers();

  // Handle query parameters
  if (input.urlSearchParams) {
    input.url.search = input.urlSearchParams.toString();
  }

  // Handle request body for mutation methods
  const body = ['post', 'put', 'patch', 'delete'].includes(
    input.method.toLowerCase(),
  )
    ? JSON.stringify(input.parameters?.body)
    : undefined;

  if (body) {
    headers.set('Content-Type', 'application/json');
  }

  // Add custom headers
  if (input.parameters?.header) {
    Object.entries(input.parameters.header).forEach(([key, value]) => {
      if (value != null) {
        headers.set(key, String(value));
      }
    });
  }

  const response = await fetch(input.url, {
    method: input.method.toUpperCase(),
    ...(body && { body }),
    headers,
    ...input.overrides,
  });

  return response;
};

export const api = createApiClient({ fetch: defaultFetcher }, API_BASE_URL);
