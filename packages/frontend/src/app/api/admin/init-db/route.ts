import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db-init';

// This should be properly secured in a real application!
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'development-admin-key';

export async function POST(request: NextRequest) {
  try {
    // Basic API key authentication
    const authHeader = request.headers.get('authorization');
    const apiKey = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : request.nextUrl.searchParams.get('key');
    
    // Verify API key
    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Initialize the database
    const result = await initializeDatabase();
    
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Database initialization failed',
          message: result.message,
          details: result.error
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database initialization API error:', error);
    
    return NextResponse.json(
      {
        error: 'An error occurred during database initialization',
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 