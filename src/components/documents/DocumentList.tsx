"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, FileText, FileSpreadsheet, FileArchive } from "lucide-react";
import type { DocumentFile } from "@/types";
import { Badge } from "@/components/ui/badge";

const mockDocuments: DocumentFile[] = [
  { id: "doc1", name: "Propuesta_Investigacion_v2.docx", type: "Word", size: "2.3 MB", lastModified: "2024-07-15", taskAssociation: "Definición del Problema" },
  { id: "doc2", name: "Revision_Literatura_Fuentes.xlsx", type: "Excel", size: "512 KB", lastModified: "2024-07-20", taskAssociation: "Revisión Bibliográfica" },
  { id: "doc3", name: "Capitulo_Metodologia_Draft1.pdf", type: "PDF", size: "1.1 MB", lastModified: "2024-07-28", taskAssociation: "Diseño Metodológico" },
  { id: "doc4", name: "Datos_Encuestas_Raw.csv", type: "CSV", size: "8.7 MB", lastModified: "2024-08-05" },
  { id: "doc5", name: "Feedback_Asesor_Julio.txt", type: "Text", size: "15 KB", lastModified: "2024-07-18" },
];

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'word':
    case 'docx':
    case 'doc':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'excel':
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    default:
      return <FileArchive className="h-5 w-5 text-gray-500" />;
  }
};


export function DocumentList() {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate fetching documents
    setDocuments(mockDocuments);
    setMounted(true);
  }, []);

  if (!mounted) {
     return (
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Documentos Almacenados</CardTitle>
            <CardDescription>Gestiona todos los archivos relacionados con tu tesis.</CardDescription>
          </div>
           <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-muted rounded animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Documentos Almacenados</CardTitle>
            <CardDescription>Gestiona todos los archivos relacionados con tu tesis.</CardDescription>
        </div>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" /> Subir Documento
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Modificado</TableHead>
                <TableHead>Tarea Asociada</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/50">
                  <TableCell>{getFileIcon(doc.type)}</TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{doc.type}</Badge>
                  </TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.lastModified}</TableCell>
                  <TableCell>{doc.taskAssociation || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Ver</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>Un total de {documents.length} documentos.</TableCaption>
          </Table>
        ) : (
          <div className="text-center py-10">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay documentos subidos todavía.</p>
            <p className="text-sm text-muted-foreground">Haz clic en "Subir Documento" para empezar.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
