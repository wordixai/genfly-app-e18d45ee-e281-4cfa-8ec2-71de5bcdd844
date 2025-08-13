import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/types/project';
import { CalendarDays, Clock, DollarSign, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  
  const completedSteps = project.steps.filter(step => step.completed).length;
  const progressPercentage = project.steps.length > 0 ? (completedSteps / project.steps.length) * 100 : 0;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'status-planning';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      case 'on-hold': return 'status-on-hold';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="card-gradient hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div onClick={() => navigate(`/project/${project.id}`)}>
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-16 h-16 rounded-lg object-cover ml-3"
              />
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(project.difficulty)}>
              {project.difficulty}
            </Badge>
            <Badge variant="outline">{project.category}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedSteps}/{project.steps.length} steps</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{project.estimatedDuration}h</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${project.estimatedCost}</span>
            </div>
          </div>

          {project.startDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>Started {project.startDate.toLocaleDateString()}</span>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/project/${project.id}`);
          }}
        >
          <Hammer className="h-4 w-4 mr-2" />
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
}