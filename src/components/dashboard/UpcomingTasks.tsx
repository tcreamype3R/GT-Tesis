"use client";

import type { ThesisTask } from "@/types";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface UpcomingTasksProps {
  tasks: ThesisTask[];
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const upcoming = tasks
    .filter(task => task.status !== 'Completada')
    .sort((a, b) => {
      // Basic sort: In Progress tasks first, then Pending
      if (a.status === 'En Progreso' && b.status !== 'En Progreso') return -1;
      if (a.status !== 'En Progreso' && b.status === 'En Progreso') return 1;
      return 0; // Keep original order for tasks with same status for now
    })
    .slice(0, 3);

  if (upcoming.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">¡Todas las tareas completadas!</h3>
        <p className="text-muted-foreground">Buen trabajo terminando todas tus tareas programadas.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Próximas Tareas</h2>
        <Button variant="ghost" asChild>
          <Link href="/tasks">
            Ver todas <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
