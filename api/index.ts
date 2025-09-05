// Minimal Vercel serverless function
import express, { type Request, Response } from "express";

const app = express();

// Basic middleware
app.use(express.json());

// Simple test endpoint
app.get("/", (req: Request, res: Response) => {
  console.log("Root endpoint called");
  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  console.log("Health check called");
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Test endpoint
app.get("/api/test", (req: Request, res: Response) => {
  console.log("Test endpoint called");
  res.json({
    message: "Test endpoint working!",
    timestamp: new Date().toISOString(),
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
    timestamp,
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Export for Vercel
export default app;