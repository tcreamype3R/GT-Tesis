"use client";

import type { ResourceSuggestionOutput } from "@/ai/flows/resource-suggestion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

interface ResourceDisplayProps {
  suggestion: ResourceSuggestionOutput | null;
  isLoading: boolean;
  error: string | null;
}

export function ResourceDisplay({ suggestion, isLoading, error }: ResourceDisplayProps) {
  if (isLoading) {
    return (
      <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
            Buscando Sugerencias...
          </CardTitle>
          <CardDescription>
            Nuestra IA está trabajando para encontrar los mejores recursos y metodologías para ti.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 bg-muted rounded animate-pulse w-1/3 mt-4"></div>
           <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-6 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!suggestion) {
    return (
       <Card className="mt-6 shadow-sm border-dashed">
        <CardContent className="pt-6 text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            Ingresa el tema y los objetivos de tu tesis para recibir sugerencias personalizadas.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <CheckCircle className="mr-2 h-6 w-6" />
          Sugerencias Encontradas
        </CardTitle>
        <CardDescription>
          Aquí tienes algunas recomendaciones basadas en la información que proporcionaste.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Recursos Sugeridos</h3>
          {suggestion.suggestedResources && suggestion.suggestedResources.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
              {suggestion.suggestedResources.map((resource, index) => (
                <li key={`resource-${index}`}>{resource}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No se encontraron recursos específicos.</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Metodologías Sugeridas</h3>
          {suggestion.suggestedMethodologies && suggestion.suggestedMethodologies.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
              {suggestion.suggestedMethodologies.map((methodology, index) => (
                <li key={`methodology-${index}`}>{methodology}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No se encontraron metodologías específicas.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
