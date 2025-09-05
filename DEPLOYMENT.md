# Deployment Guide

This guide covers how to deploy the Prompt Formatter Backend to various platforms.

## Vercel Deployment (Recommended)

Vercel is the recommended deployment platform for this application as it's optimized for serverless functions and provides excellent performance.

### Prerequisites

1. A Vercel account ([vercel.com](https://vercel.com))
2. Your Google Gemini API key
3. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Step-by-Step Deployment

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect the project type

2. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     GOOGLE_GEMINI_KEY=your_actual_api_key_here
     NODE_ENV=production
     ```
   - Make sure to add it for all environments (Production, Preview, Development)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - You'll get a URL like `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For preview deployment
   npm run deploy:preview
   
   # For production deployment
   npm run deploy:vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add GOOGLE_GEMINI_KEY
   # Enter your API key when prompted
   ```

### Vercel Configuration

The `vercel.json` file is already configured with:
- Serverless function routing
- Build configuration
- Environment variables
- Function timeout settings

## Other Deployment Options

### Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Set Environment Variables**
   - Add `GOOGLE_GEMINI_KEY` in the Railway dashboard

3. **Deploy**
   - Railway will automatically detect and deploy your Node.js application

### Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Create a new "Web Service"
   - Connect your repository

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Start Command: `npm start`

3. **Set Environment Variables**
   - Add `GOOGLE_GEMINI_KEY` in the environment section

### Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set GOOGLE_GEMINI_KEY=your_api_key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## Environment Variables

Make sure to set these environment variables in your deployment platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GEMINI_KEY` | Your Google Gemini API key | Yes |
| `NODE_ENV` | Environment (production/development) | No |
| `CORS_ORIGIN` | Allowed CORS origins | No |

## Post-Deployment

### Testing Your Deployment

1. **Health Check**
   ```bash
   curl https://your-app-url.vercel.app/api/health
   ```

2. **API Info**
   ```bash
   curl https://your-app-url.vercel.app/api
   ```

3. **Test Prompt Formatting**
   ```bash
   curl -X POST https://your-app-url.vercel.app/api/format \
     -H "Content-Type: application/json" \
     -d '{"prompt": "write a story about a robot"}'
   ```

### Monitoring

- **Vercel**: Built-in analytics and monitoring
- **Health Endpoint**: Use `/api/health` for uptime monitoring
- **Logs**: Check platform-specific logging for debugging

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the API key is correctly set in environment variables
   - Check that the key has proper permissions for Gemini API

2. **Build Failures**
   - Ensure all dependencies are in `package.json`
   - Check TypeScript compilation errors

3. **CORS Issues**
   - Update `CORS_ORIGIN` environment variable
   - Check that your frontend domain is allowed

4. **Function Timeouts**
   - Vercel has a 30-second timeout for serverless functions
   - Consider optimizing API calls or increasing timeout in `vercel.json`

### Getting Help

- Check the platform-specific documentation
- Review the application logs
- Test locally with the same environment variables
- Open an issue in the GitHub repository

## Security Considerations

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor usage and set up alerts for unusual activity
- Use HTTPS in production (most platforms provide this automatically)
