
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Post, PostCategory } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { getRecentPostsByCategory, getCategoryBySlug } from "@/lib/blog-data";
import { toast } from "sonner";
import AdBanner from "./advertising/AdBanner";

// Import refactored components
import { CategoryHeader } from "./category/CategoryHeader";
import { ListPostList } from "./category/ListPostList";
import { EmptyState } from "./category/EmptyState";

interface CategoryPostsProps {
  initialCategory: PostCategory;
}

export function CategoryPosts({ initialCategory }: CategoryPostsProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'business', 'sports'];
  
  // Show loading effect when changing categories
  useEffect(() => {
    setLoading(true);
    
    // Scroll to container top on category change for better UX
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  // Get recent posts for the active category (top 8 instead of 6)
  const rawCategoryPosts = getRecentPostsByCategory(activeCategory, 8);
  
  // Convert posts to the expected Post type
  const categoryPosts = rawCategoryPosts.map(post => ({
    ...post,
    id: String(post.id),
    category: getCategoryBySlug(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
  };
  
  const handleSavePost = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      toast.success("Post removed from saved items");
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast.success("Post saved to your reading list");
    }
  };
  
  const getCategoryTitle = (category: PostCategory): string => {
    const titles: Record<string, string> = {
      tech: "Technology",
      auto: "Automotive", 
      health: "Health & Wellness",
      entertainment: "Entertainment",
      business: "Business",
      sports: "Sports"
    };
    return titles[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <section ref={containerRef} className="py-8 md:py-12 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-6">
          <CategoryHeader 
            activeCategory={activeCategory}
            categories={categories}
            getCategoryTitle={getCategoryTitle}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {categoryPosts.length > 0 ? (
            <ListPostList 
              posts={categoryPosts}
              handleSavePost={handleSavePost}
              savedPosts={savedPosts}
            />
          ) : (
            <EmptyState category={activeCategory} />
          )}
        </div>
        
        <div className="mt-6 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-sm" asChild>
            <Link to={`/category/${activeCategory}`}>
              View All {getCategoryTitle(activeCategory)} Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
