import { NextRequest, NextResponse } from 'next/server';
import config from '@/lib/config';

/**
 * API route to debug environment variables
 * This should only be enabled in non-production environments
 * or be properly secured in production.
 */
export async function GET(request: NextRequest) {
  // Only allow in development or with authorization
  const isProduction = process.env.NODE_ENV === 'production';
  const isAuthorized =
    request.headers.get('x-debug-token') === process.env.DEBUG_TOKEN;

  if (isProduction && !isAuthorized) {
    return NextResponse.json(
      {
        error: 'Unauthorized access to debug endpoint',
      },
      { status: 401 }
    );
  }

  // Prepare a sanitized environment for debugging
  const sanitizedEnv = {
    // Basic environment
    NODE_ENV: process.env.NODE_ENV,

    // Next.js specific
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    VERCEL_URL: process.env.VERCEL_URL,

    // Config values
    config: {
      app: config.app,
      features: config.features,
      // Don't include sensitive API information
    },
  };

  return NextResponse.json(sanitizedEnv);
}
