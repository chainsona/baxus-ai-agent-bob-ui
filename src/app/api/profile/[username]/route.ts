import { NextResponse } from 'next/server';
type Params = Promise<{ username: string }>;

export async function GET(request: Request, context: { params: Params }) {
  try {
    const params = await context.params;
    const username = params.username;

    // Get the API URL from environment variable
    const apiUrl = process.env.API_URL || 'http://localhost:8000';

    const backendUrl = `${apiUrl}/profile/${username}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      // Handle non-OK responses
      return NextResponse.json(
        {
          error: `Error fetching profile: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    console.error('Error in Profile API route:', error);

    // Enhanced error response with more details
    const status =
      error instanceof Error && error.name === 'AbortError' ? 504 : 500;
    const message =
      error instanceof Error && error.name === 'AbortError'
        ? 'Request timed out while connecting to the backend server'
        : 'Error processing profile request.';

    return NextResponse.json({ error: message }, { status });
  }
}
