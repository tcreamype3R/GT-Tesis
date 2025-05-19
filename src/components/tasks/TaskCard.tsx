import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ThesisTask, ThesisTaskStatus } from "@/types";
import { CalendarDays, CheckCircle, Loader2, AlertTriangle } from "lucide-react";

interface TaskCardProps {
  task: ThesisTask;
}

const statusStyles: Record<ThesisTaskStatus, { icon: React.ElementType, color: string, label: string }> = {
  'Pendiente': { icon: AlertTriangle, color: "bg-yellow-500", label: "Pendiente" },
  'En Progreso': { icon: Loader2, color: "bg-blue-500 animate-spin", label: "En Progreso" },
  'Completada': { icon: CheckCircle, color: "bg-green-500", label: "Completada" },
};

export function TaskCard({ task }: TaskCardProps) {
  const currentStatus = statusStyles[task.status];
  const IconComponent = currentStatus.icon;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg mb-1">{task.tarea}</CardTitle>
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
        <CardDescription className="text-xs flex items-center">
          <CalendarDays className="h-4 w-4 mr-1.5 text-muted-foreground" />
          {task.cronograma}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{task.especificaciones}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Recursos: {task.recursos.length > 50 ? task.recursos.substring(0, 50) + '...' : task.recursos}</p>
      </CardFooter>
    </Card>
  );
}
