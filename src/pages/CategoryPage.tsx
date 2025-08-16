
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeroSlider } from "@/components/blog/hero";
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
import RecommendedPosts from "@/components/recommendations/RecommendedPosts";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [activeCategory, setActiveCategory] = useState<PostCategory>(category as PostCategory || 'tech');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compactView, setCompactView] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: PostCategory[] = ['tech', 'auto', 'health', 'ent', 'bus', 'sports'];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (category && categories.includes(category as PostCategory)) {
      setActiveCategory(category as PostCategory);
    }
  }, [category]);

  const { recordCategoryView } = useEngagementTracker();

  useEffect(() => {
    loadPosts();
    recordCategoryView(activeCategory);
  }, [activeCategory, recordCategoryView]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      
      // Load all posts for the hero carousel
      let allPostsData = await supabasePosts.getAllPosts({ published: true });
      
      // If no posts from Supabase, fallback to static data
      if (allPostsData.length === 0) {
        const { getAllPosts } = await import('@/lib/blog/posts');
        const staticPosts = getAllPosts();
        allPostsData = staticPosts.map(post => ({
          id: String(post.id),
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          author: post.author,
          created_at: post.publishedAt,
          cover_image: post.coverImage,
          image_url: post.coverImage,
          featured: post.featured,
          published: true,
          summary: post.excerpt,
          tags: post.tags || [],
          video_url: post.video || '',
          updated_at: post.publishedAt,
          user_id: null
        }));
      }
      
      // Posts are already transformed by supabasePosts.getAllPosts()
      // Filter posts for current category
      const categoryPosts = allPostsData.filter(post => post.category === activeCategory);
      
      setAllPosts(allPostsData);
      setPosts(categoryPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      // Fallback to static data
      try {
        const { getAllPosts, getPostsByCategory } = await import('@/lib/blog/posts');
        const staticPosts = getAllPosts();
        const categoryPosts = staticPosts.filter(post => post.category === activeCategory);
        setAllPosts(staticPosts);
        setPosts(categoryPosts);
      } catch (fallbackError) {
        console.error('Error loading fallback posts:', fallbackError);
        setAllPosts([]);
        setPosts([]);
      }
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
      ent: 'Entertainment',
      bus: 'Business',
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
      {/* Hero Section with posts from all categories */}
      {allPosts.length > 0 && <HeroSlider posts={allPosts.slice(0, 8)} />}
      
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

        {/* Recommended for You */}
        <RecommendedPosts posts={allPosts} />

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
