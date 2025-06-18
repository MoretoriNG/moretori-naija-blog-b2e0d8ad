
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Grid, List, Search, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPostsByCategory, getCategoryBySlug } from "@/lib/blog-data";
import { PostCategory, Post } from "@/types/blog";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import AdBanner from "@/components/blog/advertising/AdBanner";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const validCategories: PostCategory[] = ['tech', 'health', 'entertainment', 'business', 'sports', 'lifestyle', 'news', 'auto'];
  const isValidCategory = slug && validCategories.includes(slug as PostCategory);
  
  useEffect(() => {
    if (!isValidCategory) {
      navigate('/not-found', { replace: true });
    }
    window.scrollTo(0, 0);
  }, [slug, isValidCategory, navigate]);
  
  if (!isValidCategory) {
    return null;
  }
  
  const categoryPosts = getPostsByCategory(slug as PostCategory);
  const category = getCategoryBySlug(slug as string);
  const categoryName = category ? category.name : slug!.charAt(0).toUpperCase() + slug!.slice(1);
  
  const mappedPosts = categoryPosts.map(post => ({
    ...post,
    id: String(post.id),
    category: slug as PostCategory,
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      tech: 'from-blue-600 via-purple-600 to-blue-800',
      health: 'from-green-500 via-emerald-600 to-green-700',
      entertainment: 'from-pink-500 via-purple-500 to-indigo-600',
      business: 'from-indigo-600 via-blue-600 to-cyan-600',
      sports: 'from-orange-500 via-red-500 to-pink-600',
      lifestyle: 'from-purple-500 via-pink-500 to-rose-500',
      news: 'from-gray-600 via-gray-700 to-gray-800',
      auto: 'from-red-600 via-orange-600 to-yellow-600'
    };
    return gradients[category] || 'from-gray-600 to-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${getCategoryGradient(slug)} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 py-16">
          <Button variant="ghost" asChild className="mb-6 text-white hover:bg-white/20">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-2">{categoryName}</h1>
              <p className="text-xl text-white/90">Discover the latest in {categoryName.toLowerCase()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-white/80">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {mappedPosts.length} Articles
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Updated Daily
            </Badge>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="container py-4">
        <AdBanner size="large" />
      </div>

      {/* Content Section */}
      <div className="container py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filter & Sort</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button variant="ghost" size="sm">
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>
        
        {/* Posts Grid */}
        {mappedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mappedPosts.map((post, index) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.coverImage || `https://images.unsplash.com/photo-${Math.floor(Math.random() * (599999999 - 500000000) + 500000000)}?auto=format&fit=crop&w=400&q=80`}
                    alt={post.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <CategoryBadge category={post.category} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-3">
                  <Link to={`/post/${post.slug}`}>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt || '').toLocaleDateString()}
                    </time>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
              <p className="text-gray-600">No articles available in this category yet. Check back soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
