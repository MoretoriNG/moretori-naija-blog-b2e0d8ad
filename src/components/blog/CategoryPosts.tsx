import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Post, PostCategory } from "@/types/blog";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostsByCategory, getCategoryById, getRecentPostsByCategory } from "@/lib/blog-data";
import { Hash, Clock, ChevronRight, Sparkles, Filter, ArrowUpDown, Grid, List, BookmarkPlus, TrendingUp } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface CategoryPostsProps {
  initialCategory: PostCategory;
}

export function CategoryPosts({ initialCategory }: CategoryPostsProps) {
  const [activeCategory, setActiveCategory] = useState<PostCategory>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categories: PostCategory[] = ['tech', 'auto', 'health', 'entertainment', 'news', 'business', 'sports', 'lifestyle'];
  
  // Show loading effect when changing categories
  useEffect(() => {
    setLoading(true);
    
    // Scroll to container top on category change for better UX
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
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
  
  // Sort posts based on selection
  const sortedPosts = [...categoryPosts].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.publishedAt || b.published_at || '').getTime() - 
             new Date(a.publishedAt || a.published_at || '').getTime();
    } else {
      // For "popular" we'll simulate popularity with a random factor based on post ID for demo
      const popularityA = parseInt(String(a.id)) % 10;
      const popularityB = parseInt(String(b.id)) % 10;
      return popularityB - popularityA;
    }
  });
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value as PostCategory);
  };
  
  const handleSavePost = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      toast.success("Post removed from saved items");
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast.success("Post saved to your reading list");
    }
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
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-white to-blue-50/30">
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
          
          {/* Filter controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-lg shadow-sm border mb-2">
            <div className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> 
              <span><strong>{sortedPosts.length}</strong> articles in this category</span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    {sortBy === 'recent' ? 'Most Recent' : 'Popular'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value as 'recent' | 'popular')}>
                    <DropdownMenuRadioItem value="recent">Most Recent</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="popular">Popular</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* View mode toggle */}
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'} ${
            viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'
          }`}
        >
          {sortedPosts.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <>
                  {/* Featured post - larger size */}
                  <div className="col-span-1 md:col-span-2 row-span-2">
                    <PostCard 
                      post={sortedPosts[0]} 
                      featured 
                      onSave={() => handleSavePost(String(sortedPosts[0].id))}
                      saved={savedPosts.includes(String(sortedPosts[0].id))}
                    />
                  </div>
                  
                  {/* Other posts */}
                  {sortedPosts.slice(1).map((post) => (
                    <div key={post.id}>
                      <PostCard 
                        post={post} 
                        onSave={() => handleSavePost(String(post.id))}
                        saved={savedPosts.includes(String(post.id))}
                      />
                    </div>
                  ))}
                </>
              ) : (
                // List view
                sortedPosts.map((post) => (
                  <div key={post.id} className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="sm:w-1/3">
                      <Link to={`/post/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-md">
                        <img 
                          src={post.coverImage || post.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=800&q=80`}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="sm:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <CategoryBadge category={post.category} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 rounded-full ${savedPosts.includes(String(post.id)) ? 'text-yellow-500' : ''}`}
                          onClick={() => handleSavePost(String(post.id))}
                        >
                          <BookmarkPlus className={`h-4 w-4 ${savedPosts.includes(String(post.id)) ? 'fill-yellow-500' : ''}`} />
                        </Button>
                      </div>
                      <Link to={`/post/${post.slug}`}>
                        <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <time className="flex items-center" dateTime={post.publishedAt || post.published_at}>
                            <Clock className="mr-1 h-3 w-3" />
                            {new Date(post.publishedAt || post.published_at || '').toLocaleDateString()}
                          </time>
                          <span>{post.author}</span>
                        </div>
                        <Link 
                          to={`/post/${post.slug}`} 
                          className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Read <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
        
        {/* Trending now section with improved design */}
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
          
          <div className="bg-white p-4 rounded-xl shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 items-center p-2 hover:bg-blue-50/50 rounded-lg transition-colors group">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=200&q=80`}
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link to={`/category/${activeCategory}`} className="font-medium hover:text-blue-600 transition-colors line-clamp-2 text-sm group-hover:text-blue-600">
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
