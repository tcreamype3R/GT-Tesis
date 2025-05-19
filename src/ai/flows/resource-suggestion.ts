// src/ai/flows/resource-suggestion.ts
'use server';

/**
 * @fileOverview Provides AI-powered suggestions for research resources and methodologies based on the thesis topic and goals.
 *
 * - getResourceSuggestions - A function that returns resource suggestions for a given research topic and goals.
 * - ResourceSuggestionInput - The input type for the getResourceSuggestions function.
 * - ResourceSuggestionOutput - The return type for the getResourceSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceSuggestionInputSchema = z.object({
  thesisTopic: z.string().describe('The topic of the thesis.'),
  thesisGoals: z.string().describe('The goals of the thesis.'),
});
export type ResourceSuggestionInput = z.infer<typeof ResourceSuggestionInputSchema>;

const ResourceSuggestionOutputSchema = z.object({
  suggestedResources: z
    .array(z.string())
    .describe('A list of suggested research resources (databases, software, guides).'),
  suggestedMethodologies: z.array(z.string()).describe('A list of suggested methodologies.'),
});
export type ResourceSuggestionOutput = z.infer<typeof ResourceSuggestionOutputSchema>;

export async function getResourceSuggestions(
  input: ResourceSuggestionInput
): Promise<ResourceSuggestionOutput> {
  return resourceSuggestionFlow(input);
}

const resourceSuggestionPrompt = ai.definePrompt({
  name: 'resourceSuggestionPrompt',
  input: {schema: ResourceSuggestionInputSchema},
  output: {schema: ResourceSuggestionOutputSchema},
  prompt: `You are an AI research assistant. Your task is to suggest relevant research resources and methodologies based on the user's thesis topic and goals.

  Thesis Topic: {{{thesisTopic}}}
  Thesis Goals: {{{thesisGoals}}}

  Based on the above topic and goals, suggest relevant research resources (databases, software, guides) and methodologies.  Do not include any introductory or concluding remarks.
  Format the resources and methodologies as lists of strings.`,
});

const resourceSuggestionFlow = ai.defineFlow(
  {
    name: 'resourceSuggestionFlow',
    inputSchema: ResourceSuggestionInputSchema,
    outputSchema: ResourceSuggestionOutputSchema,
  },
  async input => {
    const {output} = await resourceSuggestionPrompt(input);
    return output!;
  }
);
