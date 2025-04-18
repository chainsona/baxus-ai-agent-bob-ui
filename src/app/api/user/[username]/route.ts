import { NextResponse } from 'next/server';
import { Bottle, UserBar } from '@/lib/api';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Helper to get mock data from our bottle dataset
async function getMockUserBar(username: string): Promise<UserBar> {
  // Read the CSV file
  const filePath = path.join(
    process.cwd(),
    'data/501 Bottle Dataset - Sheet1.csv'
  );
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Parse the CSV content
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as Bottle[];

  // Convert numeric strings to numbers
  const bottles = records.map((bottle) => ({
    ...bottle,
    id: Number(bottle.id),
    abv: bottle.abv ? Number(bottle.abv) : undefined,
    proof: bottle.proof ? Number(bottle.proof) : undefined,
    avg_msrp: bottle.avg_msrp ? Number(bottle.avg_msrp) : undefined,
    fair_price: bottle.fair_price ? Number(bottle.fair_price) : undefined,
    shelf_price: bottle.shelf_price ? Number(bottle.shelf_price) : undefined,
    total_score: bottle.total_score ? Number(bottle.total_score) : undefined,
    ranking: bottle.ranking ? Number(bottle.ranking) : undefined,
    brand_id: bottle.brand_id ? Number(bottle.brand_id) : undefined,
  }));

  // Take a random subset of bottles for the user's collection
  const shuffled = [...bottles].sort(() => 0.5 - Math.random());
  const userBottles = shuffled.slice(0, 15); // User has 15 bottles
  const userWishlist = shuffled.slice(15, 20); // User has 5 bottles in wishlist

  return {
    username,
    bottles: userBottles,
    wishlist: userWishlist,
  };
}

type Params = Promise<{ username: string }>;

export async function GET(request: Request, context: { params: Params }) {
  try {
    const params = await context.params;
    const username = params.username;

    // In a real app, we would fetch this from the BAXUS API
    // For demo purposes, we'll generate mock data
    const userBar = await getMockUserBar(username);

    return NextResponse.json(userBar);
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
