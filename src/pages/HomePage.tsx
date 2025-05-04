
import { HeroSlider } from "@/components/blog/HeroSlider";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { getFeaturedPosts, getAllPosts, getRecentPosts } from "@/lib/blog-data";

export default function HomePage() {
  const sliderPosts = getRecentPosts(4);
  const featuredPosts = getFeaturedPosts();
  const allPosts = getAllPosts().slice(0, 12); // Get 12 posts for the featured carousel
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <HeroSlider posts={sliderPosts} />
      
      {/* Trending Topics */}
      <TrendingTopics />
      
      {/* Featured Posts Carousel */}
      <FeaturedPosts posts={allPosts} />
      
      {/* Category Posts with Tabs */}
      <CategoryPosts initialCategory="tech" />
    </div>
  );
}
