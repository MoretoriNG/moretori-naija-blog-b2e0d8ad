
import { useState, useEffect } from "react";
import { HeroSlider } from "@/components/blog/hero";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { RightSidebar } from "@/components/layout/RightSidebar";
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
    category: getCategoryBySlug(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const featuredPosts = getFeaturedPosts().map(post => ({
    ...post,
    id: String(post.id),
    category: getCategoryBySlug(post.category_id)?.slug as PostCategory || 'uncategorized',
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:flex-1">
            {/* Featured Posts Carousel */}
            <FeaturedPosts posts={allPosts} />
            
            {/* Category Posts with Tabs */}
            <CategoryPosts initialCategory="tech" />
            
            {/* Latest Update Section (Right Sidebar Content) */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
              <RightSidebar />
            </div>
          </div>
          
          {/* Right Sidebar - Compact and aligned right */}
          <div className="lg:w-80 lg:flex-shrink-0 hidden lg:block">
            <div className="sticky top-8">
              {/* Sidebar Ad Banner */}
              <AdBanner size="sidebar" id="sidebar-promo-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
