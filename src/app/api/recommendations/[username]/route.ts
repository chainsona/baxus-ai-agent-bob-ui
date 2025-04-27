import { NextResponse } from 'next/server';
import { enhanceRecommendations } from '@/lib/api';

type Params = Promise<{ username: string }>;

export async function GET(request: Request, context: { params: Params }) {
  try {
    const params = await context.params;
    const username = params.username;

    // Get the URL parameters
    const url = new URL(request.url);
    const similarCount = url.searchParams.get('similar') || '2';
    const diverseCount = url.searchParams.get('diverse') || '3';
    const diversityRatio = url.searchParams.get('diversity_ratio') || '0.4';
    const enhanceData = url.searchParams.get('enhance') !== 'false'; // Default to true
    const useFallback = url.searchParams.get('fallback') === 'true'; // For testing

    console.log(
      `Fetching recommendations for ${username} (similar: ${similarCount}, diverse: ${diverseCount})`
    );

    // If fallback was explicitly requested, return an error since we no longer support fallbacks
    if (useFallback) {
      console.log('Fallback data was requested but is no longer available');
      return NextResponse.json(
        {
          error:
            'Fallback data is not available. Please connect to the actual API.',
        },
        { status: 400 }
      );
    }

    // Get the API URL from environment variable
    const apiUrl = process.env.API_URL || 'http://localhost:8000';

    // Build the backend API URL
    const backendUrl = `${apiUrl}/recommendations/${username}?similar=${similarCount}&diverse=${diverseCount}&diversity_ratio=${diversityRatio}`;

    console.log(`Requesting from backend API: ${backendUrl}`);

    // Fetch data from the backend API
    let response;
    try {
      console.log(`Attempting to fetch data from: ${backendUrl}`);
      response = await fetch(backendUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
    } catch (fetchError) {
      console.error('Network error fetching recommendations:', fetchError);

      // Try one more time before returning an error
      try {
        console.log('Retrying API request...');
        response = await fetch(backendUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
          // Shorter timeout for retry
          signal: AbortSignal.timeout(5000), // 5 second timeout for retry
        });
      } catch (retryError) {
        console.error('Retry also failed:', retryError);
        return NextResponse.json(
          {
            error:
              'Could not connect to recommendations API after multiple attempts.',
          },
          { status: 503 }
        );
      }
    }

    if (!response.ok) {
      // Handle error responses from the backend
      console.error(`Backend API error: ${response.status}`);
      try {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        return NextResponse.json(
          { error: errorData.error || `Backend API error: ${response.status}` },
          { status: response.status }
        );
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
        return NextResponse.json(
          { error: `Backend API returned status ${response.status}` },
          { status: response.status }
        );
      }
    }

    // Parse the recommendations data
    let recommendationsData;
    try {
      recommendationsData = await response.json();

      // Validate the response structure
      if (
        !recommendationsData.similar ||
        !recommendationsData.diverse ||
        !Array.isArray(recommendationsData.similar) ||
        !Array.isArray(recommendationsData.diverse)
      ) {
        console.error('Invalid API response format:', recommendationsData);
        return NextResponse.json(
          { error: 'API returned an invalid response format.' },
          { status: 500 }
        );
      }

      // Check for empty arrays
      if (
        recommendationsData.similar.length === 0 &&
        recommendationsData.diverse.length === 0
      ) {
        console.log('API returned empty recommendations');
        // Return empty arrays instead of an error
        return NextResponse.json({
          similar: [],
          diverse: [],
        });
      }

      // Check that the items have the expected structure
      const hasValidItems =
        (recommendationsData.similar[0]?.id &&
          recommendationsData.similar[0]?.name) ||
        (recommendationsData.diverse[0]?.id &&
          recommendationsData.diverse[0]?.name);

      if (!hasValidItems) {
        console.error('Recommendations missing valid item data structure');
        return NextResponse.json(
          {
            error: 'API returned recommendations with invalid data structure.',
          },
          { status: 500 }
        );
      }
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse API response.' },
        { status: 500 }
      );
    }

    console.log('Successfully received recommendations from API');

    // Enhance the recommendations with additional KPIs if requested
    let data;
    try {
      data = enhanceData
        ? await enhanceRecommendations(recommendationsData)
        : recommendationsData;

      // Final validation of enhanced data
      if (
        !data.similar ||
        !data.diverse ||
        !Array.isArray(data.similar) ||
        !Array.isArray(data.diverse)
      ) {
        console.error('Invalid data structure after enhancement');
        return NextResponse.json(
          { error: 'Data enhancement failed.' },
          { status: 500 }
        );
      }
    } catch (enhanceError) {
      console.error('Error enhancing recommendations:', enhanceError);
      // If enhancement fails, return the original data
      data = recommendationsData;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Recommendations API route:', error);

    // Return a proper error response
    return NextResponse.json(
      { error: 'Error processing recommendations request.' },
      { status: 500 }
    );
  }
}
