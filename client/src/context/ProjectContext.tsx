import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import { toast } from "sonner";
import { useUserContext } from "./UserContext";

export interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: string;
}

interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => void;
  addProject: (project: Omit<Project, "_id">) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useUserContext();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/project");
      setProjects(res.data.data || []);
    } catch (err: any) {
      console.error("fetchProjects error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch projects");
    }
  };

  const addProject = async (project: Omit<Project, "_id">) => {
    try {
      const res = await api.post("/project/create", {
        ...project,
        requiredSkills: project.requiredSkills.map((s) => s.trim()),
      });

      console.log("data", res);

      toast.success(res.data.message);
      fetchProjects();
    } catch (err) {
      toast.error("");
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchProjects();
    }
  }, [currentUser]);
  return (
    <ProjectContext.Provider value={{ projects, fetchProjects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
