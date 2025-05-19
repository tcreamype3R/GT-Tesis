"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import type { ResourceSuggestionOutput } from "@/ai/flows/resource-suggestion";
import { getResourceSuggestions } from "@/ai/flows/resource-suggestion";

const formSchema = z.object({
  thesisTopic: z.string().min(10, { message: "El tema debe tener al menos 10 caracteres." }).max(200, { message: "El tema no puede exceder los 200 caracteres." }),
  thesisGoals: z.string().min(20, { message: "Los objetivos deben tener al menos 20 caracteres." }).max(500, { message: "Los objetivos no pueden exceder los 500 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

interface ResourceSuggestionFormProps {
  onSuggestionReceived: (suggestion: ResourceSuggestionOutput | null) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export function ResourceSuggestionForm({ onSuggestionReceived, onLoadingChange, onError }: ResourceSuggestionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thesisTopic: "",
      thesisGoals: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    onLoadingChange(true);
    onError(null);
    onSuggestionReceived(null);
    try {
      const result = await getResourceSuggestions(data);
      onSuggestionReceived(result);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      onError("No se pudieron obtener las sugerencias. Inténtalo de nuevo más tarde.");
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Obtener Sugerencias de Recursos</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="thesisTopic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema de Tesis</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Impacto de la IA en la educación superior" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe brevemente el tema central de tu investigación.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thesisGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivos de la Tesis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Analizar..., Evaluar..., Proponer un modelo para..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detalla los principales objetivos que buscas alcanzar con tu tesis.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full sm:w-auto">
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Obtener Sugerencias
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
