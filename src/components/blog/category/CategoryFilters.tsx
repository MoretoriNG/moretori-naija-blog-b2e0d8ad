
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowUpDown, Grid, List } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CategoryFiltersProps {
  postsCount: number;
  sortBy: 'recent' | 'popular';
  viewMode: 'grid' | 'list';
  compactView: boolean;
  setSortBy: (value: 'recent' | 'popular') => void;
  setViewMode: (value: 'grid' | 'list') => void;
  setCompactView: (value: boolean) => void;
}

export function CategoryFilters({
  postsCount,
  sortBy,
  viewMode,
  compactView,
  setSortBy,
  setViewMode,
  setCompactView
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2 rounded-lg shadow-sm border">
      <div className="text-xs text-muted-foreground flex items-center">
        <TrendingUp className="h-3 w-3 mr-1" /> 
        <span><strong>{postsCount}</strong> articles</span>
      </div>
      
      <div className="flex items-center gap-2">
        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <Button 
            variant={compactView ? "ghost" : "default"} 
            size="sm"
            className="h-7 px-2 rounded-md text-xs"
            onClick={() => setCompactView(false)}
          >
            <span className="sr-only md:not-sr-only">Standard</span>
          </Button>
          <Button 
            variant={compactView ? "default" : "ghost"} 
            size="sm"
            className="h-7 px-2 rounded-md text-xs"
            onClick={() => setCompactView(true)}
          >
            <span className="sr-only md:not-sr-only">Compact</span>
          </Button>
        </div>
        
        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1 h-7 px-2 text-xs">
              <ArrowUpDown className="h-3 w-3 mr-1" />
              {sortBy === 'recent' ? 'Recent' : 'Popular'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value as 'recent' | 'popular')}>
              <DropdownMenuRadioItem value="recent">Most Recent</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="popular">Popular</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Layout toggle */}
        <div className="flex border rounded-md overflow-hidden">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
            size="sm"
            className="h-7 px-2 rounded-none"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-3 w-3" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            size="sm"
            className="h-7 px-2 rounded-none"
            onClick={() => setViewMode('list')}
          >
            <List className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
