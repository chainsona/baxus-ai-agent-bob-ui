// API utilities for fetching data

// Type definitions for our data model
export interface Bottle {
  id: number;
  name: string;
  spirit_type: string;
  abv?: number;
  proof?: number | string;
  avg_msrp?: number;
  fair_price?: number;
  shelf_price?: number;
  total_score?: number;
  image_url?: string;
  ranking?: number;
  brand_id?: number | string;
  size?: number;
  popularity?: number;
  wishlist_count?: number;
  vote_count?: number;
  bar_count?: number;
  fill_percentage?: number;
  listing_url?: string; // URL to the bottle's listing on Baxus
  nft_address?: string; // NFT address if this bottle is tokenized

  // Additional metadata from Baxus API
  region?: string;
  country?: string;
  age?: number;
  year_bottled?: string;
  description?: string;
  flavor_profiles?: Record<string, number>; // Added flavor profiles property
}

export interface UserBar {
  username: string;
  bottles: Bottle[];
  wishlist: Bottle[];
}

// New profile API response types
export interface TasteProfile {
  dominant_flavors: string[];
  flavor_profiles: {
    sweet: number;
    woody: number;
    spicy: number;
    smoky: number;
    fruity: number;
    smooth: number;
    floral: number;
  };
  favorite_type: string;
  favorite_region: string;
}

export interface CollectionStats {
  bottle_count: number;
  type_count: number;
  region_count: number;
  diversity_score: number;
  types_distribution: Record<string, number>;
  regions_distribution: Record<string, number>;
}

export interface InvestmentInfo {
  estimated_value: {
    low: number;
    high: number;
    average: number;
    total: number;
  };
  bottle_count: number;
  bottles_with_price: number;
  price_range: {
    min: number;
    max: number;
  };
  value_by_type: Record<
    string,
    {
      count: number;
      total_value: number;
      avg_value: number;
      min_value: number;
      max_value: number;
    }
  >;
}

export interface UserProfile {
  username: string;
  taste_profile: TasteProfile;
  collection: {
    stats: CollectionStats;
    investment: InvestmentInfo;
    bottles?: BottleData[];
  };
}

export interface BottleData {
  id: number;
  name: string;
  image_url: string;
  type: string | null;
  spirit: string;
  price: number | null;
}

// Predefined flavor profiles by spirit type for enrichment
const FLAVOR_PROFILES_BY_TYPE: Record<string, Record<string, number>> = {
  Bourbon: {
    sweet: 0.8,
    woody: 0.7,
    spicy: 0.5,
    smoky: 0.2,
    fruity: 0.3,
    smooth: 0.6,
    floral: 0.2,
  },
  Scotch: {
    sweet: 0.3,
    woody: 0.6,
    spicy: 0.4,
    smoky: 0.8,
    fruity: 0.4,
    smooth: 0.5,
    floral: 0.2,
  },
  Rye: {
    sweet: 0.3,
    woody: 0.5,
    spicy: 0.9,
    smoky: 0.3,
    fruity: 0.2,
    smooth: 0.4,
    floral: 0.1,
  },
  Irish: {
    sweet: 0.6,
    woody: 0.4,
    spicy: 0.3,
    smoky: 0.2,
    fruity: 0.7,
    smooth: 0.8,
    floral: 0.4,
  },
  Japanese: {
    sweet: 0.5,
    woody: 0.7,
    spicy: 0.3,
    smoky: 0.4,
    fruity: 0.6,
    smooth: 0.7,
    floral: 0.6,
  },
  Canadian: {
    sweet: 0.7,
    woody: 0.6,
    spicy: 0.4,
    smoky: 0.2,
    fruity: 0.3,
    smooth: 0.7,
    floral: 0.3,
  },
  Whiskey: {
    sweet: 0.6,
    woody: 0.6,
    spicy: 0.4,
    smoky: 0.3,
    fruity: 0.3,
    smooth: 0.5,
    floral: 0.2,
  },
  Blended: {
    sweet: 0.6,
    woody: 0.5,
    spicy: 0.3,
    smoky: 0.4,
    fruity: 0.5,
    smooth: 0.7,
    floral: 0.3,
  },
  'Single Malt': {
    sweet: 0.4,
    woody: 0.6,
    spicy: 0.3,
    smoky: 0.7,
    fruity: 0.5,
    smooth: 0.5,
    floral: 0.3,
  },
  Tennessee: {
    sweet: 0.7,
    woody: 0.6,
    spicy: 0.4,
    smoky: 0.3,
    fruity: 0.3,
    smooth: 0.6,
    floral: 0.2,
  },
  American: {
    sweet: 0.6,
    woody: 0.6,
    spicy: 0.4,
    smoky: 0.3,
    fruity: 0.3,
    smooth: 0.5,
    floral: 0.2,
  },
  Rum: {
    sweet: 0.9,
    woody: 0.4,
    spicy: 0.3,
    smoky: 0.1,
    fruity: 0.7,
    smooth: 0.6,
    floral: 0.3,
  },
  Tequila: {
    sweet: 0.4,
    woody: 0.3,
    spicy: 0.6,
    smoky: 0.3,
    fruity: 0.5,
    smooth: 0.4,
    floral: 0.2,
  },
  Gin: {
    sweet: 0.3,
    woody: 0.1,
    spicy: 0.5,
    smoky: 0.1,
    fruity: 0.6,
    smooth: 0.4,
    floral: 0.9,
  },
  Vodka: {
    sweet: 0.2,
    woody: 0.1,
    spicy: 0.2,
    smoky: 0.1,
    fruity: 0.2,
    smooth: 0.9,
    floral: 0.3,
  },
  Cognac: {
    sweet: 0.7,
    woody: 0.6,
    spicy: 0.3,
    smoky: 0.2,
    fruity: 0.8,
    smooth: 0.7,
    floral: 0.5,
  },
};

