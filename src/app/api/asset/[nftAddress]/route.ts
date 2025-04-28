import { NextResponse } from 'next/server';
import type { Bottle } from '@/lib/api';

type Params = Promise<{ nftAddress: string }>;

/**
 * Proxy endpoint for fetching asset data from Baxus
 */
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { nftAddress } = await params;

    // Attempt to fetch from the BAXUS Asset API
    const response = await fetch(
      `https://www.baxus.co/asset/${nftAddress}?_data=routes%2Fasset%2F%24nftAddress`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Adding a timeout to prevent long waits if the API is down
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      // Return an error response with the appropriate status code
      return NextResponse.json(
        { error: `BAXUS Asset API returned status: ${response.status}` },
        { status: response.status }
      );
    }

    // Parse the response data
    const assetData = await response.json();

    // Transform the data for our application
    // Extract relevant metrics from the asset data
    const bottleData: Partial<Bottle> = {
      id: parseInt(
        assetData.asset?.assetId || assetData.asset?.attributes?.assetId || '0'
      ),
      name: assetData.asset?.name || '',
      spirit_type: assetData.asset?.type || assetData.asset?.spiritType || '',

      // Get ABV from attributes
      abv: assetData.asset?.attributes?.ABV
        ? parseFloat(assetData.asset.attributes.ABV)
        : undefined,

      // Calculate proof (ABV * 2) if abv is available
      proof: assetData.asset?.attributes?.ABV
        ? parseFloat(assetData.asset.attributes.ABV) * 2
        : undefined,

      // Price directly from the asset
      avg_msrp: assetData.asset?.price || undefined,

      // Use the same price for fair_price and shelf_price for now
      fair_price: assetData.asset?.price || undefined,
      shelf_price: assetData.asset?.price || undefined,

      // Image URL
      image_url: assetData.asset?.imageUrl || '',

      // Add additional useful info
      brand_id: assetData.asset?.attributes?.Producer || '',
      size: assetData.asset?.attributes?.Size
        ? parseInt(assetData.asset.attributes.Size.replace(/[^\d.]/g, ''))
        : undefined,

      // Add NFT-specific fields
      nft_address: nftAddress,
      listing_url: `https://www.baxus.co/asset/${nftAddress}`,

      // Additional metadata that might be useful
      region: assetData.asset?.attributes?.Region || '',
      country: assetData.asset?.attributes?.Country || '',
      age: assetData.asset?.attributes?.Age
        ? parseInt(assetData.asset.attributes.Age)
        : undefined,
      year_bottled: assetData.asset?.attributes?.['Year Bottled'] || '',
      description: assetData.asset?.description || '',
    };

    return NextResponse.json(bottleData);
  } catch (error) {
    console.error('Error in BAXUS Asset API proxy route:', error);

    // Return a connection error
    return NextResponse.json(
      { error: 'Connection error. Unable to reach BAXUS Asset API.' },
      { status: 503 } // Service Unavailable
    );
  }
}
