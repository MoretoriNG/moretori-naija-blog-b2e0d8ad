
import { useState, useEffect } from "react";
import { HeroSlider } from "@/components/blog/hero";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { Newsletter } from "@/components/blog/Newsletter";
import { getFeaturedPosts, getRecentPosts, getAllPosts, getCategoryById } from "@/lib/blog";
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
    category: getCategoryById(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const featuredPosts = getFeaturedPosts().map(post => ({
    ...post,
    id: String(post.id),
    category: getCategoryById(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const allPosts = getAllPosts().slice(0, 12); // Get 12 posts for the featured carousel
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <HeroSlider posts={recentPosts} />
      
      <div className="container px-4 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-9">
          {/* Featured Posts Carousel */}
          <FeaturedPosts posts={allPosts} />
          
          {/* Category Posts with Tabs */}
          <CategoryPosts initialCategory="tech" />
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-8">
          {/* Sidebar Ad Banner */}
          <AdBanner size="sidebar" id="sidebar-promo-1" />
          
          {/* Trending Topics */}
          <TrendingTopics />
          
          {/* Newsletter */}
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
