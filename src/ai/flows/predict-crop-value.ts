'use server';

/**
 * @fileOverview A flow to predict the market value of a crop based on its health assessment.
 *
 * - predictCropValue - A function that predicts the market value of a crop.
 * - PredictCropValueInput - The input type for the predictCropValue function.
 * - PredictCropValueOutput - The return type for the predictCropValue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCropValueInputSchema = z.object({
  cropName: z.string().describe('The common name of the crop.'),
  cropHealthAssessment: z
    .string()
    .describe('A description of the overall health and quality of the crop.'),
});
export type PredictCropValueInput = z.infer<typeof PredictCropValueInputSchema>;

const PredictCropValueOutputSchema = z.object({
  marketValuePercentage: z
    .number()
    .describe(
      'The predicted market value of the crop as a percentage of the standard market price.'
    ),
  reasoning: z.string().describe('The reasoning behind the market value prediction.'),
});
export type PredictCropValueOutput = z.infer<typeof PredictCropValueOutputSchema>;

export async function predictCropValue(input: PredictCropValueInput): Promise<PredictCropValueOutput> {
  return predictCropValueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropValuePrompt',
  input: {schema: PredictCropValueInputSchema},
  output: {schema: PredictCropValueOutputSchema},
  prompt: `You are an agricultural economist specializing in crop valuation.

  Based on the provided information about the crop's health and quality, predict its market value as a percentage of the standard market price.
  Explain your reasoning for the predicted percentage.

  Crop Name: {{{cropName}}}
  Crop Health Assessment: {{{cropHealthAssessment}}}

  Respond with the marketValuePercentage (as a number) and your reasoning.
`,
});

const predictCropValueFlow = ai.defineFlow(
  {
    name: 'predictCropValueFlow',
    inputSchema: PredictCropValueInputSchema,
    outputSchema: PredictCropValueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
