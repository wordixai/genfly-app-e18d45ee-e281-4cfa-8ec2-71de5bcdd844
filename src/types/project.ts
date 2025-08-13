export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  purchased: boolean;
  notes?: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  duration: number; // in hours
  completed: boolean;
  order: number;
  imageUrl?: string;
  tips?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in hours
  estimatedCost: number;
  actualCost?: number;
  startDate?: Date;
  completionDate?: Date;
  imageUrl?: string;
  materials: Material[];
  steps: Step[];
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}