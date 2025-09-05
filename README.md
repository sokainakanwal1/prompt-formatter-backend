# Prompt Formatter Backend

A full-stack Express server for formatting and optimizing ChatGPT prompts using Google's Gemini AI. This application provides a RESTful API that transforms messy, unstructured prompts into professional, optimized AI instructions.

## Features

- 🤖 **AI-Powered Prompt Formatting**: Uses Google Gemini AI to intelligently format and optimize prompts
- 🚀 **Express.js Backend**: Fast, scalable Node.js server with TypeScript
- 🔒 **Security First**: Built-in security with Helmet, CORS, and input validation
- 📊 **Health Monitoring**: Health check endpoints for monitoring
- 🎨 **Open Graph Support**: Dynamic SVG generation for social media sharing
- ☁️ **Vercel Ready**: Optimized for serverless deployment on Vercel
- 🛡️ **Error Handling**: Comprehensive error handling and logging
- 📝 **Input Validation**: Zod schema validation for all inputs

## API Endpoints

### `POST /api/format`
Format and optimize a prompt using AI.

**Request Body:**
```json
{
  "prompt": "write a story about a robot"
}
```

**Response:**
```json
{
  "formattedPrompt": "You are a creative storyteller specializing in science fiction narratives...",
  "success": true
}
```

### `GET /api/health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "production"
}
```

### `GET /api`
API information and available endpoints.

### `GET /api/og`
Generate Open Graph image for social media sharing.

## Quick Start

### Prerequisites

- Node.js 18+ 
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prompt-formatter-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Google Gemini API key:
   ```env
   GOOGLE_GEMINI_KEY=your_gemini_api_key_here
   ```

4. **Run in development mode**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_GEMINI_KEY` | Google Gemini API key | Yes | - |
| `GEMINI_API_KEY` | Alternative API key variable | No | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `CORS_ORIGIN` | CORS allowed origin | No | * |

## Deployment

### Vercel Deployment

This application is optimized for Vercel deployment:

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Set environment variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `GOOGLE_GEMINI_KEY` with your API key

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - The `vercel.json` configuration handles routing and build settings

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - The built files are in the `dist/` directory
   - Use `npm start` to run the production server

## Development

### Project Structure

```
├── api/                 # Main API code
│   ├── index.ts        # Main API entry point
│   ├── lib/            # Utility libraries
│   │   └── gemini.ts   # Gemini AI integration
│   └── schema.ts       # Zod validation schemas
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel deployment config
├── env.example         # Environment variables template
└── README.md           # This file
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Type check without building

### Adding New Endpoints

1. **Add route in `api/index.ts`**
2. **Update API documentation in README**

Example:
```typescript
app.get("/api/new-endpoint", (req, res) => {
  res.json({ message: "Hello World" });
});
```

## Security Features

- **Helmet.js**: Security headers and CSP
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Zod schema validation
- **Rate Limiting**: Built-in request limiting (configurable)
- **Error Sanitization**: Production-safe error messages

## Monitoring

The application includes built-in monitoring capabilities:

- Health check endpoint at `/api/health`
- Request logging with timing information
- Error logging with stack traces (development only)
- Uptime tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Express.js, TypeScript, and Google Gemini AI**
