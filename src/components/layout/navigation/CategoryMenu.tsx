
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define category structure
export type Category = {
  name: string;
  slug: string;
  description: string;
  subcategories: string[];
};

// List of categories
export const categories: Category[] = [
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

interface CategoryMenuProps {
  onCategoryClick?: () => void;
}

export function CategoryMenu({ onCategoryClick }: CategoryMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
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

  return (
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
                  onClick={() => {
                    setActiveCategory(null);
                    if (onCategoryClick) onCategoryClick();
                  }}
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
                      onClick={() => {
                        setActiveCategory(null);
                        if (onCategoryClick) onCategoryClick();
                      }}
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
                  onClick={() => {
                    setActiveCategory(null);
                    if (onCategoryClick) onCategoryClick();
                  }}
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
  );
}

export function MobileCategoryMenu({ onCategoryClick }: CategoryMenuProps) {
  return (
    <nav className="flex flex-col space-y-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          to={`/category/${category.slug}`}
          className="text-sm font-medium transition-colors hover:text-blue-600"
          onClick={onCategoryClick}
        >
          {category.name}
        </Link>
      ))}
      <Link 
        to="/about" 
        className="text-sm font-medium transition-colors hover:text-blue-600"
        onClick={onCategoryClick}
      >
        About
      </Link>
    </nav>
  );
}
