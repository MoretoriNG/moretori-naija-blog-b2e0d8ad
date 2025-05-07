
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { CategoryMenu, MobileCategoryMenu } from './navigation/CategoryMenu';
import { SearchBar } from './navigation/SearchBar';
import { UserMenu, MobileUserMenu } from './navigation/UserMenu';
import { TopBar } from './navigation/TopBar';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
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
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
              Moretori Naija
            </span>
          </Link>
          
          {/* Desktop Navigation with Dropdowns */}
          <CategoryMenu onCategoryClick={handleMenuClose} />
        </div>
        
        <div className="flex items-center gap-2">
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
        <MobileCategoryMenu onCategoryClick={handleMenuClose} />
        <MobileUserMenu onMenuItemClick={handleMenuClose} />
      </div>
    </header>
  );
}
