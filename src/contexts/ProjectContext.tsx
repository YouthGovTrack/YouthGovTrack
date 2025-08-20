import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { mockProjectAPI, Project, ProjectFilters } from '../services/mockApi';

/**
 * Statistics interface for project data aggregation
 */
interface ProjectStats {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  totalBudget: number;
}

/**
 * Context type definition for project management functionality
 */
interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  stats: ProjectStats;
  total: number;
  fetchProjects: (filters?: ProjectFilters) => Promise<void>;
  addProject: (project: Project) => void;
  updateProject: (id: number, updatedProject: Partial<Project>) => void;
  refreshProjects: () => Promise<void>;
  clearError: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

/**
 * Custom hook to access project context
 * @throws Error if used outside of ProjectProvider
 * @returns ProjectContextType with all project management functions
 */
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

/**
 * Props interface for ProjectProvider component
 */
interface ProjectProviderProps {
  children: ReactNode;
}

/**
 * Context provider component that manages project state and operations
 * Provides project data, loading states, and CRUD operations to child components
 */
export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ProjectStats>({
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    totalBudget: 0
  });
  const [total, setTotal] = useState(0);
  const [currentFilters, setCurrentFilters] = useState<ProjectFilters>({});

  /**
   * Fetches projects from the API with optional filtering
   * @param filters - Optional filters to apply to the project query
   */
  const fetchProjects = useCallback(async (filters: ProjectFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockProjectAPI.getProjects(filters);
      setProjects(data.projects);
      setStats(data.stats);
      setTotal(data.total);
      setCurrentFilters(filters);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
      console.error('[ProjectProvider] Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Adds a new project to the local state and updates statistics
   * @param newProject - The project to add
   */
  const addProject = useCallback((newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
    setTotal(prev => prev + 1);
    setStats(prev => ({
      ...prev,
      totalProjects: prev.totalProjects + 1,
      ongoingProjects: newProject.status === 'Ongoing' ? prev.ongoingProjects + 1 : prev.ongoingProjects,
      completedProjects: newProject.status === 'Completed' ? prev.completedProjects + 1 : prev.completedProjects
    }));
  }, []);

  /**
   * Updates an existing project in the local state
   * @param id - The ID of the project to update
   * @param updatedProject - Partial project data to merge with existing project
   */
  const updateProject = useCallback((id: number, updatedProject: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  }, []);

  /**
   * Refreshes the project list using the current filters
   */
  const refreshProjects = useCallback(async () => {
    await fetchProjects(currentFilters);
  }, [fetchProjects, currentFilters]);

  /**
   * Clears any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load initial projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const value: ProjectContextType = {
    projects,
    loading,
    error,
    stats,
    total,
    fetchProjects,
    addProject,
    updateProject,
    refreshProjects,
    clearError
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
