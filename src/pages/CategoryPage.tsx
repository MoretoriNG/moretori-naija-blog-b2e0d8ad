
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { getPostsByCategory, getCategoryBySlug } from "@/lib/blog-data";
import { PostCategory, Post } from "@/types/blog";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const validCategories: PostCategory[] = ['tech', 'health', 'entertainment', 'business', 'sports', 'lifestyle', 'news', 'auto'];
  const isValidCategory = slug && validCategories.includes(slug as PostCategory);
  
  useEffect(() => {
    if (!isValidCategory) {
      navigate('/not-found', { replace: true });
    }
    
    // Scroll to top when category loads
    window.scrollTo(0, 0);
  }, [slug, isValidCategory, navigate]);
  
  if (!isValidCategory) {
    return null;
  }
  
  const categoryPosts = getPostsByCategory(slug as PostCategory);
  const category = getCategoryBySlug(slug as string);
  const categoryName = category ? category.name : slug!.charAt(0).toUpperCase() + slug!.slice(1);
  
  // Map posts to the expected Post type
  const mappedPosts = categoryPosts.map(post => ({
    ...post,
    id: String(post.id),
    category: slug as PostCategory,
    coverImage: post.image_url,
    publishedAt: post.published_at
  })) as Post[];
  
  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{categoryName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mappedPosts.length > 0 ? (
          mappedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-muted-foreground">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
