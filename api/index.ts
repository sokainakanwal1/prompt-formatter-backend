// Minimal Vercel serverless function
import express, { type Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { formatPromptSchema, type FormatPromptResponse } from "./schema";
import { formatPrompt } from "./lib/gemini";

const app = express();

// Morgan logging middleware
app.use(morgan('dev'));

// Custom request logging
app.use((req: Request, res: Response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n🚀 ${req.method} ${req.path} - ${timestamp}`);
  console.log(`🌐 Origin: ${req.headers.origin || 'No origin'}`);
  console.log(`🔗 Referer: ${req.headers.referer || 'No referer'}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request Body:', JSON.stringify(req.body, null, 2));
  }
  if (req.query && Object.keys(req.query).length > 0) {
    console.log('🔍 Query Params:', req.query);
  }
  next();
});

// CORS configuration - support multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:5173', // Vite default
  'http://localhost:8080', // Vue CLI default
  'https://promptformatter-five.vercel.app',
  // Add your production frontend URL here
  process.env.FRONTEND_URL || 'https://your-frontend-domain.com'
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Additional manual CORS headers as backup
app.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Basic middleware
app.use(express.json());

// Startup message
console.log('\n' + '='.repeat(70));
console.log('🚀 PROMPT FORMATTER BACKEND SERVER');
console.log('='.repeat(70));
console.log(`⏰ Started at: ${new Date().toISOString()}`);
console.log(`🖥️  Platform: ${process.platform}`);
console.log(`📦 Node Version: ${process.version}`);
console.log('🌐 Allowed CORS Origins:');
allowedOrigins.forEach(origin => {
  console.log(`   ✅ ${origin}`);
});
console.log('📋 Available endpoints:');
console.log('   GET  /              - Root endpoint');
console.log('   GET  /api/health    - Health check');
console.log('   GET  /api/test      - Test endpoint');
console.log('   GET  /api/console   - Console logging test');
console.log('   POST /api/format    - Format prompt');
console.log('='.repeat(70));
console.log('✅ Server is ready and listening for requests!');
console.log('='.repeat(70) + '\n');

// Simple test endpoint
app.get("/", (req: Request, res: Response) => {
  console.log("✅ Root endpoint hit");
  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  console.log("🏥 Health check requested");
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Test endpoint
app.get("/api/test", (req: Request, res: Response) => {
  console.log("🧪 Test endpoint hit");
  res.json({
    message: "Test endpoint working!",
    timestamp: new Date().toISOString()
  });
});

// Console logging endpoint
app.get("/api/console", (req: Request, res: Response) => {
  const timestamp = new Date().toISOString();
  
  console.log("=".repeat(50));
  console.log("🚀 CONSOLE ENDPOINT TRIGGERED");
  console.log("=".repeat(50));
  console.log(`⏰ Timestamp: ${timestamp}`);
  console.log(`🌐 Method: ${req.method}`);
  console.log(`📍 Path: ${req.path}`);
  console.log("=".repeat(50));
  
  res.json({
    success: true,
    message: "Console logged successfully",
    timestamp
  });
});

// Format prompt endpoint
app.post("/api/format", async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  try {
    console.log("🎯 Format endpoint called");
    
    // Remove the API key check since it's hardcoded in gemini.ts
    // if (!process.env.GOOGLE_GEMINI_KEY && !process.env.GEMINI_API_KEY) {
    //   throw new Error("Gemini API key not configured");
    // }
    
    const { prompt } = formatPromptSchema.parse(req.body);
    console.log(`📝 Prompt received (${prompt.length} chars):`, prompt.substring(0, 100) + "...");
    
    const formattedPrompt = await formatPrompt(prompt);
    const duration = Date.now() - startTime;
    
    console.log(`✅ Prompt formatted successfully in ${duration}ms`);
    console.log(` Formatted prompt (${formattedPrompt.length} chars):`, formattedPrompt.substring(0, 100) + "...");
    
    const response: FormatPromptResponse = {
      formattedPrompt,
      success: true,
    };
    
    res.json(response);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Format error after ${duration}ms:`, error);
    
    const response: FormatPromptResponse = {
      formattedPrompt: "",
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
    
    res.status(500).json(response);
  }
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  console.log(`❌ 404 - Route not found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
  console.log(' Hot reload enabled - watching for changes...\n');
});

// Export for Vercel
export default app;