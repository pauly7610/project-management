import { connectToDatabase } from './db';
import mongoose from 'mongoose';

/**
 * Checks if the MongoDB connection is working properly
 * @returns {Promise<{ isConnected: boolean, status: string }>} Connection status
 */
export async function checkDatabaseConnection() {
  try {
    await connectToDatabase();
    
    // Check connection state
    const connectionState = mongoose.connection.readyState;
    
    let status = 'Unknown';
    let isConnected = false;
    
    switch (connectionState) {
      case 0:
        status = 'Disconnected';
        break;
      case 1:
        status = 'Connected';
        isConnected = true;
        break;
      case 2:
        status = 'Connecting';
        break;
      case 3:
        status = 'Disconnecting';
        break;
      default:
        status = 'Unknown';
    }
    
    return {
      isConnected,
      status,
      connectionState,
      databaseName: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error checking database connection:', error);
    return {
      isConnected: false,
      status: 'Error',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Gets all collections in the database
 * @returns {Promise<string[]>} List of collection names
 */
export async function getDatabaseCollections() {
  try {
    await connectToDatabase();
    
    // Check if connection is established and db is available
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      // eslint-disable-next-line no-console
      console.error('Database connection not ready');
      return [];
    }
    
    const collections = await mongoose.connection.db.collections();
    return collections.map(collection => collection.collectionName);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting database collections:', error);
    return [];
  }
} 