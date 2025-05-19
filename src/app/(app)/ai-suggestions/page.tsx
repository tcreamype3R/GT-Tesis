"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ResourceSuggestionForm } from "@/components/ai/ResourceSuggestionForm";
import { ResourceDisplay } from "@/components/ai/ResourceDisplay";
import type { ResourceSuggestionOutput } from "@/ai/flows/resource-suggestion";
import { BrainCircuit } from "lucide-react";

export default function AISuggestionsPage() {
  const [suggestion, setSuggestion] = useState<ResourceSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <PageHeader 
        title="Sugerencias de Recursos con IA"
        description="Obtén recomendaciones de recursos y metodologías para tu tesis basadas en IA."
        icon={BrainCircuit}
      />
      <ResourceSuggestionForm 
        onSuggestionReceived={setSuggestion}
        onLoadingChange={setIsLoading}
        onError={setError}
      />
      <ResourceDisplay 
        suggestion={suggestion}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
