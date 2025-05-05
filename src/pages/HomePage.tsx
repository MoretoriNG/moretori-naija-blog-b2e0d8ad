
import { useState } from "react";
import { HeroSlider } from "@/components/blog/HeroSlider";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { CategoryPosts } from "@/components/blog/CategoryPosts";
import { TrendingTopics } from "@/components/blog/TrendingTopics";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts, getAllPosts, getRecentPosts } from "@/lib/blog-data";
import { Post, PostCategory } from "@/types/blog";

export default function HomePage() {
  const sliderPosts = getRecentPosts(4);
  const featuredPosts = getFeaturedPosts();
  const allPosts = getAllPosts().slice(0, 6); // Get 6 posts for the featured carousel

  // Find a post with video to feature
  const videoPosts = getAllPosts().filter(post => post.video);
  const [featuredVideo, setFeaturedVideo] = useState<Post | null>(videoPosts.length > 0 ? videoPosts[0] : null);
  
  // List of recommended videos
  const recommendedVideos = videoPosts.slice(0, 4);
  
  // Handle category filtering for featured content
  const [activeCategory, setActiveCategory] = useState<PostCategory | 'all'>('all');
  
  const filteredFeaturedPosts = activeCategory === 'all' 
    ? featuredPosts
    : featuredPosts.filter(post => post.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <HeroSlider posts={sliderPosts} />
      
      {/* Featured Video Section */}
      {featuredVideo && (
        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Videos</h2>
              <div className="flex gap-2 overflow-x-auto pb-2 mt-4 md:mt-0">
                {['all', 'tech', 'auto', 'health', 'entertainment', 'news'].map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category as PostCategory | 'all')}
                    className="whitespace-nowrap"
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="rounded-lg overflow-hidden">
                  <VideoPlayer
                    src={featuredVideo.video || ''}
                    poster={featuredVideo.coverImage}
                    title={featuredVideo.title}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold">{featuredVideo.title}</h3>
                  <p className="text-muted-foreground mt-1">{featuredVideo.excerpt}</p>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <h3 className="text-lg font-medium mb-4">Recommended Videos</h3>
                <div className="space-y-4">
                  {recommendedVideos.map((video) => (
                    <div 
                      key={video.id} 
                      className="flex gap-4 cursor-pointer hover:bg-slate-100 p-2 rounded-md transition-colors"
                      onClick={() => setFeaturedVideo(video)}
                    >
                      <div className="relative w-24 h-16 flex-shrink-0">
                        <img 
                          src={video.coverImage} 
                          alt={video.title} 
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-black ml-0.5"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{video.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Trending Topics */}
      <TrendingTopics />
      
      {/* Featured Posts Carousel */}
      <FeaturedPosts posts={allPosts} />
      
      {/* Category Posts with Tabs */}
      <CategoryPosts initialCategory="tech" />
    </div>
  );
}
