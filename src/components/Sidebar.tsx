import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Sidebar as SidebarPrimitive, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarFooter
} from '@/components/ui/sidebar';
import { useProjectStore } from '@/lib/store';
import { 
  Home, 
  Plus, 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  Pause, 
  Calendar,
  Hammer,
  Settings
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useProjectStore((state) => state.projects);

  const getStatusCount = (status: string) => {
    return projects.filter(project => project.status === status).length;
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      url: '/',
      badge: null,
    },
    {
      title: 'All Projects',
      icon: FolderOpen,
      url: '/projects',
      badge: projects.length,
    },
  ];

  const statusItems = [
    {
      title: 'Planning',
      icon: Calendar,
      url: '/projects?status=planning',
      badge: getStatusCount('planning'),
      color: 'bg-blue-500',
    },
    {
      title: 'In Progress',
      icon: Clock,
      url: '/projects?status=in-progress',
      badge: getStatusCount('in-progress'),
      color: 'bg-orange-500',
    },
    {
      title: 'Completed',
      icon: CheckCircle,
      url: '/projects?status=completed',
      badge: getStatusCount('completed'),
      color: 'bg-green-600',
    },
    {
      title: 'On Hold',
      icon: Pause,
      url: '/projects?status=on-hold',
      badge: getStatusCount('on-hold'),
      color: 'bg-purple-500',
    },
  ];

  return (
    <SidebarPrimitive className="border-r">
      <SidebarHeader className="border-b bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="flex items-center gap-2 px-4 py-3">
          <Hammer className="h-6 w-6 text-white" />
          <h1 className="text-lg font-bold text-white">DIY Planner</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge !== null && item.badge > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Project Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {statusItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.search.includes(`status=${item.url.split('=')[1]}`)}
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge > 0 && (
                      <Badge className={`ml-auto text-white ${item.color}`}>
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupContent>
            <Button 
              className="w-full justify-start hero-gradient text-white hover:opacity-90" 
              onClick={() => navigate('/projects/new')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}