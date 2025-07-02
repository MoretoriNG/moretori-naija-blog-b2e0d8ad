
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Menu, X, Bell, Search, Sparkles, Zap } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl shadow-lg">
      {/* Top bar with date */}
      <TopBar />
      
      {/* Main header with enhanced styling */}
      <div className="container flex h-20 items-center justify-between relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-50"></div>
        <div className="flex items-center gap-8 relative z-10">
          <Link to="/" className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 p-1 group-hover:shadow-2xl group-hover:rotate-3 transition-all duration-300">
              <img 
                src="/lovable-uploads/0d5f121b-be39-414c-818b-109e0a3fbf92.png" 
                alt="Moretori Naija" 
                className="w-full h-full object-contain rounded-lg bg-white"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent tracking-tight group-hover:scale-105 transition-transform duration-300">
                Moretori Naija
              </span>
              <Badge variant="secondary" className="text-xs w-fit bg-orange-100 text-orange-600 animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" />
                Premium News
              </Badge>
            </div>
          </Link>
          
          {/* Enhanced Desktop Navigation with Modern Styling */}
          <nav className="hidden lg:flex items-center gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={cn(
                  "relative px-5 py-3 text-sm font-semibold transition-all duration-300 rounded-xl group hover:scale-105",
                  category.hoverColor,
                  location.pathname.includes(category.slug) 
                    ? `bg-gradient-to-r from-${category.color.split('-')[1]}-100 to-${category.color.split('-')[1]}-50 text-${category.color.split('-')[1]}-700 shadow-lg scale-105` 
                    : "hover:shadow-md"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", category.color, "opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300")}></div>
                  {category.name}
                </div>
                {location.pathname.includes(category.slug) && (
                  <div className={cn("absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full", category.color, "animate-pulse")}></div>
                )}
              </Link>
            ))}
            <Link
              to="/videos"
              className={cn(
                "px-5 py-3 text-sm font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 hover:text-pink-600 relative group hover:scale-105 hover:shadow-md",
                location.pathname === "/videos" && "bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 shadow-lg scale-105"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                Videos
                <Zap className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
              </div>
              {location.pathname === "/videos" && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          {/* Enhanced Search */}
          <SearchBar />
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform duration-300">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>
          
          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserMenu onMenuItemClick={handleMenuClose} />
            ) : (
              <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Link to="/auth/user">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
