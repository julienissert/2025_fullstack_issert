import { create } from 'zustand';
import { getProjects, addProject, editProject, deleteProject } from '../services/projectService';

const useProjectStore = create((set) => ({
  projects: [],
  selectedProject: null,

  fetchProjects: async () => {
    try {
      const projects = await getProjects();
      set({ projects });
    } catch (error) {
      console.error('Erreur fetch projects:', error);
    }
  },

  addProject: async (projectData) => {
    try {
      const newProject = await addProject(projectData);
      set((state) => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error('Erreur add project:', error);
    }
  },

  editProject: async (id, updatedData) => {
    try {
      const updatedProject = await editProject(id, updatedData);
      set((state) => ({
        projects: state.projects.map((p) => (p._id === id ? updatedProject : p)),
      }));
    } catch (error) {
      console.error('Erreur edit project:', error);
    }
  },

  deleteProject: async (id) => {
    console.log('id : ', id)
    try {
      await deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
      }));
    } catch (error) {
      console.error('Erreur delete project:', error);
    }
  },

  setSelectedProject: (project) => {
    set({ selectedProject: project });
  },
}));

export default useProjectStore;
