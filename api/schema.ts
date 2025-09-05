import { z } from "zod";

export const formatPromptSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty").max(5000, "Prompt too long"),
});

export type FormatPromptRequest = z.infer<typeof formatPromptSchema>;

export interface FormatPromptResponse {
  formattedPrompt: string;
  success: boolean;
  error?: string;
}
