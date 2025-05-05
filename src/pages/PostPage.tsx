
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { PostCard } from "@/components/blog/PostCard";
import { getPostBySlug, formatDate, getRecentPosts } from "@/lib/blog-data";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = getPostBySlug(slug || "");
  const relatedPosts = getRecentPosts(3).filter(p => p.id !== post?.id);
  
  useEffect(() => {
    if (!post && slug) {
      navigate('/not-found', { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, slug, navigate]);
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      
      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={post.category} />
            <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          
          <div className="flex items-center mb-8">
            <span className="font-medium">By {post.author}</span>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Video content if available */}
        {post.video && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <video
              src={post.video}
              controls
              className="w-full"
              poster={post.coverImage}
            />
          </div>
        )}
        
        {/* Post content */}
        <div 
          className="post-content mb-12" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
