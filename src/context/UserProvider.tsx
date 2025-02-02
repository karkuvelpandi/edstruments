"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { useRouter } from "next/navigation";
import { SnackbarKey, useSnackbar } from 'notistack';

// User context
interface User {
  password: string;
  email: string;
  name: string; 
}
interface UserContextValue {
  user: User | null;
  setUser: Dispatch<User>;
  login: (email: string, password: string) => Promise<void>;
  logout: (user: User) => void;
  isAuthenticated: boolean;
  toast: (message: string, variant?: "info" | "default" | "error" | "success" | "warning" | undefined) => SnackbarKey;
}
const UserContext = createContext<UserContextValue | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<User | null>(null);
  const toast = (message: string, variant = 'info' as ("info" | "default" | "error" | "success" | "warning")) => enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentLoggedInUser");
    const storedUser = localStorage.getItem("User-" + currentUserEmail);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/auth");
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials against an API
    // This is a mock implementation
    if (email && password) {

      // setUser(mockUser as User);
      // localStorage.setItem("user", JSON.stringify(mockUser));
      router.push("/dashboard");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = (currentUser?: User) => {
    setUser(null);
    localStorage.removeItem(`user-${currentUser?.email}`);
    localStorage.removeItem("currentLoggedInUser");
    router.push("/auth");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, isAuthenticated: !!user, toast }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
