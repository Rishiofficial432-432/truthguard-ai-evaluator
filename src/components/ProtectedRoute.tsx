
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requireKey?: boolean;
}

const ProtectedRoute = ({ children, requireKey = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If route requires premium access key and user doesn't have one
  if (requireKey && !user?.accessKey) {
    return <Navigate to="/pricing" />;
  }

  // If user has used free tier more than twice, redirect to pricing
  if (!user?.accessKey && user?.freeUsageCount >= 2) {
    return <Navigate to="/pricing" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
