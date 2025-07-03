
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryHeader } from "@/components/blog/category/CategoryHeader";
import { GridPostList } from "@/components/blog/category/GridPostList";
import { ListPostList } from "@/components/blog/category/ListPostList";
import { EmptyState } from "@/components/blog/category/EmptyState";
import { PostCategory, Post } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Grid, List, Layers } from "lucide-react";
import AdBanner from "@/components/blog/advertising/AdBanner";
import { toast } from "sonner";
import { supabasePosts } from "@/lib/supabase/posts";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [activeCategory, setActiveCategory] = useState<PostCategory>(category as PostCategory || 'tech');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compactView, setCompactView] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'business', 'sports'];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (category && categories.includes(category as PostCategory)) {
      setActiveCategory(category as PostCategory);
    }
  }, [category]);

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const categoryPosts = await supabasePosts.getAllPosts({ 
        category: activeCategory, 
        published: true 
      });
      
      // Transform Supabase data to match our Post type
      const transformedPosts = categoryPosts.map(post => ({
        id: String(post.id),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        coverImage: post.cover_image || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`,
        category: post.category as PostCategory,
        author: post.author || 'Unknown',
        publishedAt: post.created_at || new Date().toISOString(),
        featured: post.featured || false,
        video: post.video_url,
        tags: post.tags || []
      })) as Post[];

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
    window.history.pushState(null, '', `/category/${value}`);
  };

  const getCategoryTitle = (category: PostCategory): string => {
    const categoryMap: Record<PostCategory, string> = {
      tech: 'Technology',
      auto: 'Automotive',
      health: 'Health',
      entertainment: 'Entertainment',
      business: 'Business',
      sports: 'Sports',
      news: 'News',
      lifestyle: 'Lifestyle'
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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

        {/* View Mode Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            {viewMode === 'grid' && (
              <Button
                variant={compactView ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCompactView(!compactView)}
              >
                <Layers className="h-4 w-4 mr-2" />
                Compact
              </Button>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {posts.length} articles found
          </div>
        </div>

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
