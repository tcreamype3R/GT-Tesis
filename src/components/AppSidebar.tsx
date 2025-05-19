"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { navItems, type NavItem } from '@/config/nav';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4 flex items-center gap-2 justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            ThesisFlow
          </h1>
        </Link>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item: NavItem) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.title, side: 'right', className: 'ml-2' }}
                  className={cn(
                    "justify-start",
                    (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))) && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 group-data-[collapsible=icon]:p-0">
        {/* Placeholder for potential footer items like settings or user profile */}
        <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8">
          {/* <Settings className="h-5 w-5" /> */}
          <span className="group-data-[collapsible=icon]:hidden"></span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
