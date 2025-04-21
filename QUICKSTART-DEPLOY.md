# Motion Magic Quick Start Deployment Guide

This guide provides the fastest way to deploy Motion Magic to Vercel and set up MongoDB Atlas.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- MongoDB Atlas account (free tier is fine)
- 15-20 minutes of your time

## Step 1: Fork the Repository

1. Fork the repository to your GitHub account
2. Clone it locally if you want to make any customizations

## Step 2: Set Up MongoDB Atlas (5 minutes)

1. Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project named "Motion Magic"
3. Create a free M0 cluster
4. Create a database user with read/write permissions
5. Set network access to "Allow Access from Anywhere" (0.0.0.0/0)
6. Get your connection string from the "Connect" button
7. Replace `<password>` with your database user's password

## Step 3: Deploy to Vercel (5 minutes)

1. Go to [Vercel](https://vercel.com/new)
2. Import your forked repository
3. Set up project:
   - Name: motion-magic (or your preferred name)
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: packages/frontend/.next
4. Add environment variables (see list below)
5. Click "Deploy"

### Required Environment Variables

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/motion-magic?retryWrites=true&w=majority
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=7d
NEXTAUTH_SECRET=your-secure-nextauth-secret
ADMIN_API_KEY=your-admin-api-key
ADMIN_INITIAL_PASSWORD=your-admin-password
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
```

## Step 4: Initialize the Database (2 minutes)

Once deployed, initialize your database by making a POST request to:

```
https://your-vercel-url.vercel.app/api/admin/init-db?key=your-admin-api-key
```

You can use a browser, curl, Postman, or any HTTP client.

## Step 5: Verify Deployment (3 minutes)

1. Check database connection:

   ```
   https://your-vercel-url.vercel.app/api/health/db
   ```

2. Visit your application and navigate to:
   - Authentication pages
   - Dashboard
   - Projects
   - Calendar

## Common Issues and Solutions

### Database Connection Errors

- Check your MongoDB connection string
- Ensure your database user has the correct permissions
- Verify network access is configured correctly

### Email Verification Not Working

- Confirm your Resend API key is valid
- Check email configuration in the environment variables

### Authentication Issues

- Verify JWT_SECRET and NEXTAUTH_SECRET are set
- Ensure NEXTAUTH_URL is correctly pointing to your deployment URL

## Next Steps

- Customize the application to your needs
- Add your own branding and styling
- Set up a custom domain in Vercel
- Configure CI/CD for automated deployments

## Documentation

For more detailed information, see the following documentation:

- [Full Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [MongoDB Atlas Setup Guide](./MONGODB_ATLAS_SETUP.md)
- [Customization Guide](./CUSTOMIZATION.md)
