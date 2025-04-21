# Setting Up MongoDB Atlas for Motion Magic

This guide will help you set up a MongoDB Atlas database for use with the Motion Magic application.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account or log in
2. Create a new organization if you don't have one already

## Step 2: Create a New Project

1. In your MongoDB Atlas dashboard, click "Projects" in the top navigation
2. Click "New Project"
3. Name your project (e.g., "Motion Magic")
4. Click "Next" and then "Create Project"

## Step 3: Create a Database Cluster

1. Click "Build a Database"
2. Choose the free tier (M0) option
3. Select your preferred cloud provider and region (choose a region close to your Vercel deployment region for better performance)
4. Name your cluster (e.g., "motion-magic-db")
5. Click "Create"

## Step 4: Create a Database User

1. In the security tab, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and a secure password
   - Username: `motion-magic-admin` (or your preferred name)
   - Password: Create a strong password
5. For user privileges, choose "Read and write to any database"
6. Click "Add User"

## Step 5: Configure Network Access

For development:

1. In the security tab, click "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

For production (more secure):

1. Add specific IP addresses that need database access
2. For Vercel, you'll need to add Vercel's IP ranges

## Step 6: Get Your Connection String

1. In your cluster view, click "Connect"
2. Choose "Connect your application"
3. Select "Node.js" as your driver and the appropriate version
4. Copy the connection string provided
5. Replace `<password>` with your database user's password
6. Replace `<dbname>` with "motion-magic" or your preferred database name

Your connection string should look like:

```
mongodb+srv://motion-magic-admin:<password>@motion-magic-db.mongodb.net/motion-magic?retryWrites=true&w=majority
```

## Step 7: Set Up Environment Variables

Add the MongoDB connection string to your environment variables:

1. In your local `.env` file:

   ```
   MONGODB_URI=mongodb+srv://motion-magic-admin:<password>@motion-magic-db.mongodb.net/motion-magic?retryWrites=true&w=majority
   ```

2. In Vercel's environment variables:
   - Go to your project settings
   - Under "Environment Variables"
   - Add `MONGODB_URI` with your connection string

## Step 8: Initialize the Database

After deploying to Vercel, initialize your database:

1. Make a POST request to your API endpoint:
   ```
   https://your-vercel-url.vercel.app/api/admin/init-db
   ```
   Include your admin API key in the request:
   ```
   Authorization: Bearer your-admin-api-key
   ```

## Troubleshooting

### Connection Issues

If you can't connect to your MongoDB Atlas cluster:

1. Check your connection string format
2. Verify your IP is allowed in Network Access
3. Confirm your database user credentials

### Performance Issues

If you experience slow database performance:

1. Choose a MongoDB Atlas region close to your Vercel deployment
2. Consider upgrading from the free tier for production use
3. Add appropriate indexes to your collections

## Monitoring Database

1. Use the MongoDB Atlas dashboard to monitor database metrics
2. Check logs for any errors
3. Set up alerts for important events

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver Documentation](https://docs.mongodb.com/drivers/node/)
- [MongoDB Performance Best Practices](https://docs.mongodb.com/manual/core/performance-best-practices/)
