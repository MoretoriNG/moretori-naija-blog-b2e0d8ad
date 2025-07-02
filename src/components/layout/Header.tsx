
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, TrendingUp, Clock } from 'lucide-react';
import { SearchBar } from './navigation/SearchBar';
import { UserMenu, MobileUserMenu } from './navigation/UserMenu';
import { TopBar } from './navigation/TopBar';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const categories = [
    { name: "Tech", slug: "tech", color: "bg-blue-500", hoverColor: "hover:bg-blue-50 hover:text-blue-600" },
    { name: "Auto", slug: "auto", color: "bg-red-500", hoverColor: "hover:bg-red-50 hover:text-red-600" },
    { name: "Health", slug: "health", color: "bg-green-500", hoverColor: "hover:bg-green-50 hover:text-green-600" },
    { name: "Entertainment", slug: "entertainment", color: "bg-purple-500", hoverColor: "hover:bg-purple-50 hover:text-purple-600" },
    { name: "Business", slug: "business", color: "bg-indigo-500", hoverColor: "hover:bg-indigo-50 hover:text-indigo-600" },
    { name: "Sports", slug: "sports", color: "bg-orange-500", hoverColor: "hover:bg-orange-50 hover:text-orange-600" }
  ];
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const handleMenuClose = () => {
    setIsOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-sm">
      {/* Top bar with date */}
      <TopBar />
      
      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/0d5f121b-be39-414c-818b-109e0a3fbf92.png" 
                alt="Moretori Naija" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-black text-orange-500 tracking-tight">
              Moretori Naija
            </span>
          </Link>
          
          {/* Enhanced Desktop Navigation with Functional Categories */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group",
                  category.hoverColor,
                  location.pathname.includes(category.slug) && `bg-gradient-to-r from-${category.color.split('-')[1]}-100 to-${category.color.split('-')[1]}-50 text-${category.color.split('-')[1]}-700 shadow-sm`
                )}
              >
                <div className="flex items-center gap-1">
                  <div className={cn("w-2 h-2 rounded-full", category.color, "opacity-70 group-hover:opacity-100")}></div>
                  {category.name}
                </div>
                {location.pathname.includes(category.slug) && (
                  <div className={cn("absolute bottom-0 left-0 right-0 h-0.5 rounded-full", category.color)}></div>
                )}
              </Link>
            ))}
            <Link
              to="/videos"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 hover:text-pink-600 relative group",
                location.pathname === "/videos" && "bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 shadow-sm"
              )}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-500 opacity-70 group-hover:opacity-100"></div>
                Videos
              </div>
              {location.pathname === "/videos" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full"></div>
              )}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Enhanced Search */}
          <SearchBar />
          
          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <UserMenu onMenuItemClick={handleMenuClose} />
            ) : (
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                <Link to="/auth/user">Sign In</Link>
              </Button>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Enhanced Mobile menu */}
      <div 
        className={cn(
          "container md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-sm",
          isOpen ? "max-h-[600px] py-6 border-t" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-4 mb-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className={cn(
                "text-sm font-medium transition-colors py-3 px-4 rounded-lg flex items-center gap-2",
                location.pathname.includes(category.slug) 
                  ? `bg-gradient-to-r from-${category.color.split('-')[1]}-100 to-${category.color.split('-')[1]}-50 text-${category.color.split('-')[1]}-700` 
                  : category.hoverColor
              )}
              onClick={handleMenuClose}
            >
              <div className={cn("w-2 h-2 rounded-full", category.color)}></div>
              {category.name}
            </Link>
          ))}
          <Link
            to="/videos"
            className={cn(
              "text-sm font-medium transition-colors py-3 px-4 rounded-lg flex items-center gap-2",
              location.pathname === "/videos"
                ? "bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700" 
                : "hover:bg-pink-50 hover:text-pink-600"
            )}
            onClick={handleMenuClose}
          >
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            Videos
          </Link>
        </nav>
        
        {/* Mobile Auth */}
        {user ? (
          <MobileUserMenu onMenuItemClick={handleMenuClose} />
        ) : (
          <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            <Link to="/auth/user" onClick={handleMenuClose}>Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
