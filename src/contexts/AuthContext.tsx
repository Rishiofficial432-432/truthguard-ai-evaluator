
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  accessKey?: string;
  freeUsageCount: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, accessKey?: string) => Promise<void>;
  signup: (name: string, email: string, password: string, accessKey?: string) => Promise<void>;
  logout: () => void;
  verifyAccessKey: (key: string) => Promise<boolean>;
  incrementUsage: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("truthguard_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Valid access keys for demo
  const validAccessKeys = ["PREMIUM123", "LIFETIME456", "iron legion"];

  const verifyAccessKey = async (key: string): Promise<boolean> => {
    // In a real app, this would make an API call to verify the key
    // For demo purposes, we'll just check against our hardcoded keys
    return validAccessKeys.includes(key);
  };

  const login = async (email: string, password: string, accessKey?: string): Promise<void> => {
    // For demo purposes, we'll create a mock user
    // In a real app, you would verify credentials with your backend
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      accessKey: accessKey || undefined,
      freeUsageCount: 0
    };

    if (accessKey) {
      const isValidKey = await verifyAccessKey(accessKey);
      if (isValidKey) {
        newUser.accessKey = accessKey;
      } else {
        toast({
          title: "Invalid Access Key",
          description: "The access key you entered is not valid.",
          variant: "destructive",
        });
      }
    }

    setUser(newUser);
    localStorage.setItem("truthguard_user", JSON.stringify(newUser));
    
    // Redirect based on access key status
    if (newUser.accessKey) {
      navigate("/dashboard");
    } else {
      navigate("/pricing");
    }
  };

  const signup = async (name: string, email: string, password: string, accessKey?: string): Promise<void> => {
    // For demo purposes, similar to login
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      accessKey: accessKey || undefined,
      freeUsageCount: 0
    };

    if (accessKey) {
      const isValidKey = await verifyAccessKey(accessKey);
      if (isValidKey) {
        newUser.accessKey = accessKey;
      } else {
        toast({
          title: "Invalid Access Key",
          description: "The access key you entered is not valid.",
          variant: "destructive",
        });
      }
    }

    setUser(newUser);
    localStorage.setItem("truthguard_user", JSON.stringify(newUser));
    
    // Redirect based on access key status
    if (newUser.accessKey) {
      navigate("/dashboard");
    } else {
      navigate("/pricing");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("truthguard_user");
    navigate("/login");
  };

  const incrementUsage = () => {
    if (user && !user.accessKey) {
      const updatedUser = {
        ...user,
        freeUsageCount: user.freeUsageCount + 1
      };
      setUser(updatedUser);
      localStorage.setItem("truthguard_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        verifyAccessKey,
        incrementUsage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
