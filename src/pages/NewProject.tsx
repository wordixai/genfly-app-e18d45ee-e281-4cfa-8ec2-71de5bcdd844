import { ProjectForm } from '@/components/ProjectForm';
import { useProjectStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function NewProject() {
  const navigate = useNavigate();
  const addProject = useProjectStore((state) => state.addProject);

  const handleSubmit = (data: any) => {
    try {
      addProject({
        ...data,
        status: 'planning',
        materials: [],
        steps: [],
        tags: [],
      });
      
      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">
          Start planning your next DIY adventure
        </p>
      </div>
      
      <ProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}