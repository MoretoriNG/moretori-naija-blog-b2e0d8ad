
import { useState, useEffect } from "react";
import { Post, PostCategory } from "@/types/blog";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostsByCategory } from "@/lib/blog-data";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { motion } from "@/components/ui/motion";
import { Hash } from "lucide-react";

interface CategoryPostsProps {
  initialCategory: PostCategory;
}

export function CategoryPosts({ initialCategory }: CategoryPostsProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory>(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'news'];
  const categoryPosts = getPostsByCategory(activeCategory);
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = categoryPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(categoryPosts.length / postsPerPage);
  
  useEffect(() => {
    // Reset page when category changes
    setCurrentPage(1);
  }, [activeCategory]);
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
  };
  
  const getCategoryTitle = (category: PostCategory): string => {
    const titles: Record<PostCategory, string> = {
      tech: "Technology",
      auto: "Automotive",
      health: "Health & Wellness",
      entertainment: "Entertainment",
      news: "Current News"
    };
    return titles[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-muted/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted/50 to-transparent"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-5 w-5 text-vibehub-purple" />
                <h2 className="text-2xl md:text-3xl font-bold">Latest Updates</h2>
              </div>
              <p className="text-muted-foreground max-w-xl">
                Stay informed with the freshest content from {getCategoryTitle(activeCategory)}
              </p>
            </div>
            
            <Tabs 
              defaultValue={activeCategory}
              onValueChange={handleCategoryChange}
              className="w-full md:w-auto"
            >
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row gap-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="capitalize data-[state=active]:bg-vibehub-purple data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div 
                key={post.id}
                className="animate-fade-in"
              >
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center bg-muted mb-4">
                <Hash className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any posts in the {activeCategory} category. Check back later for updates.
              </p>
            </div>
          )}
        </div>
        
        {categoryPosts.length > postsPerPage && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-vibehub-purple/10"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className={currentPage === i + 1 ? "bg-vibehub-purple text-white border-vibehub-purple" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-vibehub-purple/10"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        {categoryPosts.length > postsPerPage && (
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" className="border-vibehub-purple text-vibehub-purple hover:bg-vibehub-purple hover:text-white" asChild>
              <Link to={`/category/${activeCategory}`}>
                Explore All {getCategoryTitle(activeCategory)}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
