import { PageHeader } from "@/components/shared/PageHeader";
import { TaskCard } from "@/components/tasks/TaskCard";
import { initialTasks } from "@/data/tasks";
import { ListChecks } from "lucide-react";

export default function TasksPage() {
  const tasks = initialTasks; // In a real app, fetch tasks

  return (
    <>
      <PageHeader 
        title="Todas las Tareas" 
        description="Gestiona y visualiza todas las tareas de tu planificación de tesis."
        icon={ListChecks}
      />
      {tasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No hay tareas para mostrar.</p>
        </div>
      )}
    </>
  );
}
