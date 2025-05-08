
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getCategoryById, getRelatedPosts } from '@/lib/blog-data';
import { CalendarIcon, User2Icon, TagIcon, ClockIcon, ShareIcon, BookmarkIcon, ThumbsUpIcon, MessageSquareIcon, FacebookIcon, TwitterIcon, LinkedinIcon, CopyIcon, PrinterIcon, Heart } from 'lucide-react';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Post, PostCategory } from '@/types/blog';
import { useState, useEffect } from 'react';
import { Newsletter } from '@/components/blog/Newsletter';

// High-quality placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
];

export default function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || '');
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 5);
  const [comments, setComments] = useState<{id: number, author: string, text: string, date: Date}[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-8">The post you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  const category = getCategoryById(post.category_id);
  const categorySlug = category?.slug || 'uncategorized';
  const relatedPosts = getRelatedPosts(post.id, post.category_id, 3);
  const readingTimeMinutes = Math.ceil(post.content.split(' ').length / 200); // Estimate reading time
  
  const handleShare = (platform?: string) => {
    const shareUrl = window.location.href;
    const shareTitle = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, 'facebook-share', 'width=580,height=296');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, 'twitter-share', 'width=550,height=235');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, 'linkedin-share', 'width=750,height=450');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
        break;
      case 'print':
        window.print();
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: shareTitle,
            text: post.excerpt,
            url: shareUrl,
          }).catch(() => {
            copyToClipboard();
          });
        } else {
          copyToClipboard();
        }
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };
  
  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
    toast.success('You liked this article');
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        author: 'Guest User',
        text: newComment,
        date: new Date()
      };
      setComments(prev => [...prev, newCommentObj]);
      setNewComment('');
      toast.success('Comment posted successfully!');
    }
  };

  // Map old data structure to match the Post type expected by PostCard
  const mappedRelatedPosts = relatedPosts.map(relatedPost => ({
    ...relatedPost,
    id: String(relatedPost.id),
    category: getCategoryById(relatedPost.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: relatedPost.image_url || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    publishedAt: relatedPost.published_at
  })) as Post[];

  // Create content with embedded images
  const enhancedContent = post.content.replace(
    /<p>(.*?)<\/p>/g, 
    (match, p1, offset) => {
      // Every third paragraph, add an image
      if (offset > 300 && (offset % 700) < 200) {
        const randomImgIndex = Math.floor(Math.random() * placeholderImages.length);
        return `<figure class="my-8">
          <img src="${placeholderImages[randomImgIndex]}" alt="Article illustration" class="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md" />
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Article illustration</figcaption>
        </figure>
        ${match}`;
      }
      return match;
    }
  );

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Featured Image Header */}
      <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
        <img 
          src={post.image_url || placeholderImages[0]} 
          alt={post.title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-2 flex flex-wrap gap-2">
              <CategoryBadge category={categorySlug as PostCategory} />
              
              <div className="flex items-center gap-3 text-xs text-white/80">
                <div className="flex items-center">
                  <ClockIcon size={14} className="mr-1" />
                  <span>{readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{post.title}</h1>
          
            <div className="flex flex-wrap gap-3 items-center text-sm text-white/80">
              <div className="flex items-center gap-1">
                <User2Icon size={14} />
                <span>{post.author}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <CalendarIcon size={14} />
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
                <span className="text-xs ml-1">({formatDistanceToNow(new Date(post.published_at), { addSuffix: true })})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8 md:py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link to={`/category/${category.slug}`} className="hover:text-blue-500">
                {category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </div>
        
        {/* Article layout */}
        <article className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Post excerpt */}
            <p className="text-lg text-muted-foreground mb-6 font-medium italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50">
              {post.excerpt}
            </p>
            
            {/* Social sharing sidebar - Desktop */}
            <div className="hidden md:flex flex-col fixed left-4 top-1/2 -translate-y-1/2 space-y-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                onClick={() => handleShare('facebook')}
              >
                <FacebookIcon size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full border border-gray-200 hover:bg-blue-400 hover:text-white"
                onClick={() => handleShare('twitter')}
              >
                <TwitterIcon size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full border border-gray-200 hover:bg-blue-700 hover:text-white"
                onClick={() => handleShare('linkedin')}
              >
                <LinkedinIcon size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full border border-gray-200 hover:bg-gray-100"
                onClick={() => handleShare('copy')}
              >
                <CopyIcon size={18} />
              </Button>
              <div className="w-px h-8 bg-gray-300 mx-auto"></div>
              <Button 
                variant="ghost" 
                size="icon"
                className={`rounded-full border ${isBookmarked ? 'bg-yellow-100 text-yellow-600 border-yellow-300' : 'border-gray-200 hover:bg-gray-100'}`}
                onClick={handleBookmark}
              >
                <BookmarkIcon size={18} className={isBookmarked ? "fill-yellow-500" : ""} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-500"
                onClick={handleLike}
              >
                <Heart size={18} />
                <span className="sr-only">Like</span>
              </Button>
            </div>
            
            {/* Post Content */}
            <div 
              className="post-content mb-12 prose prose-lg max-w-none prose-headings:text-foreground prose-a:text-blue-600 prose-img:rounded-lg" 
              dangerouslySetInnerHTML={{ __html: enhancedContent }}
            />
            
            {/* Social sharing bar - Mobile */}
            <div className="flex md:hidden justify-center gap-2 my-6 border-t border-b py-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-full text-blue-600"
                onClick={() => handleShare('facebook')}
              >
                <FacebookIcon size={16} className="mr-1" />
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-full text-blue-400"
                onClick={() => handleShare('twitter')}
              >
                <TwitterIcon size={16} className="mr-1" />
                Tweet
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={`rounded-full ${isBookmarked ? 'text-yellow-600' : ''}`}
                onClick={handleBookmark}
              >
                <BookmarkIcon size={16} className={`mr-1 ${isBookmarked ? "fill-yellow-500" : ""}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 items-center">
                  <TagIcon size={18} className="text-muted-foreground" />
                  {post.tags.map(tag => (
                    <Link 
                      key={tag} 
                      to={`/tag/${tag.toLowerCase()}`}
                      className="bg-muted px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Author bio */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">Writer & Content Creator</p>
                </div>
              </div>
            </div>
            
            {/* Engagement Section */}
            <div className="bg-muted rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-semibold">Did you enjoy this article?</h3>
                  <p className="text-muted-foreground">Let us know your thoughts in the comments</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowCommentForm(true)}
                  >
                    <MessageSquareIcon size={16} className="mr-2" />
                    Comment
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleShare()}
                  >
                    <ShareIcon size={16} className="mr-2" /> 
                    Share
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Comments section */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
              
              {showCommentForm && (
                <div className="bg-white p-6 rounded-lg border mb-6">
                  <form onSubmit={handleSubmitComment}>
                    <label htmlFor="comment" className="block mb-2 font-medium">
                      Leave a comment
                    </label>
                    <textarea 
                      id="comment"
                      className="w-full border rounded-md p-3 min-h-32 mb-3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      required
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setShowCommentForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Post Comment</Button>
                    </div>
                  </form>
                </div>
              )}
              
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-white p-4 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            {comment.author[0]}
                          </div>
                          <span className="font-medium">{comment.author}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(comment.date, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Be the first to comment</p>
                </div>
              )}
              
              {!showCommentForm && comments.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setShowCommentForm(true)}
                >
                  Add Your Comment
                </Button>
              )}
            </div>
          </div>
        </article>
        
        {/* Related Posts */}
        {mappedRelatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mappedRelatedPosts.map(relatedPost => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
        
        {/* Newsletter */}
        <Newsletter />
        
        {/* Return to blog button */}
        <div className="mt-12 flex justify-center">
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link to="/">
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
