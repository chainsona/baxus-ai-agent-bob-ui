import { NextRequest, NextResponse } from 'next/server';
import { bottles } from '@/lib/baxus';
import { Bottle } from '@/lib/api';

export async function GET(request: NextRequest) {
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