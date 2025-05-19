"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ThesisTask, ThesisTaskStatus } from "@/types";
import { CalendarClock, CheckCircle, Loader2, AlertTriangle } from "lucide-react";

interface ScheduleViewProps {
  tasks: ThesisTask[];
}

const statusStyles: Record<ThesisTaskStatus, { icon: React.ElementType, color: string, label: string }> = {
  'Pendiente': { icon: AlertTriangle, color: "border-yellow-500", label: "Pendiente" },
  'En Progreso': { icon: Loader2, color: "border-blue-500", label: "En Progreso" },
  'Completada': { icon: CheckCircle, color: "border-green-500", label: "Completada" },
};

export function ScheduleView({ tasks }: ScheduleViewProps) {

  const sortedTasks = [...tasks].sort((a,b) => {
    // A more sophisticated sort would parse the 'cronograma' dates
    // For now, just a simple sort by ID or status.
    // Let's put 'En Progreso' first, then 'Pendiente', then 'Completada'
    const statusOrder = { 'En Progreso': 1, 'Pendiente': 2, 'Completada': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No hay tareas en el cronograma.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedTasks.map(task => {
        const currentStatus = statusStyles[task.status];
        const IconComponent = currentStatus.icon;
        return (
          <Card key={task.id} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${currentStatus.color}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.tarea}</CardTitle>
                <Badge variant={task.status === 'Completada' ? 'default' : task.status === 'En Progreso' ? 'secondary' : 'outline'} 
                  className={`whitespace-nowrap ${
                      task.status === 'Completada' ? 'bg-green-100 text-green-800 border-green-300' : 
                      task.status === 'En Progreso' ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                      'bg-yellow-100 text-yellow-800 border-yellow-300'
                    }`}>
                  <IconComponent className={`mr-1 h-3.5 w-3.5 ${task.status === 'En Progreso' ? 'animate-spin' : ''}`} />
                  {currentStatus.label}
                </Badge>
              </div>
              <CardDescription className="text-xs flex items-center text-muted-foreground">
                <CalendarClock className="h-4 w-4 mr-1.5" />
                {task.cronograma}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2"><strong>Plan Inicial:</strong> {task.planInicial}</p>
              <p className="text-sm text-muted-foreground"><strong>Presentación/Entrega:</strong> {task.presentacion}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
