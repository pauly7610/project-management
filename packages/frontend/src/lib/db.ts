import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/motion-magic';

// Global is used here to maintain a cached connection across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
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
  try {
    // Use cached connection if available
    if (global.mongoose.conn) {
      // eslint-disable-next-line no-console
      console.log('Using existing MongoDB connection');
      return global.mongoose.conn;
    }

    // If a connection is already in progress, wait for it
    if (!global.mongoose.promise) {
      const opts = {
        bufferCommands: false,
        autoIndex: true, // Build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
      };

      // Create new connection
      // @ts-ignore - Types mismatch but functionality works as expected
      global.mongoose.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => {
          // eslint-disable-next-line no-console
          console.log('Connected to MongoDB successfully');
          return mongoose;
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to connect to MongoDB:', error);
          throw error;
        });
    } else {
      // eslint-disable-next-line no-console
      console.log('Reusing connection promise');
    }

    // Wait for connection
    global.mongoose.conn = await global.mongoose.promise;
    
    // Handle connection events
    mongoose.connection.on('connected', () => {
      // eslint-disable-next-line no-console
      console.log('MongoDB connection established');
    });
    
    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.log('MongoDB connection disconnected');
      // Reset connection cache when disconnected
      global.mongoose.conn = null;
    });
    
    // Properly close connection when Node process ends
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      // eslint-disable-next-line no-console
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
    return global.mongoose.conn;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in MongoDB connection:', error);
    throw error;
  }
} 