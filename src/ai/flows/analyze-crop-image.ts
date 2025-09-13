'use server';

/**
 * @fileOverview Analyzes an image of a crop to diagnose diseases or assess overall health.
 *
 * - analyzeCropImage - A function that handles the crop image analysis process.
 * - AnalyzeCropImageInput - The input type for the analyzeCropImage function.
 * - AnalyzeCropImageOutput - The return type for the analyzeCropImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCropImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeCropImageInput = z.infer<typeof AnalyzeCropImageInputSchema>;

const AnalyzeCropImageOutputSchema = z.object({
  plantIdentification: z.object({
    commonName: z.string().describe('The common name of the plant.'),
    latinName: z.string().describe('The Latin name of the plant.'),
  }),
  diseaseDiagnosis: z
    .object({
      diseaseName: z.string().describe('The name of the disease, if present.'),
      confidence: z.number().describe('Confidence level of the disease diagnosis (0-1).'),
      fixes: z.string().describe('Suggested solutions to address the disease.'),
      prevention: z.string().describe('Preventative measures to avoid the disease in the future.'),
    })
    .optional(),
  cropHealthAssessment: z
    .object({
      healthDescription: z.string().describe('Description of the overall crop health.'),
      marketValuePercentage: z
        .number()
        .describe(
          'Predicted market value percentage of the crop based on its health, relative to the standard market price.'
        ),
    })
    .optional(),
});
export type AnalyzeCropImageOutput = z.infer<typeof AnalyzeCropImageOutputSchema>;

export async function analyzeCropImage(
  input: AnalyzeCropImageInput
): Promise<AnalyzeCropImageOutput> {
  return analyzeCropImageFlow(input);
}

const plantInfoPrompt = ai.definePrompt({
  name: 'plantInfoPrompt',
  input: {schema: AnalyzeCropImageInputSchema},
  output: {schema: AnalyzeCropImageOutputSchema},
  prompt: `You are an expert agricultural advisor. Analyze the provided image of the crop and provide the following information:

1.  Plant Identification: Determine the common name and Latin name of the plant in the image.
2.  Disease Diagnosis: If the plant has a disease, identify the disease, provide a confidence level (0-1), suggest fixes, and provide preventative measures.
3.  Crop Health Assessment: If the plant does not have a disease, assess the overall health of the crop and predict the market value percentage of the crop based on its health, relative to the standard market price.

Here is the image of the crop:

{{media url=photoDataUri}}

Ensure the output is accurate, detailed, and helpful for farmers.
`,
});

const analyzeCropImageFlow = ai.defineFlow(
  {
    name: 'analyzeCropImageFlow',
    inputSchema: AnalyzeCropImageInputSchema,
    outputSchema: AnalyzeCropImageOutputSchema,
  },
  async input => {
    const {output} = await plantInfoPrompt(input);
    return output!;
  }
);
