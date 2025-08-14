
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CategoryMenu } from "./navigation/CategoryMenu";
import { UserMenu } from "./navigation/UserMenu";
import { SearchBar } from "./navigation/SearchBar";
import { TopBar } from "./navigation/TopBar";

const categories = [
  { name: "Technology", slug: "tech", icon: "💻" },
  { name: "Automotive", slug: "auto", icon: "🚗" },
  { name: "Health", slug: "health", icon: "🏥" },
  { name: "Entertainment", slug: "entertainment", icon: "🎬" },
  { name: "Business", slug: "business", icon: "💼" },
  { name: "Sports", slug: "sports", icon: "⚽" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white border-b border-gray-100'
      }`}>

      {/* Main header */}
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg">
              <span className="text-white font-bold text-xl">MT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">MoreTori</h1>
              <p className="text-xs text-gray-500 -mt-1">Naija Blog</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            
            <CategoryMenu />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Search */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>


            {/* Sign In Button */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth/user" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Categories</p>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="block text-sm text-gray-700 hover:text-blue-600 pl-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <Link 
                to="/auth/user" 
                className="block text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
      </header>
    </>
  );
}
