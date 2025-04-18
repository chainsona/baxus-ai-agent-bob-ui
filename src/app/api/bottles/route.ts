import { NextResponse } from 'next/server';
import { bottles } from '@/lib/baxus';

export async function GET() {
  try {
    // Return the bottles directly from the baxus.ts file
    return NextResponse.json(bottles);
  } catch (error) {
    console.error('Error loading bottle dataset:', error);
    return NextResponse.json(
      { error: 'Failed to load bottle dataset' },
      { status: 500 }
    );
  }
}
