"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ThesisTask } from "@/types";
import { ListChecks, Hourglass, CheckCircle2 } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

interface DashboardOverviewProps {
  tasks: ThesisTask[];
}

export function DashboardOverview({ tasks }: DashboardOverviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completada').length;
    const inProgressTasks = tasks.filter(task => task.status === 'En Progreso').length;
    const pendingTasks = tasks.filter(task => task.status === 'Pendiente').length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return { totalTasks, completedTasks, inProgressTasks, pendingTasks, progress };
  }, [tasks]);

  if (!mounted) {
    // Render loading skeletons or null during server render / pre-hydration
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i} className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
                        <div className="h-6 w-6 bg-muted rounded-full animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-10 w-12 bg-muted rounded animate-pulse mb-1"></div>
                        <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
  }


  return (
    <div className="mb-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
            <ListChecks className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              De {stats.totalTasks} tareas totales
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas en Progreso</CardTitle>
            <Hourglass className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              Actualmente trabajando en ellas
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              ¡Bien hecho!
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progreso General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.progress.toFixed(0)}%</div>
            <Progress value={stats.progress} aria-label={`${stats.progress.toFixed(0)}% completado`} className="h-3"/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
