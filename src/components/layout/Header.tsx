
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => document.getElementById("search-input")?.focus(), 100);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 bg-background",
        scrolled && "border-b shadow-sm backdrop-blur-lg bg-background/95"
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-6">
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            BlogMaster
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/"
                    className={({isActive}) => cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive && "bg-accent/50"
                    )}
                  >
                    Home
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      { name: 'Technology', slug: 'tech', description: 'Latest tech news and innovations' },
                      { name: 'Automotive', slug: 'auto', description: 'Cars, electric vehicles, and transportation' },
                      { name: 'Health', slug: 'health', description: 'Wellness, fitness, and medical research' },
                      { name: 'Entertainment', slug: 'entertainment', description: 'Movies, music, games, and culture' },
                      { name: 'News', slug: 'news', description: 'Current events and breaking stories' }
                    ].map((category) => (
                      <li key={category.slug}>
                        <Link
                          to={`/category/${category.slug}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/about"
                    className={({isActive}) => cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive && "bg-accent/50"
                    )}
                  >
                    About
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Icon */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Admin link */}
          <Button asChild variant="default" size="sm" className="hidden md:flex">
            <Link to="/admin">Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-16 z-50 p-4 bg-background border-b shadow-lg transition-all duration-300">
          <div className="container relative">
            <Input
              id="search-input"
              placeholder="Search articles..."
              className="w-full"
              autoFocus
              onKeyDown={(e) => e.key === "Escape" && toggleSearch()}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={toggleSearch}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b shadow-sm">
          <div className="container py-4 space-y-1">
            <NavLink
              to="/"
              className={({isActive}) => cn(
                "flex items-center px-4 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                isActive && "bg-accent"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            
            <div className="relative">
              <button 
                className="flex items-center justify-between w-full px-4 py-2 text-sm rounded-md transition-colors hover:bg-accent"
              >
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="pl-4 mt-1 space-y-1">
                {['tech', 'auto', 'health', 'entertainment', 'news'].map((category) => (
                  <NavLink
                    key={category}
                    to={`/category/${category}`}
                    className={({isActive}) => cn(
                      "flex items-center px-4 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                      isActive && "bg-accent"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                ))}
              </div>
            </div>
            
            <NavLink
              to="/about"
              className={({isActive}) => cn(
                "flex items-center px-4 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                isActive && "bg-accent"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            
            <Link
              to="/admin"
              className="flex items-center px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
