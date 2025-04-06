
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { ShieldCheck, Star } from "lucide-react";

const Dashboard = () => {
  const { user, incrementUsage, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Increment usage count if user is on free plan
    if (isAuthenticated && !user?.accessKey) {
      incrementUsage();
    }
  }, [isAuthenticated, user, incrementUsage]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">TruthGuard Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            {user?.accessKey ? (
              <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4 mr-1 fill-amber-500 text-amber-500" />
                Premium User
              </div>
            ) : (
              <div className="flex flex-col items-end">
                <p className="text-sm text-muted-foreground">Free Trial</p>
                <p className="text-sm font-medium">{user?.freeUsageCount}/2 uses</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6 border">
            <h3 className="font-medium mb-2">Test Cases</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-1">Created test scenarios</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 border">
            <h3 className="font-medium mb-2">Evaluations</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-1">Completed evaluations</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 border">
            <h3 className="font-medium mb-2">Average Score</h3>
            <p className="text-3xl font-bold">N/A</p>
            <p className="text-sm text-muted-foreground mt-1">Model performance</p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate("/")}>
            Go to Evaluation Tool
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
