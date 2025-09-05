// Separate format endpoint to isolate issues
import express, { type Request, Response } from "express";
import { formatPromptSchema, type FormatPromptResponse } from "./schema";
import { formatPrompt } from "./lib/gemini";

const app = express();

app.use(express.json());

// Format prompt endpoint
app.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Format endpoint called");
    
    // Check if API key is available
    if (!process.env.GOOGLE_GEMINI_KEY && !process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }
    
    const { prompt } = formatPromptSchema.parse(req.body);
    console.log("Prompt received:", prompt.substring(0, 100) + "...");
    
    const formattedPrompt = await formatPrompt(prompt);
    console.log("Prompt formatted successfully");
    
    const response: FormatPromptResponse = {
      formattedPrompt,
      success: true,
    };
    
    res.json(response);
  } catch (error) {
    console.error("Format error:", error);
    
    const response: FormatPromptResponse = {
      formattedPrompt: "",
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
    
    res.status(500).json(response);
  }
});

export default app;
