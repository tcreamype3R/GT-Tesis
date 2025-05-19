import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ListChecks, BrainCircuit, FolderKanban, CalendarDays, BookMarked } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Resumen',
  },
  {
    title: 'Tareas',
    href: '/tasks',
    icon: ListChecks,
    label: 'Gestión',
  },
  {
    title: 'Sugerencias AI',
    href: '/ai-suggestions',
    icon: BrainCircuit,
    label: 'Recursos',
  },
  {
    title: 'Documentos',
    href: '/documents',
    icon: FolderKanban,
    label: 'Hub',
  },
  {
    title: 'Cronograma',
    href: '/schedule',
    icon: CalendarDays,
    label: 'Planificación',
  },
  {
    title: 'Referencias',
    href: '/references',
    icon: BookMarked,
    label: 'Gestor',
  },
];
