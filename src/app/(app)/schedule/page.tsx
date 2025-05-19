import { PageHeader } from "@/components/shared/PageHeader";
import { ScheduleView } from "@/components/schedule/ScheduleView";
import { initialTasks } from "@/data/tasks";
import { CalendarDays } from "lucide-react";

export default function SchedulePage() {
  // In a real app, tasks would be fetched
  const tasks = initialTasks;

  return (
    <>
      <PageHeader 
        title="Cronograma de Tesis"
        description="Visualiza las fechas y plazos clave para cada etapa de tu investigación."
        icon={CalendarDays}
      />
      <ScheduleView tasks={tasks} />
    </>
  );
}
