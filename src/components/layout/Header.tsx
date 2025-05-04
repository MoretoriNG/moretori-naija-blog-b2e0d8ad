
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Search } from 'lucide-react';

const categories = [
  { name: "Tech", slug: "tech" },
  { name: "Auto", slug: "auto" },
  { name: "Health", slug: "health" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "News", slug: "news" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-vibehub-purple to-vibehub-blue-bright bg-clip-text text-transparent">VibeHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link to="/about">About</Link>
          </Button>
          
          <Button asChild>
            <Link to="/admin">Admin</Link>
          </Button>
          
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
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link 
            to="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Button variant="outline" className="w-full" size="sm">
            <Search className="h-4 w-4 mr-2" />
            <span>Search</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
