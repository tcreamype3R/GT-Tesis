import { PageHeader } from "@/components/shared/PageHeader";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { initialTasks } from "@/data/tasks";
import { LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  // In a real app, tasks would be fetched from a data source
  const tasks = initialTasks;

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Resumen general del progreso de tu tesis."
        icon={LayoutDashboard}
      />
      <DashboardOverview tasks={tasks} />
      <Separator className="my-6 sm:my-8" />
      <UpcomingTasks tasks={tasks} />
    </>
  );
}
