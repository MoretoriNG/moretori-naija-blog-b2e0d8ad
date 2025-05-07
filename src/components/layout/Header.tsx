
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Menu, X, Search, Facebook, Instagram, Twitter, Calendar, Mail, LogIn, UserPlus, User, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const categories = [
  { 
    name: "Tech", 
    slug: "tech",
    description: "Latest technology news and innovations",
    subcategories: ["AI", "Apps", "Gadgets", "Programming"]
  },
  { 
    name: "Auto", 
    slug: "auto",
    description: "Automotive industry updates and reviews",
    subcategories: ["New Releases", "Reviews", "Electric Vehicles"]
  },
  { 
    name: "Health", 
    slug: "health",
    description: "Health tips, medical research and wellness",
    subcategories: ["Fitness", "Nutrition", "Mental Health", "Medical Research"]
  },
  { 
    name: "Entertainment", 
    slug: "entertainment",
    description: "Movies, music, celebrities and lifestyle",
    subcategories: ["Movies", "Music", "Celebrities", "Nollywood"]
  },
  { 
    name: "News", 
    slug: "news",
    description: "Breaking news and current events",
    subcategories: ["Local", "National", "International", "Politics"]
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Reset mobile menu state on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date as: Tuesday, May 4, 2025
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      {/* Top bar with date and socials */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-1.5">
        <div className="container flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:contact@moretorinaija.com" className="flex items-center text-xs hover:text-blue-200 transition-colors">
              <Mail className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">contact@moretorinaija.com</span>
            </a>
            <div className="flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-200 transition-colors">
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-200 transition-colors">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-200 transition-colors">
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-orange-500 bg-clip-text text-transparent">
              Moretori Naija
            </span>
          </Link>
          
          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden md:flex items-center gap-6" ref={menuRef}>
            {categories.map((category) => (
              <div key={category.slug} className="relative group">
                <button
                  className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 relative 
                    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 
                    after:transition-all hover:after:w-full ${
                    activeCategory === category.slug ? 'text-blue-600 after:w-full' : ''
                  }`}
                  onClick={() => setActiveCategory(activeCategory === category.slug ? null : category.slug)}
                  onMouseEnter={() => setActiveCategory(category.slug)}
                >
                  {category.name}
                  <ChevronDown className="h-3.5 w-3.5 ml-0.5 transition-transform duration-200" />
                </button>
                
                {/* Dropdown Menu */}
                {activeCategory === category.slug && (
                  <div 
                    className="absolute left-0 top-full mt-1 w-64 rounded-lg border bg-white shadow-xl animate-fade-in z-50"
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="p-4">
                      <Link 
                        to={`/category/${category.slug}`}
                        className="block font-medium text-base mb-1 hover:text-blue-600 transition-colors"
                        onClick={() => setActiveCategory(null)}
                      >
                        {category.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mb-3">{category.description}</p>
                      <div className="space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            to={`/category/${category.slug}?tag=${subcategory.toLowerCase().replace(' ', '-')}`}
                            className="flex items-center text-sm py-1 hover:text-blue-600 transition-colors"
                            onClick={() => setActiveCategory(null)}
                          >
                            <ChevronRight className="h-3 w-3 mr-1 text-muted-foreground" />
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 border-t rounded-b-lg">
                      <Link
                        to={`/category/${category.slug}`}
                        className="flex items-center justify-between text-xs font-medium hover:text-blue-600 transition-colors"
                        onClick={() => setActiveCategory(null)}
                      >
                        View All {category.name} Articles
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Search component */}
          <div className={cn(
            "transition-all duration-300",
            isSearchOpen 
              ? "w-48 md:w-64 border rounded-full overflow-hidden bg-white shadow-sm" 
              : "w-10"
          )}>
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input
                  placeholder="Search articles..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-blue-600/10"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600/30 hover:bg-blue-600 hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites">My Favorites</Link>
                  </DropdownMenuItem>
                  {user && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600/30 hover:bg-blue-600 hover:text-white" asChild>
                  <Link to="/auth?tab=login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                  </Link>
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link to="/auth?tab=register">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {user && (
            <Button asChild className="hidden md:flex bg-orange-500 hover:bg-orange-600 ml-1">
              <Link to="/admin">Admin</Link>
            </Button>
          )}
          
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
        <nav className="flex flex-col space-y-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="text-sm font-medium transition-colors hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link 
            to="/about" 
            className="text-sm font-medium transition-colors hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <div className="pt-2 flex gap-2">
            {user ? (
              <>
                <Button variant="outline" size="sm" className="flex-1 text-blue-600" onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
                <Button asChild size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    Admin Portal
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="flex-1 text-blue-600">
                  <Link to="/auth?tab=login" onClick={() => setIsOpen(false)}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                  </Link>
                </Button>
                <Button asChild size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <Link to="/auth?tab=register" onClick={() => setIsOpen(false)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
