
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share, Bookmark, MessageSquare, ThumbsUp } from "lucide-react";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { PostCard } from "@/components/blog/PostCard";
import { getPostBySlug, formatDate, getRecentPosts, getCategoryColor } from "@/lib/blog-data";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { toast } from "sonner";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
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
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };
  
  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed like' : 'Added like');
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  return (
    <div className="relative">
      {/* Featured image as background with overlay */}
      <div className="absolute top-0 left-0 w-full h-96 -z-10">
        <div className="absolute inset-0 bg-black/50"></div>
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container py-8 md:py-12">
        <div className="mb-8 pt-20">
          <Button variant="ghost" asChild className="mb-6 bg-background/80 backdrop-blur-sm">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <article className="bg-background rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <CategoryBadge category={post.category} />
              <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            
            <div className="flex items-center mb-8 border-b pb-6">
              <span className="font-medium">By {post.author}</span>
              
              <div className="ml-auto flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`flex items-center gap-1 ${liked ? 'text-blue-500' : ''}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`flex items-center gap-1 ${bookmarked ? 'text-blue-500' : ''}`}
                  onClick={handleBookmark}
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`flex items-center gap-1 ${showComments ? 'text-blue-500' : ''}`}
                  onClick={toggleComments}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Comments</span>
                </Button>
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
              <div className="mb-8">
                <VideoPlayer 
                  src={post.video}
                  poster={post.coverImage}
                  title={post.title}
                  className="rounded-lg overflow-hidden w-full aspect-video"
                />
              </div>
            )}
            
            {/* Post content */}
            <div 
              className="post-content mb-12 prose prose-lg max-w-none" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            {/* Author box */}
            <div className="mb-12 p-6 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">About the Author</h4>
                  <p className="text-muted-foreground">
                    {post.author} is a contributing writer who specializes in {post.category} topics.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Comments section */}
            {showComments && (
              <div className="border-t pt-8 mb-12">
                <h3 className="text-xl font-bold mb-4">Comments</h3>
                <div className="p-6 bg-slate-50 rounded-lg text-center">
                  <p>Comments are currently disabled. Please check back later.</p>
                </div>
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-sm font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2">
                <Link to={`/category/${post.category}`} className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                  #{post.category}
                </Link>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                  #trending
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                  #featured
                </span>
              </div>
            </div>
          </div>
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
