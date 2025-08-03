
import { useState, useEffect } from "react";
import { HeroSlider } from "@/components/blog/hero";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { Post } from "@/types/blog";
import AdBanner from "@/components/blog/advertising/AdBanner";
import { supabasePosts } from "@/lib/supabase/posts";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await supabasePosts.getAllPosts({ published: true });
      
      // Transform Supabase data to match our Post type
      const transformedPosts = allPosts.map(post => ({
        id: String(post.id),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        coverImage: post.cover_image || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`,
        category: post.category as any,
        author: post.author || 'Unknown',
        publishedAt: post.created_at || new Date().toISOString(),
        featured: post.featured || false,
        video: post.video_url,
        tags: post.tags || []
      })) as Post[];

      // Sort by created date (most recent first)
      const sortedPosts = transformedPosts.sort((a, b) => 
        new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
      );

      setPosts(sortedPosts);
      setFeaturedPosts(sortedPosts.filter(post => post.featured));
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading posts:', error);
      // Fallback to empty arrays if there's an error
      setPosts([]);
      setFeaturedPosts([]);
      setIsLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const recentPosts = posts.slice(0, 6);
  const allPostsForCarousel = posts.slice(0, 12);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      {recentPosts.length > 0 && <HeroSlider posts={recentPosts} />}
      
      {/* Trending Topics */}
      <TrendingTopics />
      
      <div className="container px-4 lg:px-8 mt-8">
        {/* Main Content - Full Width */}
        <div className="w-full">
          {/* Featured Posts Carousel */}
          {allPostsForCarousel.length > 0 && (
            <FeaturedPosts posts={allPostsForCarousel} />
          )}
          
          {/* Category Posts with Tabs */}
          <CategoryPosts initialCategory="tech" />
          
          {/* Latest Update Section */}
          {recentPosts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                    <img 
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(post.publishedAt || '').toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
