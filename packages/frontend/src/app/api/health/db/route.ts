import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseConnection, getDatabaseCollections } from '@/lib/db-utils';

// Define response types
interface BaseDetails {
  status: string;
  databaseName: string | undefined;
}

interface DetailedDetails extends BaseDetails {
  collections: string[];
  host: string | undefined;
  port: number | undefined;
  connectionState: number;
}

interface HealthResponse {
  status: 'ok' | 'error';
  message: string;
  details: BaseDetails | DetailedDetails;
  error?: string;
}

export async function GET(request: NextRequest) {
  // Check if this is an admin request (you might want to add proper authentication)
  const isDetailedCheck = request.nextUrl.searchParams.get('detailed') === 'true';
  
  try {
    const connectionStatus = await checkDatabaseConnection();
    
    // If not connected, return error
    if (!connectionStatus.isConnected) {
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        details: connectionStatus
      }, { status: 503 });
    }
    
    // Basic response
    const baseResponse: HealthResponse = {
      status: 'ok',
      message: 'Database connection successful',
      details: {
        status: connectionStatus.status,
        databaseName: connectionStatus.databaseName
      }
    };
    
    // Add more details if requested
    if (isDetailedCheck) {
      const collections = await getDatabaseCollections();
      
      return NextResponse.json({
        ...baseResponse,
        details: {
          ...baseResponse.details,
          collections,
          host: connectionStatus.host,
          port: connectionStatus.port,
          connectionState: connectionStatus.connectionState
        }
      });
    }
    
    return NextResponse.json(baseResponse);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Error checking database health',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 