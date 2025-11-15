import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI with error handling
let ai: GoogleGenAI;
try {
  const apiKey = "AIzaSyB55hJ6-khb-PjO_FWYBNkPeQnBuRGsU-U";
  if (!apiKey) {
    throw new Error("No Gemini API key found in environment variables");
  }
  ai = new GoogleGenAI({ apiKey });
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
  throw new Error("Gemini AI initialization failed");
}

export async function formatPrompt(originalPrompt: string): Promise<string> {
  try {
    const systemPrompt = `Act like a professional prompt formatter. You specialize in rewriting prompts for ChatGPT to make them clearer, structured, and more effective.

Your objective: Take the given raw prompt and transform it into a polished version that improves clarity, removes ambiguity, and ensures richer, more detailed outputs.

Follow these steps:
1. Identify the original intent of the user's raw prompt.
2. Define a clear role/persona for ChatGPT that aligns with the task.
3. Add context and constraints that guide ChatGPT to produce higher-quality responses.
4. Break the instructions into a structured, step-by-step format.
5. Specify the desired format of the output (length, structure, style, or bullet points).
6. Ensure the final prompt is concise, precise, and free from ambiguity.
7. End the formatted prompt with: "Take a deep breath and work on this problem step-by-step."

Output: Return ONLY the upgraded prompt inside a code block, without explanations or extra text.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      },
      contents: originalPrompt,
    });

    const result = response.text;
    if (!result) {
      throw new Error("No response from Gemini");
    }

    // Extract content from code block if present
    const codeBlockMatch = result.match(/```[\s\S]*?\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }

    return result.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to format prompt. Please try again.");
  }
}
