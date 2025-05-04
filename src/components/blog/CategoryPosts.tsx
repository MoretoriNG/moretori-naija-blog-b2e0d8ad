
import { useState } from "react";
import { Post, PostCategory } from "@/types/blog";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostsByCategory } from "@/lib/blog-data";

interface CategoryPostsProps {
  initialCategory: PostCategory;
}

export function CategoryPosts({ initialCategory }: CategoryPostsProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory>(initialCategory);
  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'news'];
  const categoryPosts = getPostsByCategory(activeCategory);
  
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Latest Posts</h2>
          
          <Tabs 
            defaultValue={activeCategory}
            onValueChange={(value) => setActiveCategory(value as PostCategory)}
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
          {categoryPosts.length > 0 ? (
            categoryPosts.slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
        
        {categoryPosts.length > 6 && (
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
