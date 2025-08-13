import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProjectCard } from '@/components/ProjectCard';
import { useProjectStore } from '@/lib/store';
import { CalendarDays, CheckCircle, Clock, DollarSign, FolderOpen, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

export function Dashboard() {
  const projects = useProjectStore((state) => state.projects);

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
    const totalEstimatedCost = projects.reduce((sum, p) => sum + p.estimatedCost, 0);
    const totalActualCost = projects.reduce((sum, p) => sum + (p.actualCost || 0), 0);
    const totalEstimatedTime = projects.reduce((sum, p) => sum + p.estimatedDuration, 0);
    
    const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
    
    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      totalEstimatedCost,
      totalActualCost,
      totalEstimatedTime,
      completionRate,
    };
  }, [projects]);

  const recentProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const activeProjects = projects.filter(p => p.status === 'in-progress');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="hero-gradient rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back to your DIY Hub!</h1>
        <p className="text-orange-100">
          Track your projects, manage materials, and bring your home improvement dreams to life.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.inProgressProjects} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate.toFixed(1)}%</div>
            <Progress value={stats.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEstimatedCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Estimated budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEstimatedTime}h</div>
            <p className="text-xs text-muted-foreground">
              Estimated duration
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold">Active Projects</h2>
            <Badge variant="secondary">{activeProjects.length}</Badge>
          </div>
          
          {activeProjects.length > 0 ? (
            <div className="space-y-4">
              {activeProjects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No active projects yet. Start your first DIY project!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          
          {recentProjects.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`status-${project.status}`}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                        {project.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No projects yet. Create your first project to get started!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}