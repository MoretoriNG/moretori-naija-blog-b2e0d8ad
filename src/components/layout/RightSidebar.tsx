
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Eye } from 'lucide-react';
import { getRecentPosts, getFeaturedPosts } from "@/lib/blog";
import { Post } from "@/types/blog";

export function RightSidebar() {
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'popular'>('trending');
  
  // Get posts for different sections
  const recentPosts = getRecentPosts(5);
  const featuredPosts = getFeaturedPosts().slice(0, 5);
  
  // Convert to proper Post type
  const trendingPosts = featuredPosts.map(post => ({
    ...post,
    id: String(post.id),
    category: 'tech',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const recentPostsConverted = recentPosts.map(post => ({
    ...post,
    id: String(post.id),
    category: 'tech',
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];

  const tags = [
    { name: "Nigeria", count: 234 },
    { name: "Politics", count: 189 },
    { name: "Economy", count: 156 },
    { name: "Technology", count: 134 },
    { name: "Sports", count: 98 },
    { name: "Entertainment", count: 87 },
    { name: "Health", count: 76 },
    { name: "Education", count: 65 }
  ];

  const getCurrentPosts = () => {
    switch (activeTab) {
      case 'trending':
        return trendingPosts;
      case 'recent':
        return recentPostsConverted;
      case 'popular':
        return [...trendingPosts].sort(() => Math.random() - 0.5);
      default:
        return trendingPosts;
    }
  };

  return (
    <div className="w-80 space-y-6 bg-gray-50/50 p-6 rounded-lg">
      {/* Trending Articles */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Articles</CardTitle>
            <div className="flex gap-1">
              {['trending', 'recent', 'popular'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {getCurrentPosts().map((post, index) => (
            <div key={post.id} className="flex gap-3 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src={post.coverImage || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=100&q=80`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/post/${post.slug}`}
                  className="text-sm font-medium line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight mb-1"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(post.publishedAt || '').toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {Math.floor(Math.random() * 1000) + 100}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-4" asChild>
            <Link to="/category/tech">View All Articles</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link key={index} to={`/search?q=${tag.name}`}>
                <Badge 
                  variant="secondary" 
                  className="hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer text-xs"
                >
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
