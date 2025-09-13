import { Film, Home, Plus, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Film, label: "Movies", path: "/movies" },
    { icon: Plus, label: "Add Movie", path: "/add-movie" },
    { icon: Info, label: "About", path: "/about" },
  ];

  return (
    <nav className="bg-cinema-dark/95 backdrop-blur-sm border-b border-cinema-purple/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-cinema-purple" />
            <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Movie Review Hub
            </span>
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path === "/movies" && location.pathname.startsWith("/movie"));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "hover:bg-cinema-purple/20 hover:text-cinema-purple",
                    isActive 
                      ? "bg-cinema-purple/20 text-cinema-purple" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}