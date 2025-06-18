
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { SearchBar } from './navigation/SearchBar';
import { UserMenu, MobileUserMenu } from './navigation/UserMenu';
import { TopBar } from './navigation/TopBar';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const categories = ["Tech", "Auto", "Health", "Entertainment", "Business", "Sports"];
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const handleMenuClose = () => {
    setIsOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-sm">
      {/* Top bar with date and socials */}
      <TopBar />
      
      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/f9e07f20-f02d-4c0a-af0c-0ac7050a9b97.png" 
              alt="Moretori Naija Logo" 
              className="h-12 w-auto drop-shadow-md"
            />
            <span className="text-2xl font-black text-orange-500 tracking-tight">
              Moretori Naija
            </span>
          </Link>
          
          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-orange-50 hover:text-orange-600",
                  location.pathname.includes(category.toLowerCase()) && "bg-orange-100 text-orange-700"
                )}
              >
                {category}
              </Link>
            ))}
            <Link
              to="/videos"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-orange-50 hover:text-orange-600",
                location.pathname === "/videos" && "bg-orange-100 text-orange-700"
              )}
            >
              Videos
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Enhanced Social Links */}
          <div className="hidden md:flex items-center gap-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" 
               className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" 
               className="p-2 text-muted-foreground hover:text-sky-500 hover:bg-sky-50 rounded-full transition-all">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" 
               className="p-2 text-muted-foreground hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          
          {/* Enhanced Search */}
          <SearchBar />
          
          {/* Auth Section - Only Sign In */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <UserMenu onMenuItemClick={handleMenuClose} />
            ) : (
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                <Link to="/auth">Sign In</Link>
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
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-md",
                location.pathname.includes(category.toLowerCase()) 
                  ? "bg-orange-100 text-orange-700" 
                  : "hover:text-orange-600 hover:bg-orange-50"
              )}
              onClick={handleMenuClose}
            >
              {category}
            </Link>
          ))}
          <Link
            to="/videos"
            className={cn(
              "text-sm font-medium transition-colors py-2 px-3 rounded-md",
              location.pathname === "/videos"
                ? "bg-orange-100 text-orange-700" 
                : "hover:text-orange-600 hover:bg-orange-50"
            )}
            onClick={handleMenuClose}
          >
            Videos
          </Link>
        </nav>
        
        {/* Mobile Auth */}
        {user ? (
          <MobileUserMenu onMenuItemClick={handleMenuClose} />
        ) : (
          <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            <Link to="/auth" onClick={handleMenuClose}>Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
