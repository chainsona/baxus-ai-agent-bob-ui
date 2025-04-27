import { NextResponse } from 'next/server';
type Params = Promise<{ username: string }>;

export async function GET(request: Request, context: { params: Params }) {
  try {
    const params = await context.params;
    const username = params.username;

    // Get the API URL from environment variable
    const apiUrl = process.env.API_URL || 'http://localhost:8000';

    const backendUrl = `${apiUrl}/profile/${username}`;
    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error in Profile API route:', error);

    // Return a connection error
    return NextResponse.json(
      { error: 'Error processing profile request.' },
      { status: 500 }
    );
  }
}
