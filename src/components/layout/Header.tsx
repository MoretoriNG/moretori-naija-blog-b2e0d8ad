
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { SearchBar } from './navigation/SearchBar';
import { UserMenu, MobileUserMenu } from './navigation/UserMenu';
import { TopBar } from './navigation/TopBar';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const categories = ["Tech", "Auto", "Health", "Entertainment", "News"];
  
  // Reset mobile menu state on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const handleMenuClose = () => {
    setIsOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      {/* Top bar with date and socials */}
      <TopBar />
      
      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/69147eee-3513-4da6-b867-18916d74115a.png" 
              alt="Moretori Naija Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-extrabold text-orange-500">
              Moretori Naija
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Social Links */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-sky-500 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-pink-600 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          
          {/* Search component */}
          <SearchBar />
          
          <div className="hidden md:flex items-center gap-2">
            <UserMenu onMenuItemClick={handleMenuClose} />
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
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "container md:hidden overflow-hidden transition-all",
          isOpen ? "max-h-[500px] py-4" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-3 mb-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-blue-600"
              onClick={handleMenuClose}
            >
              {category}
            </Link>
          ))}
        </nav>
        <MobileUserMenu onMenuItemClick={handleMenuClose} />
      </div>
    </header>
  );
}
