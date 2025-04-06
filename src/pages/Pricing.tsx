
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle } from "lucide-react";
import MainLayout from "@/components/MainLayout";

const Pricing = () => {
  const [accessKey, setAccessKey] = useState("");
  const { verifyAccessKey, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleActivate = async () => {
    if (await verifyAccessKey(accessKey)) {
      // Update user in localStorage with the access key
      if (user) {
        const updatedUser = { ...user, accessKey };
        localStorage.setItem("truthguard_user", JSON.stringify(updatedUser));
      }
      navigate("/dashboard");
    }
  };

  const handleFreeTrial = () => {
    navigate("/dashboard");
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Choose Your TruthGuard Plan</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Get access to our powerful AI Benchmark Evaluation System with the plan that suits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="shadow-md border-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Trial</CardTitle>
              <CardDescription>For casual users</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Limited to 2 uses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Basic evaluation features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Sample test cases</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleFreeTrial} 
                className="w-full"
                disabled={user?.freeUsageCount ? user.freeUsageCount >= 2 : false}
              >
                {user?.freeUsageCount && user.freeUsageCount >= 2 
                  ? "Free Trial Used" 
                  : "Start Free Trial"}
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="shadow-md border-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-pink-500"></div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium Lifetime</CardTitle>
              <CardDescription>For professionals</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground ml-1">one-time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited usage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Advanced evaluation metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Export detailed reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Custom test cases library</span>
                </li>
              </ul>

              <div className="pt-4 space-y-2">
                <Label htmlFor="activationKey">Activation Key</Label>
                <Input
                  id="activationKey"
                  placeholder="Enter your premium activation key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleActivate} 
                className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600"
                disabled={!accessKey}
              >
                Activate Premium
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>For demo purposes, use "PREMIUM123" or "LIFETIME456" as activation keys</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
