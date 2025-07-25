import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import { toast } from "sonner";

export interface Engineer {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
  department: string;
  totalAllocated?: number;
  availableCapacity?: number;
}

interface EngineerContextType {
  engineers: Engineer[];
  fetchEngineers: () => void;
  updateEngineerProfile: (id: string, data: Partial<Engineer>) => Promise<void>;
}

const EngineerContext = createContext<EngineerContextType | undefined>(
  undefined
);

export const useEngineerContext = () => {
  const context = useContext(EngineerContext);
  if (!context) {
    throw new Error("useEngineerContext must be used within EngineerProvider");
  }
  return context;
};

export const EngineerProvider = ({ children }: { children: ReactNode }) => {
  const [engineers, setEngineers] = useState<Engineer[]>([]);

  const fetchEngineers = async () => {
    try {
      const res = await api.get("/engineer/");
      const engineerData = res.data.data || [];

      //Fetch capacity for each engineer
      const engineerCapacity = await Promise.all(
        engineerData.map(async (eng: Engineer) => {
          try {
            const capacityRes = await api.get(`/engineer/capacity/${eng._id}`);
            const { totalAllocated, availableCapacity } = capacityRes.data;
            return { ...eng, totalAllocated, availableCapacity };
          } catch {
            return {
              ...eng,
              totalAllocated: 0,
              availableCapacity: eng.maxCapacity,
            };
          }
        })
      );

      setEngineers(engineerCapacity);
    } catch (err) {
      toast.error("Failed to load engineers");
    }
  };

  const updateEngineerProfile = async (
    id: string,
    data: Partial<Engineer>
  ): Promise<void> => {
    try {
      await api.patch(`/engineer/update/${id}`, data);
    } catch (err) {
      toast.error("Failed to update profile");
      throw err;
    }
  };

  useEffect(() => {
    fetchEngineers();
  }, []);

  return (
    <EngineerContext.Provider
      value={{ engineers, fetchEngineers, updateEngineerProfile }}
    >
      {children}
    </EngineerContext.Provider>
  );
};
