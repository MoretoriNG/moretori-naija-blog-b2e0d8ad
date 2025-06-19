
import { useState, useEffect } from "react";
import { HeroSlider } from "@/components/blog/hero";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { getFeaturedPosts, getRecentPosts, getAllPosts, getCategoryBySlug } from "@/lib/blog";
import { Post, PostCategory } from "@/types/blog";
import AdBanner from "@/components/blog/advertising/AdBanner";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  // Convert posts to proper Post type
  const recentPosts = getRecentPosts(4).map(post => ({
    ...post,
    id: String(post.id),
    category: getCategoryBySlug(String(post.category_id))?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const featuredPosts = getFeaturedPosts().map(post => ({
    ...post,
    id: String(post.id),
    category: getCategoryBySlug(String(post.category_id))?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const allPosts = getAllPosts().slice(0, 12); // Get 12 posts for the featured carousel
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <HeroSlider posts={recentPosts} />
      
      {/* Trending Topics */}
      <TrendingTopics />
      
      <div className="container px-4 lg:px-8 mt-8">
        {/* Main Content - Full Width */}
        <div className="w-full">
          {/* Featured Posts Carousel */}
          <FeaturedPosts posts={allPosts} />
          
          {/* Category Posts with Tabs */}
          <CategoryPosts initialCategory="tech" />
          
          {/* Latest Update Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <img 
                    src={post.coverImage || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=400&q=80`}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-gray-500">{new Date(post.publishedAt || '').toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
