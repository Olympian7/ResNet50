"use server";

import { analyzeCropImage } from "@/ai/flows/analyze-crop-image";
import type { AnalyzeCropImageOutput } from "@/ai/flows/analyze-crop-image";

interface ActionResult {
  data?: AnalyzeCropImageOutput;
  error?: string;
}

export async function handleImageAnalysis(photoDataUri: string): Promise<ActionResult> {
  if (!photoDataUri) {
    return { error: "No image data provided." };
  }

  try {
    const result = await analyzeCropImage({ photoDataUri });
    return { data: result };
  } catch (e: any) {
    console.error("Error during image analysis:", e);
    
    // Provide a more user-friendly error message
    let errorMessage = "An unexpected error occurred during analysis.";
    if (e.message) {
        if (e.message.includes('API key not valid')) {
            errorMessage = "Server configuration error: The API key is invalid. Please contact support.";
        } else if (e.message.includes('permission')) {
            errorMessage = "Server permission error. Please contact support.";
        }
    }
    
    return { error: errorMessage };
  }
}
