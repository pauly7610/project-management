# Motion Magic - Vercel Deployment

This README provides instructions for deploying the Motion Magic application on Vercel.

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Fork or Clone the Repository**:

   - Create your own copy of the repository on GitHub

2. **Connect to Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Select your repository
   - Configure project settings:
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `packages/frontend/.next`

3. **Configure Environment Variables**:

   - Add all the environment variables from `.env.production`
   - Ensure you provide actual values for the placeholders

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   You'll need to set the environment variables either during deployment or in the Vercel dashboard afterward.

## Post-Deployment Steps

After successful deployment, you'll need to:

1. **Initialize Database**:

   - Make a POST request to `/api/admin/init-db` with your admin API key
   - This will set up the initial database schema and create an admin user

2. **Test Authentication**:

   - Register a new user and verify the email flow works
   - Confirm login functionality is working

3. **Check Database Health**:
   - Visit `/api/health/db` to verify database connectivity

## Troubleshooting

If you encounter issues during deployment:

1. **Check Vercel Build Logs**:

   - Look for any errors in the build process

2. **Verify Environment Variables**:

   - Ensure all required variables are set correctly
   - Double-check MongoDB connection string

3. **Check Database Connection**:
   - If you're using MongoDB Atlas, ensure IP access is configured

## Monitoring

Monitor your application using:

1. **Vercel Dashboard**:

   - View logs, deployments, and analytics

2. **Health Endpoint**:
   - `/api/health/db` provides database connectivity status

## Updating Deployment

To update your deployment:

1. **Push Changes to GitHub**:

   - If using GitHub integration, Vercel will automatically deploy updates

2. **Manual Deployment**:
   ```bash
   vercel --prod
   ```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
