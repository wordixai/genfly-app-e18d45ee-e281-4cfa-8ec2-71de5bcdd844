import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, Material, Step } from '@/types/project';

interface ProjectStore {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  toggleMaterialPurchased: (projectId: string, materialId: string) => void;
  toggleStepCompleted: (projectId: string, stepId: string) => void;
  addMaterial: (projectId: string, material: Omit<Material, 'id'>) => void;
  addStep: (projectId: string, step: Omit<Step, 'id'>) => void;
  updateMaterial: (projectId: string, materialId: string, updates: Partial<Material>) => void;
  updateStep: (projectId: string, stepId: string, updates: Partial<Step>) => void;
  deleteMaterial: (projectId: string, materialId: string) => void;
  deleteStep: (projectId: string, stepId: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      
      addProject: (projectData) => {
        const project: Project = {
          ...projectData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ projects: [...state.projects, project] }));
      },
      
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates, updatedAt: new Date() }
              : project
          ),
        }));
      },
      
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },
      
      getProject: (id) => {
        return get().projects.find((project) => project.id === id);
      },
      
      toggleMaterialPurchased: (projectId, materialId) => {
        const project = get().getProject(projectId);
        if (project) {
          const updatedMaterials = project.materials.map((material) =>
            material.id === materialId
              ? { ...material, purchased: !material.purchased }
              : material
          );
          get().updateProject(projectId, { materials: updatedMaterials });
        }
      },
      
      toggleStepCompleted: (projectId, stepId) => {
        const project = get().getProject(projectId);
        if (project) {
          const updatedSteps = project.steps.map((step) =>
            step.id === stepId
              ? { ...step, completed: !step.completed }
              : step
          );
          get().updateProject(projectId, { steps: updatedSteps });
        }
      },
      
      addMaterial: (projectId, materialData) => {
        const project = get().getProject(projectId);
        if (project) {
          const material: Material = {
            ...materialData,
            id: generateId(),
          };
          get().updateProject(projectId, {
            materials: [...project.materials, material],
          });
        }
      },
      
      addStep: (projectId, stepData) => {
        const project = get().getProject(projectId);
        if (project) {
          const step: Step = {
            ...stepData,
            id: generateId(),
          };
          get().updateProject(projectId, {
            steps: [...project.steps, step],
          });
        }
      },
      
      updateMaterial: (projectId, materialId, updates) => {
        const project = get().getProject(projectId);
        if (project) {
          const updatedMaterials = project.materials.map((material) =>
            material.id === materialId ? { ...material, ...updates } : material
          );
          get().updateProject(projectId, { materials: updatedMaterials });
        }
      },
      
      updateStep: (projectId, stepId, updates) => {
        const project = get().getProject(projectId);
        if (project) {
          const updatedSteps = project.steps.map((step) =>
            step.id === stepId ? { ...step, ...updates } : step
          );
          get().updateProject(projectId, { steps: updatedSteps });
        }
      },
      
      deleteMaterial: (projectId, materialId) => {
        const project = get().getProject(projectId);
        if (project) {
          const updatedMaterials = project.materials.filter(
            (material) => material.id !== materialId
          );
          get().updateProject(projectId, { materials: updatedMaterials });
        }
      },
      
      deleteStep: (projectId, stepId) => {
        const project = get().getProject(projectId);
        if (project) {
          const updatedSteps = project.steps.filter((step) => step.id !== stepId);
          get().updateProject(projectId, { steps: updatedSteps });
        }
      },
    }),
    {
      name: 'diy-project-store',
    }
  )
);