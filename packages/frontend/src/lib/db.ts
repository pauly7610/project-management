import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/motion-magic';

// Global is used here to maintain a cached connection across hot reloads in development
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize global cache
if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  // Use cached connection if available
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  // If a connection is already in progress, wait for it
  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Create new connection
    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((error: Error) => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
      });
  }

  // Wait for connection
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
} 