/**
 * Generate flavor profiles based on spirit type
 * @param spiritType The type of spirit
 * @returns A flavor profile object with flavor intensities
 */
function generateFlavorProfileFromType(
  spiritType: string
): Record<string, number> {
  if (!spiritType) return FLAVOR_PROFILES_BY_TYPE['Whiskey'];

  // Try direct match first
  if (FLAVOR_PROFILES_BY_TYPE[spiritType]) {
    return FLAVOR_PROFILES_BY_TYPE[spiritType];
  }

  // Try partial match with improved logic
  let bestMatch = 'Whiskey'; // Default fallback
  let highestMatchScore = 0;

  for (const [type] of Object.entries(FLAVOR_PROFILES_BY_TYPE)) {
    // Calculate how well this type matches the given spirit type
    const typeWords = type.toLowerCase().split(/\s+/);
    const spiritWords = spiritType.toLowerCase().split(/\s+/);

    // Count word matches and calculate a match score
    let matchScore = 0;
    for (const typeWord of typeWords) {
      for (const spiritWord of spiritWords) {
        if (spiritWord.includes(typeWord) || typeWord.includes(spiritWord)) {
          matchScore += 1;
        }
      }
    }

    // Direct substring match gets a bonus
    if (spiritType.toLowerCase().includes(type.toLowerCase())) {
      matchScore += 2;
    }

    // Update best match if we found a better one
    if (matchScore > highestMatchScore) {
      highestMatchScore = matchScore;
      bestMatch = type;
    }
  }

  if (highestMatchScore > 0) {
    console.log(
      `Using ${bestMatch} flavor profile for ${spiritType} (match score: ${highestMatchScore})`
    );
    return FLAVOR_PROFILES_BY_TYPE[bestMatch];
  }

  // Default to whiskey
  return FLAVOR_PROFILES_BY_TYPE['Whiskey'];
}

/**
 * Determines if code is running on the server or client
 */
const isServer = typeof window === 'undefined';

/**
 * Gets the base URL for API requests
 */
const getBaseUrl = () => {
  // If on server, need to use absolute URLs
  if (isServer) {
    // Use environment variable or fallback
    return (
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000')
    );
  }
  // On client, use relative URLs
  return '';
};

/**
 * Fetches a user's bar data from the BAXUS API
 * @param username The username to fetch data for
 * @returns The user's bar data including bottles and wishlist
 */
