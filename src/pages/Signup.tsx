
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const { toast } = useToast();
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (name && email && password) {
      try {
        await signup(name, email, password, showAccessKey ? accessKey : undefined);
        toast({
          title: "Account Created",
          description: "Your account has been created successfully.",
        });
      } catch (error) {
        toast({
          title: "Signup Failed",
          description: "There was a problem creating your account.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid Input",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-muted/30">
      <Card className="w-full max-w-md truthguard-card-shadow">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hasAccessKey" 
                checked={showAccessKey} 
                onCheckedChange={() => setShowAccessKey(!showAccessKey)} 
              />
              <label
                htmlFor="hasAccessKey"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have an access key
              </label>
            </div>

            {showAccessKey && (
              <div className="space-y-2">
                <Label htmlFor="accessKey">Access Key</Label>
                <Input 
                  id="accessKey" 
                  placeholder="Enter your premium access key" 
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full mb-4">
              Create Account
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
