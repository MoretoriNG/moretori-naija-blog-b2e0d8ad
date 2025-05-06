
import { HeroSlider } from "@/components/blog/HeroSlider";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { getFeaturedPosts, getRecentPosts, getAllPosts, getCategoryById } from "@/lib/blog";
import { Post, PostCategory } from "@/types/blog";

export default function HomePage() {
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
  
  const allPosts = getAllPosts().slice(0, 6); // Get 6 posts for the featured carousel
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <HeroSlider posts={recentPosts} />
      
      {/* Trending Topics */}
      <TrendingTopics />
      
      {/* Featured Posts Carousel */}
      <FeaturedPosts posts={allPosts} />
      
      {/* Category Posts with Tabs */}
      <CategoryPosts initialCategory="tech" />
    </div>
  );
}
