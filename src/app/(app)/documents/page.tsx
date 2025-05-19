import { PageHeader } from "@/components/shared/PageHeader";
import { DocumentList } from "@/components/documents/DocumentList";
import { FolderKanban } from "lucide-react";

export default function DocumentsPage() {
  return (
    <>
      <PageHeader 
        title="Hub de Documentos"
        description="Centraliza y organiza todos tus archivos de investigación, borradores y notas."
        icon={FolderKanban}
      />
      <DocumentList />
    </>
  );
}
