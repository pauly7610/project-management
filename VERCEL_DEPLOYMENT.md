# Deploying Motion Magic to Vercel

This guide will help you deploy the Motion Magic application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A MongoDB Atlas account (or other MongoDB hosting service)
- A Resend account for email services (or alternative email service)

## Step 1: Prepare Your MongoDB Database

1. Create a MongoDB Atlas cluster or set up your preferred MongoDB hosting
2. Get your MongoDB connection string
3. Make sure to whitelist the appropriate IPs (Vercel IP ranges or 0.0.0.0/0 for development)

## Step 2: Deploy with Vercel CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Deploy the Project

From the project root directory:

```bash
vercel
```

Follow the prompts and confirm your deployment settings.

## Step 3: Configure Environment Variables

After initial deployment, you need to set up environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:

```
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/motion-magic?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-secure-jwt-secret-for-production
JWT_EXPIRES_IN=7d
NEXTAUTH_URL=https://your-vercel-deployment-url.vercel.app
NEXTAUTH_SECRET=your-secure-nextauth-secret-for-production

# Email Service
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com

# Admin Configuration
ADMIN_API_KEY=your-secure-admin-api-key-for-production
ADMIN_INITIAL_PASSWORD=your-secure-admin-password-for-production
```

## Step 4: Initialize the Database

After deployment, initialize your database by making a POST request to:

```
https://your-vercel-deployment-url.vercel.app/api/admin/init-db
```

Include your ADMIN_API_KEY in the request:

```bash
curl -X POST https://your-vercel-deployment-url.vercel.app/api/admin/init-db \
  -H "Authorization: Bearer your-admin-api-key-here"
```

Or use the URL parameter approach:

```
https://your-vercel-deployment-url.vercel.app/api/admin/init-db?key=your-admin-api-key-here
```

## Step 5: Verify Deployment

Visit your application URL and check that everything is working as expected:

1. Test user registration and login
2. Check the database connectivity via the health endpoint:
   ```
   https://your-vercel-deployment-url.vercel.app/api/health/db
   ```

## Troubleshooting

### Database Connection Issues

If you're experiencing database connection issues:

1. Check if your MongoDB Atlas IP whitelist includes Vercel's IPs
2. Verify the connection string format in your environment variables
3. Check Vercel logs for any connection errors

### Email Verification Not Working

If email verification is not working:

1. Verify your Resend API key and sender email
2. Check Vercel logs for any email sending errors
3. Make sure NEXTAUTH_URL is properly set to your Vercel deployment URL

## Updating Your Deployment

To update your deployment after making changes:

```bash
vercel --prod
```

Or push to your connected GitHub repository if you've set up Git Integration.

## Monitoring

Monitor your application's health by:

1. Setting up a Vercel Analytics integration
2. Using the included health check endpoint at `/api/health/db`
3. Checking Vercel logs for any errors

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