export async function fetchUserBar(username: string): Promise<UserBar> {
  try {
    const baseUrl = getBaseUrl();
    // Using our server-side proxy to handle the BAXUS API request
    const response = await fetch(`${baseUrl}/api/baxus/${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Parse the error response
      const errorData = await response.json();
      throw new Error(errorData.error || `BAXUS API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user bar data:', error);
    throw error;
  }
}

/**
 * Fetches a user's profile data from the new profile API endpoint
 * @param username The username to fetch profile for
 * @returns The user's profile data including taste profile and collection info
 */
export async function fetchUserProfile(username: string): Promise<UserProfile> {
  try {
    const baseUrl = getBaseUrl();
    // Using our server-side proxy to handle the profile API request
    const response = await fetch(`${baseUrl}/api/profile/${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Parse the error response
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Profile API error: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    throw error;
  }
}

type RecommendationResponse = {
  similar: {
    id: number;
    name: string;
    description: string | null;
    type: string;
    image_url: string;
    producer: string;
    region: string;
    country: string;
    spirit_type: string;
    nft_address: string;
    similarity?: number;
    reason: string;
    flavor_profile: Record<string, number>;
    abv?: number;
    proof?: number;
    avg_msrp?: number;
    fair_price?: number;
    shelf_price?: number;
    brand_id: string;
    size?: number;
    age?: number;
    year_bottled?: string;
    flavor_profiles?: Record<string, number>;
    listing_url?: string;
  }[];
  diverse: {
    id: number;
    name: string;
    description: string | null;
    type: string;
    image_url: string;
    producer: string;
    region: string;
    country: string;
    spirit_type: string;
    nft_address: string;
    reason: string;
    flavor_profile: Record<string, number>;
    abv?: number;
    proof?: number;
    avg_msrp?: number;
    fair_price?: number;
    shelf_price?: number;
    brand_id: string;
    size?: number;
    age?: number;
    year_bottled?: string;
    flavor_profiles?: Record<string, number>;
    listing_url?: string;
  }[];
  analysis?: {
    similar: {
      bottle: Bottle;
      score: number;
      reason: string;
    }[];
  };
  [key: string]: unknown;
};

// Define recommendation item types to avoid repetition
type SimilarRecommendationItem = RecommendationResponse['similar'][0];
type DiverseRecommendationItem = RecommendationResponse['diverse'][0];
type RecommendationItem = SimilarRecommendationItem | DiverseRecommendationItem;

/**
 * Fetches personalized recommendations from the recommendation API
 * @param username The username to fetch recommendations for
 * @param similarCount Number of similar recommendations to fetch
 * @param diverseCount Number of diverse recommendations to fetch
 * @param diversityRatio The diversity ratio parameter (0-1)
 * @param useFallback Whether to use fallback test data instead of real API
 * @returns Recommendation response from the API
 */
export async function fetchRecommendations(
  username: string,
  similarCount: number = 3,
  diverseCount: number = 4,
  diversityRatio: number = 0.5,
  useFallback: boolean = false
): Promise<RecommendationResponse> {
  try {
    const baseUrl = getBaseUrl();
    // Use our server-side API route to proxy the request
    const url = `${baseUrl}/api/recommendations/${username}?similar=${similarCount}&diverse=${diverseCount}&diversity_ratio=${diversityRatio}${useFallback ? '&fallback=true' : ''}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Recommendations API error: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

/**
 * Loads the bottle dataset from CSV
 * @returns Array of bottles from the dataset
 */
export async function loadBottleDataset(): Promise<Bottle[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/bottles`);

    if (!response.ok) {
      throw new Error(`Failed to load bottle dataset: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading bottle dataset:', error);
    throw error;
  }
}

/**
 * Fetches detailed bottle information from the Baxus asset endpoint
 * @param nftAddress The NFT address of the bottle
 * @returns Enhanced bottle data with complete KPIs
 */
export async function fetchBottleDetails(
  nftAddress: string
): Promise<Partial<Bottle>> {
  try {
    const baseUrl = getBaseUrl();

    // Replace NFT_ADDRESS placeholder if it's being used literally
    const actualNftAddress =
      nftAddress === 'NFT_ADDRESS'
        ? 'cWD5ysH1GPcZMeKRCu5TX2aguiGx7KkgUMyBrj3gdCd' // Use a sample valid NFT address
        : nftAddress;

    console.log(`Fetching details for NFT: ${actualNftAddress}`);

    // Using our server-side proxy to handle the BAXUS asset API request
    const response = await fetch(`${baseUrl}/api/asset/${actualNftAddress}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Parse the error response
      const errorData = await response.json();
      throw new Error(
        errorData.error || `BAXUS Asset API error: ${response.status}`
      );
    }

    // The API now returns a pre-formatted Bottle object
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bottle details:', error);
    throw error;
  }
}

/**
 * Enhances bottle recommendations with additional KPIs from the Baxus asset API
 * @param recommendations The original recommendations
 * @returns Enhanced recommendations with complete KPIs and listing links
 */
export async function enhanceRecommendations(
  recommendations: RecommendationResponse
): Promise<RecommendationResponse> {
  try {
    console.log(
      'Enhancing recommendations:',
      JSON.stringify(recommendations, null, 2).substring(0, 200) + '...'
    );

    // Make a deep copy to avoid mutating the original object
    const enhancedRecommendations = JSON.parse(JSON.stringify(recommendations));

    // Log the structure of input recommendations to help debug
    for (const type of ['similar', 'diverse']) {
      console.log(
        `Before enhancement - ${type} structure:`,
        recommendations[type]
          ? `Found ${recommendations[type].length} items`
          : 'Not found'
      );
    }

    // Process all recommendation types
    for (const type of ['similar', 'diverse'] as const) {
      if (
        enhancedRecommendations[type] &&
        Array.isArray(enhancedRecommendations[type])
      ) {
        console.log(
          `Processing ${type}: ${enhancedRecommendations[type].length} items`
        );

        enhancedRecommendations[type] = await Promise.all(
          enhancedRecommendations[type].map(
            async (item: RecommendationItem, index: number) => {
              try {
                console.log(
                  `Processing ${type} item ${index} (ID: ${item.id}, Name: ${item.name})`
                );

                // Determine the NFT address to use
                const nftAddress = item.nft_address || null;

                let enhancedItem = { ...item };

                // Fetch details from API if we have an NFT address
                if (nftAddress) {
                  console.log(`Fetching details for NFT: ${nftAddress}`);
                  const details = await fetchBottleDetails(nftAddress);
                  console.log(
                    `Fetched details:`,
                    JSON.stringify({
                      name: details.name,
                      abv: details.abv,
                      proof: details.proof,
                      avg_msrp: details.avg_msrp,
                      age: details.age,
                    })
                  );

                  // Create enhanced item with all available metrics
                  // Preserve the original item structure and add/override with details
                  enhancedItem = {
                    ...item,
                    // Conditionally add values from API, preserving original values when API values are undefined
                    name: details.name || item.name,
                    spirit_type:
                      details.spirit_type || item.spirit_type || item.type,
                    abv: details.abv ?? item.abv,
                    proof: details.proof ?? item.proof,
                    avg_msrp: details.avg_msrp ?? item.avg_msrp,
                    fair_price: details.fair_price ?? item.fair_price,
                    shelf_price: details.shelf_price ?? item.shelf_price,
                    image_url: details.image_url || item.image_url,
                    brand_id: details.brand_id ?? item.brand_id,
                    size: details.size ?? item.size,
                    // Add new values from API if not already present
                    region: details.region || item.region,
                    country: details.country || item.country,
                    age: details.age ?? item.age,
                    year_bottled: details.year_bottled || item.year_bottled,
                    description: details.description || item.description,
                    // Also keep any existing flavor profiles
                    flavor_profiles:
                      details.flavor_profiles || item.flavor_profiles,
                    // Ensure listing URL is present
                    listing_url:
                      item.listing_url ||
                      `https://www.baxus.co/asset/${nftAddress}`,
                  };
                }

                // Add flavor profiles if missing
                if (
                  !enhancedItem.flavor_profiles ||
                  Object.keys(enhancedItem.flavor_profiles).length === 0
                ) {
                  const spiritType =
                    enhancedItem.spirit_type || enhancedItem.type || 'Whiskey';
                  enhancedItem.flavor_profiles =
                    generateFlavorProfileFromType(spiritType);
                  console.log(
                    `Added generated flavor profile for ${spiritType}`
                  );
                }

                console.log(
                  `Enhanced ${type} item:`,
                  JSON.stringify({
                    id: enhancedItem.id,
                    name: enhancedItem.name,
                    type: enhancedItem.type,
                    spirit_type: enhancedItem.spirit_type,
                    has_flavor_profiles: !!enhancedItem.flavor_profiles,
                    image_url: !!enhancedItem.image_url,
                  })
                );

                return enhancedItem;
              } catch (error) {
                console.error(`Error enhancing ${type} item ${index}:`, error);
                // If enhancement fails, at least try to add flavor profiles to the original item
                if (!item.flavor_profiles) {
                  const spiritType = item.spirit_type || item.type || 'Whiskey';
                  item.flavor_profiles =
                    generateFlavorProfileFromType(spiritType);
                  console.log(
                    `Added fallback flavor profile for ${spiritType}`
                  );
                }
                return item;
              }
            }
          )
        );
      }
    }

    return enhancedRecommendations;
  } catch (error) {
    console.error('Error in enhanceRecommendations:', error);
    // Return the original recommendations if an error occurs
    return recommendations;
  }
}
