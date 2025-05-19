import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookMarked, Construction } from "lucide-react";
import Image from "next/image";

export function ReferenceManagerPlaceholder() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookMarked className="mr-2 h-6 w-6 text-primary" />
          Gestor de Referencias
        </CardTitle>
        <CardDescription>
          Integración con herramientas de gestión bibliográfica.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Construction className="mx-auto h-16 w-16 text-accent mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-foreground">Próximamente</h3>
        <p className="text-muted-foreground mb-6">
          Estamos trabajando en la integración directa con gestores de referencias como Zotero y Mendeley
          para facilitar tu revisión bibliográfica y citación.
        </p>
        <div className="flex justify-center space-x-4">
          <Image 
            src="https://placehold.co/100x50.png" 
            alt="Zotero Logo Placeholder" 
            width={100} 
            height={50} 
            data-ai-hint="Zotero logo"
            className="rounded"
          />
          <Image 
            src="https://placehold.co/100x50.png" 
            alt="Mendeley Logo Placeholder" 
            width={100} 
            height={50} 
            data-ai-hint="Mendeley logo"
            className="rounded"
          />
        </div>
      </CardContent>
    </Card>
  );
}
