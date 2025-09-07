import { NextRequest, NextResponse } from 'next/server';
import { searchCarSpecs } from '@/lib/perplexity';
import { CarSearchResult } from '@/types/car';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const carModel = searchParams.get('model');

    if (!carModel) {
      return NextResponse.json<CarSearchResult>({
        success: false,
        error: 'Car model parameter is required'
      }, { status: 400 });
    }

    const carSpec = await searchCarSpecs(carModel);

    if (!carSpec) {
      return NextResponse.json<CarSearchResult>({
        success: false,
        error: 'Car specifications not found'
      }, { status: 404 });
    }

    return NextResponse.json<CarSearchResult>({
      success: true,
      data: carSpec
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json<CarSearchResult>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
