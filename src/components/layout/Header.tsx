
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Bell, User, Bookmark, TrendingUp, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [notifications] = useState(3); // Mock notification count
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white border-b border-gray-100'
    }`}>
      {/* Top bar with quick links */}
      <div className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <Link to="/trending" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                <TrendingUp size={14} />
                Trending
              </Link>
              <Link to="/newsletter" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                <Rss size={14} />
                Newsletter
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>📍 Lagos, Nigeria</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">M</span>
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
            
            <CategoryMenu categories={categories} />
            
            <Link 
              to="/videos" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/videos') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
              }`}
            >
              Videos
            </Link>
            
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/about') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Search */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="font-medium">New article in Technology</p>
                      <p className="text-gray-600 text-xs">2 hours ago</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <p className="font-medium">Weekly digest available</p>
                      <p className="text-gray-600 text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Bookmarks */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/bookmarks">
                <Bookmark size={20} />
              </Link>
            </Button>

            {/* User Menu */}
            <UserMenu />

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
            
            <Link 
              to="/videos" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Videos
            </Link>
            
            <Link 
              to="/about" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-4 border-t space-y-2">
              <Link 
                to="/auth/user" 
                className="block text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/bookmarks" 
                className="block text-sm text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookmarks
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
