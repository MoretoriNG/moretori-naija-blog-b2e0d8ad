
import { PostCategory } from "@/types/blog";
import { Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryHeaderProps {
  activeCategory: PostCategory;
  categories: PostCategory[];
  getCategoryTitle: (category: PostCategory) => string;
  handleCategoryChange: (value: string) => void;
}

export function CategoryHeader({ 
  activeCategory, 
  categories, 
  getCategoryTitle,
  handleCategoryChange 
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {getCategoryTitle(activeCategory)}
            </span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Latest updates from {getCategoryTitle(activeCategory)}
        </p>
      </div>
      
      <div className="w-full md:w-auto mb-4 md:mb-0 overflow-x-auto">
        <Tabs 
          defaultValue={activeCategory}
          value={activeCategory}
          onValueChange={handleCategoryChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1 min-w-[600px] md:min-w-0">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="capitalize text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
