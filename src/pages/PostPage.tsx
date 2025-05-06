
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Bookmark, ThumbsUp, MessageSquare } from "lucide-react";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { PostCard } from "@/components/blog/PostCard";
import { getPostBySlug, formatDate, getRecentPosts, getPostsByCategory } from "@/lib/blog-data";
import { toast } from "sonner";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = getPostBySlug(slug || "");
  const relatedPosts = post 
    ? getPostsByCategory(post.category).filter(p => p.id !== post?.id).slice(0, 3)
    : [];
  
  useEffect(() => {
    if (!post && slug) {
      navigate('/not-found', { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, slug, navigate]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
      .catch(err => {
        toast.info("Copied link to clipboard!");
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      toast.info("Copied link to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  const handleBookmark = () => {
    toast.success("Post saved to your bookmarks!");
  };
  
  const handleLike = () => {
    toast.success("Thanks for liking this post!");
  };
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="container py-8 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild className="flex items-center">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-1 border-cyan-500 text-cyan-600 hover:bg-cyan-50">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleBookmark} className="flex items-center gap-1 border-orange-500 text-orange-600 hover:bg-orange-50">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>
      
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={post.category} />
            <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-br from-cyan-600 to-orange-500 bg-clip-text text-transparent">{post.title}</h1>
          
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full p-0.5">
              <div className="bg-white dark:bg-gray-900 rounded-full p-1">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
                  {post.author[0]}
                </div>
              </div>
            </div>
            <span className="font-medium ml-3">By {post.author}</span>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg border border-gray-100">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Video content if available */}
        {post.video && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
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
          className="post-content mb-12 prose-headings:text-cyan-900 prose-a:text-orange-600" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        {/* Engagement buttons */}
        <div className="flex justify-center gap-4 my-10 border-y py-6">
          <Button onClick={handleLike} variant="outline" className="rounded-full border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-6">
            <ThumbsUp className="h-5 w-5 mr-2" />
            Like
          </Button>
          <Button onClick={handleShare} variant="outline" className="rounded-full border-orange-500 text-orange-600 hover:bg-orange-50 px-6">
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
          <Button asChild variant="outline" className="rounded-full border-purple-500 text-purple-600 hover:bg-purple-50 px-6">
            <Link to="#comments">
              <MessageSquare className="h-5 w-5 mr-2" />
              Comment
            </Link>
          </Button>
        </div>
        
        {/* Call to action */}
        <div className="my-12 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-xl p-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">Stay Updated with Moretori Naija</h3>
            <p className="mb-6 text-muted-foreground">Never miss the latest updates, news and trending stories.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-cyan-500 hover:bg-cyan-600">Subscribe to Newsletter</Button>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                Explore More Articles
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">More from {post.category.charAt(0).toUpperCase() + post.category.slice(1)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">
                <Link to={`/category/${post.category}`}>View All {post.category.charAt(0).toUpperCase() + post.category.slice(1)} Articles</Link>
              </Button>
            </div>
          </div>
        )}
        
        {/* Comments section placeholder */}
        <div id="comments" className="mt-16 border-t pt-10">
          <h3 className="text-xl font-bold mb-6">Comments</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">Join the conversation and share your thoughts</p>
            <Button className="bg-orange-500 hover:bg-orange-600">Login to Comment</Button>
          </div>
        </div>
      </article>
    </div>
  );
}
