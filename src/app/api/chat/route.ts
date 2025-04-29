import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const { prompt, conversationHistory, userContext } = requestData;

    console.log('Received full request:', JSON.stringify(requestData, null, 2));
    console.log('Conversation history received:', conversationHistory);

    const shouldStream = true; // Enable streaming by default for better UX

    // Forward the request to external API
    const apiUrl = process.env.API_URL || '';
    console.log('Calling API URL:', apiUrl);

    const response = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        username: userContext?.username || null,
        conversation_history: Array.isArray(conversationHistory)
          ? conversationHistory
          : [],
        stream: shouldStream,
      }),
    });

    console.log('API response status:', response.status);
    console.log(
      'API response headers:',
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      return new Response(
        JSON.stringify({
          error: errorData.message || 'Failed to get response',
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check content type to determine if it's a stream
    const contentType = response.headers.get('Content-Type') || '';
    console.log(
      `Content-Type: ${contentType}, isStream: ${contentType.includes('text/event-stream')}`
    );

    if (shouldStream && contentType.includes('text/event-stream')) {
      console.log('Received SSE stream from backend');

      // Use a simpler approach - collect the entire response and stream it whole
      let completeResponse = '';

      try {
        // Read the entire response as text
        const responseText = await response.text();

        // Parse the SSE stream to extract content
        const lines = responseText.split('\n');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const jsonText = line.slice(5).trim();
              if (!jsonText) continue;

              const data = JSON.parse(jsonText);
              if (data.content) {
                completeResponse += data.content;
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }

        console.log('Extracted complete response:', completeResponse);
      } catch (error) {
        console.error('Error processing response:', error);
        return new Response(
          JSON.stringify({ error: 'Error processing response' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Simply return the complete text in AI SDK format
      return new Response(completeResponse, {
        headers: {
          'Content-Type': 'text/plain', // The AI SDK expects plain text
        },
      });
    } else {
      // Get the response JSON for non-streaming responses
      const data = await response.json();
      console.log('API response data:', data);

      // For non-streaming responses, return plain text
      return new Response(data.response || '', {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  } catch (error) {
    console.error('Error in chat API route:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
