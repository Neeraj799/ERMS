import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import { toast } from "sonner";

interface Engineer {
  _id: string;
  name: string;
  email?: string;
}

interface Project {
  _id: string;
  name: string;
  status?: string;
}

// Assignment interface
export interface Assignment {
  _id: string;
  engineerId: Engineer | string;
  projectId: Project | string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
}

interface AssignmentContextType {
  assignments: Assignment[];
  fetchAssignments: () => void;
  createAssignment: (
    data: Omit<Assignment, "_id" | "engineerId" | "projectId"> & {
      engineerId: string;
      projectId: string;
    }
  ) => Promise<void>;
  updateAssignment: (
    id: string,
    data: Omit<Assignment, "_id">
  ) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(
  undefined
);

export const useAssignmentContext = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error(
      "useAssignmentContext must be used within a AssignmentProvider"
    );
  }
  return context;
};

export const AssignmentProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignment");
      setAssignments(res.data.data || []);
    } catch {
      toast.error("Failed to fetch assignments");
    }
  };

  const createAssignment = async (data: Omit<Assignment, "_id">) => {
    try {
      await api.post("/assignment/create", data);
      toast.success("Assignment created");
      fetchAssignments();
    } catch {
      toast.error("Failed to create assignment");
    }
  };

  const updateAssignment = async (
    id: string,
    data: Omit<Assignment, "_id">
  ) => {
    try {
      await api.patch(`/assignment/update/${id}`, data);
      toast.success("Assignment updated");
      fetchAssignments();
    } catch {
      toast.error("Failed to update assignment");
    }
  };

  const deleteAssignment = async (id: string) => {
    try {
      await api.delete(`/assignment/delete/${id}`);

      fetchAssignments();
    } catch {
      toast.error("Failed to delete assignment");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        fetchAssignments,
        createAssignment,
        updateAssignment,
        deleteAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentContext;
