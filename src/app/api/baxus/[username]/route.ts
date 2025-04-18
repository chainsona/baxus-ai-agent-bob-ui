import { NextRequest, NextResponse } from 'next/server';
import { Bottle, UserBar } from '@/lib/api';
import { bottles } from '@/lib/baxus';

// Helper to get mock data from our bottle dataset
async function getMockUserBar(username: string): Promise<UserBar> {
  // Take a random subset of bottles for the user's collection
  const shuffled = [...bottles].sort(() => 0.5 - Math.random());
  const userBottles = shuffled.slice(0, 15); // User has 15 bottles
  const userWishlist = shuffled.slice(15, 20); // User has 5 bottles in wishlist
  
  return {
    username,
    bottles: userBottles,
    wishlist: userWishlist
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;
    
    // Attempt to fetch from the BAXUS API
    const response = await fetch(`http://services.baxus.co/api/bar/user/${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Adding a timeout to prevent long waits if the API is down
      signal: AbortSignal.timeout(5000), 
    });
    
    if (!response.ok) {
      // Return an error response with the appropriate status code
      return NextResponse.json(
        { error: `BAXUS API returned status: ${response.status}` },
        { status: response.status }
      );
    }
    
    // Parse the response data
    const baxusData = await response.json();
    
    // Transform the data into the format our application expects
    // The BAXUS API returns an array of bar items, each with a 'product' property
    if (!Array.isArray(baxusData)) {
      return NextResponse.json(
        { error: 'Unexpected API response format' },
        { status: 500 }
      );
    }
    
    // Extract bottle information from each item in the bar
    const bottles = baxusData.map(item => {
      const product = item.product;
      return {
        id: product.id,
        name: product.name,
        spirit_type: product.spirit || '',
        abv: product.proof ? product.proof / 2 : undefined, // Convert proof to ABV
        proof: product.proof,
        avg_msrp: product.average_msrp || product.fair_price || product.shelf_price,
        fair_price: product.fair_price,
        shelf_price: product.shelf_price,
        total_score: product.popularity,
        image_url: product.image_url,
        brand_id: product.brand_id,
        // Include fill percentage from the bar item
        fill_percentage: item.fill_percentage,
      };
    });
    
    // Create the structured response our application expects
    const userBar: UserBar = {
      username: username,
      bottles: bottles,
      wishlist: [] // API doesn't seem to provide wishlist, so initialize empty
    };
    
    return NextResponse.json(userBar);
  } catch (error) {
    console.error('Error in BAXUS API proxy route:', error);
    
    // Return a connection error
    return NextResponse.json(
      { error: 'Connection error. Unable to reach BAXUS API.' },
      { status: 503 } // Service Unavailable
    );
  }
} 