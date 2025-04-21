import { connectToDatabase } from './db';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

/**
 * Initialize database with default data
 * This is useful for testing or initial setup
 */
export async function initializeDatabase() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Check if we already have users
    const userCount = await User.countDocuments({});
    
    // eslint-disable-next-line no-console
    console.log(`Current user count: ${userCount}`);
    
    // Create admin user if no users exist
    if (userCount === 0) {
      // eslint-disable-next-line no-console
      console.log('Creating admin user...');
      
      const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'motion-magic-admin';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@motionmagic.app',
        password: hashedPassword,
        isVerified: true,
      });
      
      await adminUser.save();
      
      // eslint-disable-next-line no-console
      console.log('Admin user created successfully');
    }
    
    return {
      success: true,
      message: 'Database initialized successfully',
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error initializing database:', error);
    
    return {
      success: false,
      message: 'Failed to initialize database',
      error: error instanceof Error ? error.message : String(error),
    };
  }
} 