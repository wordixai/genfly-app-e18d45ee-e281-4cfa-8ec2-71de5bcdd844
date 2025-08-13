import { useProjectStore } from './store';

export const initializeMockData = () => {
  const store = useProjectStore.getState();
  
  // Only add mock data if no projects exist
  if (store.projects.length === 0) {
    const mockProjects = [
      {
        title: "Kitchen Cabinet Makeover",
        description: "Transform outdated kitchen cabinets with new paint, hardware, and modern styling. This project will give the kitchen a fresh, contemporary look without the cost of full replacement.",
        category: "Kitchen Renovation",
        status: "in-progress" as const,
        difficulty: "intermediate" as const,
        estimatedDuration: 24,
        estimatedCost: 450,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        materials: [
          { id: "1", name: "Cabinet Paint", quantity: 2, unit: "gallons", estimatedCost: 80, purchased: true },
          { id: "2", name: "Cabinet Hardware", quantity: 20, unit: "pieces", estimatedCost: 120, purchased: true },
          { id: "3", name: "Primer", quantity: 1, unit: "gallon", estimatedCost: 35, purchased: false },
          { id: "4", name: "Sandpaper", quantity: 5, unit: "sheets", estimatedCost: 15, purchased: true },
        ],
        steps: [
          { id: "1", title: "Remove Cabinet Doors", description: "Carefully remove all cabinet doors and label them", duration: 2, completed: true, order: 1 },
          { id: "2", title: "Sand Surfaces", description: "Sand all surfaces to ensure proper paint adhesion", duration: 6, completed: true, order: 2 },
          { id: "3", title: "Apply Primer", description: "Apply primer to all surfaces and let dry", duration: 4, completed: false, order: 3 },
          { id: "4", title: "Paint Cabinets", description: "Apply two coats of paint with proper drying time", duration: 8, completed: false, order: 4 },
        ],
        notes: "Consider using a paint sprayer for the smoothest finish",
        tags: ["painting", "kitchen", "makeover"],
        startDate: new Date('2024-01-15'),
      },
      {
        title: "Floating Bathroom Vanity",
        description: "Build a modern floating vanity with hidden storage and LED accent lighting. This custom piece will maximize floor space and create a spa-like atmosphere.",
        category: "Bathroom Renovation", 
        status: "planning" as const,
        difficulty: "advanced" as const,
        estimatedDuration: 16,
        estimatedCost: 320,
        imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400",
        materials: [
          { id: "5", name: "Oak Wood Boards", quantity: 4, unit: "pieces", estimatedCost: 120, purchased: false },
          { id: "6", name: "LED Strip Lights", quantity: 2, unit: "meters", estimatedCost: 45, purchased: false },
          { id: "7", name: "Wall Mounting Hardware", quantity: 1, unit: "set", estimatedCost: 65, purchased: false },
        ],
        steps: [
          { id: "5", title: "Design and Measure", description: "Create detailed plans and measurements", duration: 2, completed: false, order: 1 },
          { id: "6", title: "Cut Wood Pieces", description: "Cut all wood pieces according to plans", duration: 4, completed: false, order: 2 },
          { id: "7", title: "Assemble Frame", description: "Build the main vanity frame", duration: 6, completed: false, order: 3 },
        ],
        notes: "Ensure proper waterproofing in bathroom environment",
        tags: ["woodworking", "bathroom", "floating"],
      },
      {
        title: "Garden Raised Bed System",
        description: "Create a series of raised garden beds for growing vegetables and herbs. Include irrigation system and pest protection features.",
        category: "Outdoor/Garden",
        status: "completed" as const,
        difficulty: "beginner" as const,
        estimatedDuration: 12,
        estimatedCost: 280,
        actualCost: 295,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
        materials: [
          { id: "8", name: "Cedar Boards", quantity: 8, unit: "pieces", estimatedCost: 160, purchased: true },
          { id: "9", name: "Garden Soil", quantity: 12, unit: "bags", estimatedCost: 84, purchased: true },
          { id: "10", name: "Drip Irrigation Kit", quantity: 1, unit: "kit", estimatedCost: 45, purchased: true },
        ],
        steps: [
          { id: "8", title: "Build Bed Frames", description: "Construct rectangular raised bed frames", duration: 4, completed: true, order: 1 },
          { id: "9", title: "Install Beds", description: "Position and level the beds in garden", duration: 3, completed: true, order: 2 },
          { id: "10", title: "Fill with Soil", description: "Add quality garden soil to beds", duration: 2, completed: true, order: 3 },
          { id: "11", title: "Install Irrigation", description: "Set up drip irrigation system", duration: 3, completed: true, order: 4 },
        ],
        notes: "Project completed successfully! Plants are thriving.",
        tags: ["garden", "outdoor", "raised-beds"],
        startDate: new Date('2024-02-01'),
        completionDate: new Date('2024-02-20'),
      },
    ];

    mockProjects.forEach(project => {
      store.addProject(project);
    });
  }
};