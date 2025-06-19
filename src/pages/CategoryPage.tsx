
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryHeader } from "@/components/blog/category/CategoryHeader";
import { GridPostList } from "@/components/blog/category/GridPostList";
import { ListPostList } from "@/components/blog/category/ListPostList";
import { EmptyState } from "@/components/blog/category/EmptyState";
import { getPostsByCategory, getCategoryById } from "@/lib/blog";
import { PostCategory, Post } from "@/types/blog";
import AdBanner from "@/components/blog/advertising/AdBanner";
import { toast } from "sonner";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [activeCategory, setActiveCategory] = useState<PostCategory>(category as PostCategory || 'tech');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compactView, setCompactView] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'business', 'sports'];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (category && categories.includes(category as PostCategory)) {
      setActiveCategory(category as PostCategory);
    }
  }, [category]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
    window.history.pushState(null, '', `/category/${value}`);
  };

  const getCategoryTitle = (category: PostCategory): string => {
    const categoryData = getCategoryById(category);
    return categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleSavePost = (postId: string) => {
    setSavedPosts(prev => {
      if (prev.includes(postId)) {
        toast.success("Post removed from bookmarks");
        return prev.filter(id => id !== postId);
      } else {
        toast.success("Post saved to bookmarks");
        return [...prev, postId];
      }
    });
  };

  // Get posts for the active category
  const posts = getPostsByCategory(activeCategory).map(post => ({
    ...post,
    id: String(post.id),
    category: activeCategory,
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container px-4 lg:px-8 py-8">
        {/* Category Header */}
        <CategoryHeader
          activeCategory={activeCategory}
          categories={categories}
          getCategoryTitle={getCategoryTitle}
          handleCategoryChange={handleCategoryChange}
        />

        {/* Ad Banner */}
        <AdBanner size="large" id="category-top" className="mb-8" />

        {/* Posts Grid/List */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {viewMode === 'grid' ? (
              <GridPostList 
                posts={posts} 
                compactView={compactView}
                handleSavePost={handleSavePost}
                savedPosts={savedPosts}
              />
            ) : (
              <ListPostList 
                posts={posts}
                handleSavePost={handleSavePost}
                savedPosts={savedPosts}
              />
            )}
          </div>
        ) : (
          <EmptyState category={activeCategory} />
        )}

        {/* Bottom Ad Banner */}
        <AdBanner size="large" id="category-bottom" className="mt-12" />
      </div>
    </div>
  );
}
