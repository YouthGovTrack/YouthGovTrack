export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  state: string;
  lga: string;
  location: string;
  contractor: string;
  budget: number;
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string | null;
  status: 'Planned' | 'Ongoing' | 'Completed' | 'Abandoned' | 'Suspended';
  progress: number;
  images: string[];
  tags: string[];
  beneficiaries: number;
  reports: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  state?: string;
  lga?: string;
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface CreateProjectData {
  name: string;
  description: string;
  category: string;
  state: string;
  lga: string;
  location: string;
  contractor: string;
  budget: number;
  expectedCompletion: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Lagos-Ibadan Expressway Rehabilitation",
    description: "Comprehensive rehabilitation of the Lagos-Ibadan expressway to improve transportation and reduce travel time between Lagos and Ibadan.",
    category: "Infrastructure",
    state: "Lagos",
    lga: "Ikorodu",
    location: "Lagos-Ibadan Expressway, Ikorodu Section",
    contractor: "Julius Berger Nigeria",
    budget: 89500000000,
    startDate: "2020-03-15",
    expectedCompletion: "2024-12-31",
    status: "Ongoing",
    progress: 75,
    images: ["/infracture.png"],
    tags: ["infrastructure", "expressway", "lagos", "transportation"],
    beneficiaries: 2500000,
    reports: [],
    createdAt: "2020-03-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Kano State Primary Healthcare Center",
    description: "Construction of modern primary healthcare centers across rural communities in Kano State to improve healthcare access.",
    category: "Healthcare",
    state: "Kano",
    lga: "Dala",
    location: "Dala LGA, Kano State",
    contractor: "Arab Contractors Nigeria",
    budget: 15750000000,
    startDate: "2021-06-01",
    expectedCompletion: "2023-12-31",
    actualCompletion: "2023-12-31",
    status: "Completed",
    progress: 100,
    images: ["/Healthcare.png"],
    tags: ["healthcare", "kano", "primary-care", "rural"],
    beneficiaries: 450000,
    reports: [],
    createdAt: "2021-06-01T00:00:00Z",
    updatedAt: "2023-12-31T00:00:00Z"
  },
  {
    id: 3,
    name: "Rivers State Water Supply Project",
    description: "Installation of water treatment plants and distribution networks to provide clean water access to underserved communities.",
    category: "Infrastructure",
    state: "Rivers",
    lga: "Port Harcourt",
    location: "Port Harcourt City LGA",
    contractor: "Reynolds Construction Company",
    budget: 32400000000,
    startDate: "2022-01-10",
    expectedCompletion: "2025-06-30",
    status: "Ongoing",
    progress: 45,
    images: ["/infracture.png"],
    tags: ["water", "rivers", "infrastructure", "clean-water"],
    beneficiaries: 800000,
    reports: [],
    createdAt: "2022-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  }
];

export const mockProjectAPI = {
  async getProjects(filters: ProjectFilters = {}) {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredProjects = [...mockProjects];

    if (filters.state && filters.state !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.state === filters.state);
    }

    if (filters.category && filters.category !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.category === filters.category);
    }

    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    const stats = {
      totalProjects: filteredProjects.length,
      completedProjects: filteredProjects.filter(p => p.status === 'Completed').length,
      ongoingProjects: filteredProjects.filter(p => p.status === 'Ongoing').length,
      totalBudget: filteredProjects.reduce((sum, p) => sum + p.budget, 0)
    };

    return {
      projects: filteredProjects,
      total: filteredProjects.length,
      stats
    };
  },

  async createProject(projectData: CreateProjectData): Promise<Project> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newProject: Project = {
      id: Date.now(),
      name: projectData.name,
      description: projectData.description,
      category: projectData.category,
      state: projectData.state,
      lga: projectData.lga,
      location: projectData.location,
      contractor: projectData.contractor,
      budget: projectData.budget,
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletion: projectData.expectedCompletion,
      actualCompletion: null,
      status: 'Planned',
      progress: 0,
      images: [],
      tags: [projectData.category.toLowerCase(), projectData.state.toLowerCase()],
      beneficiaries: 0,
      reports: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockProjects.unshift(newProject);
    return newProject;
  }
};
