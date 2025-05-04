
import { useState } from "react";
import { Post, PostCategory } from "@/types/blog";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostsByCategory } from "@/lib/blog-data";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
    setCurrentPage(1); // Reset to first page when changing category
  };
  
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Latest Posts</h2>
          
          <Tabs 
            defaultValue={activeCategory}
            onValueChange={handleCategoryChange}
            className="mt-4 md:mt-0"
          >
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
        
        {categoryPosts.length > postsPerPage && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        {categoryPosts.length > postsPerPage && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href={`/category/${activeCategory}`}>View All {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Posts</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
