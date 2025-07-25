import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import { toast } from "sonner";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "manager" | "engineer";
  skills?: string[];
  seniority?: "junior" | "mid" | "senior"; // ✅ Add this line
  department?: string;
  maxCapacity?: number;
}

interface UserContextType {
  currentUser: User | null;
  fetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/getProfile");
      setCurrentUser(res?.data?.data || null);
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
