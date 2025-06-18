
import { PostCategory } from "@/types/blog";
import { Sparkles, Filter, SortAsc, Grid3X3, List, Bookmark, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
  const getCategoryStats = (category: PostCategory) => {
    // Mock stats - in real app, this would come from API
    const stats = {
      tech: { posts: 45, trending: 12 },
      health: { posts: 32, trending: 8 },
      entertainment: { posts: 28, trending: 15 },
      business: { posts: 41, trending: 9 },
      sports: { posts: 36, trending: 11 },
      lifestyle: { posts: 29, trending: 7 },
      news: { posts: 52, trending: 18 },
      auto: { posts: 24, trending: 6 }
    };
    return stats[category] || { posts: 0, trending: 0 };
  };

  const currentStats = getCategoryStats(activeCategory);

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl p-6 mb-8 shadow-lg">
      {/* Main Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {getCategoryTitle(activeCategory)}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Discover the latest insights and trending stories
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Eye className="w-3 h-3 mr-1" />
              {currentStats.posts} Articles
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Sparkles className="w-3 h-3 mr-1" />
              {currentStats.trending} Trending
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
              <Bookmark className="w-3 h-3 mr-1" />
              Updated Daily
            </Badge>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Sparkles className="w-4 h-4 mr-2" />
                Featured Only
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Most Viewed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Bookmark className="w-4 h-4 mr-2" />
                Saved Articles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                <SortAsc className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Latest First</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 rounded-none">
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 rounded-none">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Category Tabs */}
      <div className="w-full overflow-x-auto">
        <Tabs 
          defaultValue={activeCategory}
          value={activeCategory}
          onValueChange={handleCategoryChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2 min-w-[600px] md:min-w-0 bg-white/60 backdrop-blur-sm p-1 rounded-xl">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="capitalize text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
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
