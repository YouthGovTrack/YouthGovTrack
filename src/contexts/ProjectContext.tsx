import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { mockProjectAPI, Project, ProjectFilters } from '../services/mockApi';

interface ProjectStats {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  totalBudget: number;
}

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

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

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
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const updateProject = useCallback((id: number, updatedProject: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  }, []);

  const refreshProjects = useCallback(async () => {
    await fetchProjects(currentFilters);
  }, [fetchProjects, currentFilters]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load initial projects on mount
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
