
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Post, PostCategory } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { getRecentPostsByCategory, getCategoryById } from "@/lib/blog-data";
import { toast } from "sonner";
import AdBanner from "./advertising/AdBanner";

// Import refactored components
import { CategoryHeader } from "./category/CategoryHeader";
import { CategoryFilters } from "./category/CategoryFilters";
import { GridPostList } from "./category/GridPostList";
import { ListPostList } from "./category/ListPostList";
import { EmptyState } from "./category/EmptyState";

interface CategoryPostsProps {
  initialCategory: PostCategory;
}

export function CategoryPosts({ initialCategory }: CategoryPostsProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [compactView, setCompactView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'news', 'business', 'sports', 'lifestyle'];
  
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
    category: getCategoryById(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  // Sort posts based on selection
  const sortedPosts = [...categoryPosts].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.publishedAt || b.published_at || '').getTime() - 
             new Date(a.publishedAt || a.published_at || '').getTime();
    } else {
      // For "popular" we'll simulate popularity with a random factor based on post ID for demo
      const popularityA = parseInt(String(a.id)) % 10;
      const popularityB = parseInt(String(b.id)) % 10;
      return popularityB - popularityA;
    }
  });
  
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
    const titles: Record<PostCategory, string> = {
      tech: "Technology",
      auto: "Automotive",
      health: "Health & Wellness",
      entertainment: "Entertainment",
      news: "Current News",
      business: "Business",
      sports: "Sports",
      lifestyle: "Lifestyle"
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
          
          <CategoryFilters 
            postsCount={sortedPosts.length}
            sortBy={sortBy}
            viewMode={viewMode}
            compactView={compactView}
            setSortBy={setSortBy}
            setViewMode={setViewMode}
            setCompactView={setCompactView}
          />
        </div>
        
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {sortedPosts.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <GridPostList 
                  posts={sortedPosts} 
                  compactView={compactView} 
                  handleSavePost={handleSavePost}
                  savedPosts={savedPosts}
                />
              ) : (
                <ListPostList 
                  posts={sortedPosts}
                  handleSavePost={handleSavePost}
                  savedPosts={savedPosts}
                />
              )}
            </>
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
