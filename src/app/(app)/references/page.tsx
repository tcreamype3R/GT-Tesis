import { PageHeader } from "@/components/shared/PageHeader";
import { ReferenceManagerPlaceholder } from "@/components/references/ReferenceManagerPlaceholder";
import { BookMarked } from "lucide-react";

export default function ReferencesPage() {
  return (
    <>
      <PageHeader 
        title="Gestor de Referencias"
        description="Conecta tus herramientas de gestión bibliográfica y maneja tus citas fácilmente."
        icon={BookMarked}
      />
      <ReferenceManagerPlaceholder />
    </>
  );
}
