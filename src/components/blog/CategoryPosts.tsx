import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post, PostCategory } from "@/types/blog";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostsByCategory, getCategoryById, getRecentPostsByCategory } from "@/lib/blog-data";
import { Hash, Clock, ChevronRight, Sparkles } from "lucide-react";

interface CategoryPostsProps {
  initialCategory: PostCategory;
}

export function CategoryPosts({ initialCategory }: CategoryPostsProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory>(initialCategory);
  const [loading, setLoading] = useState(false);
  
  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'news', 'business', 'sports', 'lifestyle'];
  
  // Show loading effect when changing categories
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  // Get recent posts for the active category (top 6)
  const rawCategoryPosts = getRecentPostsByCategory(activeCategory, 6);
  
  // Convert posts to the expected Post type
  const categoryPosts = rawCategoryPosts.map(post => ({
    ...post,
    id: String(post.id),
    category: getCategoryById(post.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
  };
  
  const getCategoryTitle = (category: PostCategory): string => {
    const titles: Record<PostCategory, string> = {
      tech: "Technology",
      auto: "Automotive",
      health: "Health & Wellness",
      entertainment: "Entertainment",
      news: "Current News",
      business: "Business",
      sports: "Sports",
      lifestyle: "Lifestyle"
    };
    return titles[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const getCategoryIcon = (category: PostCategory) => {
    return <Sparkles className="h-5 w-5 text-blue-500" />;
  };
  
  const getRandomTimestamp = () => {
    const now = new Date();
    const randomMinutes = Math.floor(Math.random() * 120) + 10;
    return new Date(now.getTime() - randomMinutes * 60000).toISOString();
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(activeCategory)}
                <h2 className="text-2xl md:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {getCategoryTitle(activeCategory)}
                  </span>
                </h2>
              </div>
              <p className="text-muted-foreground">
                Latest updates from {getCategoryTitle(activeCategory)}
              </p>
            </div>
            
            <div className="w-full md:w-auto mb-6 md:mb-0">
              <Tabs 
                defaultValue={activeCategory}
                value={activeCategory}
                onValueChange={handleCategoryChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category} 
                      className="capitalize text-xs md:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {categoryPosts.length > 0 ? (
            <>
              {/* Featured post - larger size */}
              <div className="col-span-1 md:col-span-2 row-span-2">
                <PostCard post={categoryPosts[0]} featured />
              </div>
              
              {/* Other posts */}
              {categoryPosts.slice(1).map((post) => (
                <div key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center bg-muted mb-4">
                <Hash className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No recent posts found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any recent posts in the {activeCategory} category. Check back later for updates.
              </p>
            </div>
          )}
        </div>
        
        {/* Trending now section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" /> 
              Recent in {getCategoryTitle(activeCategory)}
            </h3>
            
            <Link to={`/category/${activeCategory}`} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 items-center p-2 hover:bg-blue-50/50 rounded-lg transition-colors">
                  <span className="text-2xl font-bold text-blue-600/20">0{i+1}</span>
                  <div className="flex-1">
                    <Link to={`/category/${activeCategory}`} className="font-medium hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                      {`Latest trending topic in ${getCategoryTitle(activeCategory)} category`}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {Math.floor(Math.random() * 50) + 10} minutes ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to={`/category/${activeCategory}`}>
              Browse All {getCategoryTitle(activeCategory)} Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
