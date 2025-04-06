
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Star } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
          <span className="text-xl font-bold truthguard-gradient-bg text-transparent bg-clip-text">TruthGuard</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/about">
            <Button variant="ghost" size="sm">About</Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              {user?.accessKey && (
                <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  <Star className="h-4 w-4 mr-1 fill-amber-500 text-amber-500" />
                  Premium
                </div>
              )}
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">
                  {user?.name}
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
