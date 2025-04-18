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
  brand_id?: number;
  size?: number;
  popularity?: number;
  wishlist_count?: number;
  vote_count?: number;
  bar_count?: number;
  fill_percentage?: number;
}

export interface UserBar {
  username: string;
  bottles: Bottle[];
  wishlist: Bottle[];
}

/**
 * Fetches a user's bar data from the BAXUS API
 * @param username The username to fetch data for
 * @returns The user's bar data including bottles and wishlist
 */
export async function fetchUserBar(username: string): Promise<UserBar> {
  try {
    // Using our server-side proxy to handle the BAXUS API request
    const response = await fetch(`/api/baxus/${username}`, {
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
 * Loads the bottle dataset from CSV
 * @returns Array of bottles from the dataset
 */
export async function loadBottleDataset(): Promise<Bottle[]> {
  try {
    const response = await fetch('/api/bottles');
    
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