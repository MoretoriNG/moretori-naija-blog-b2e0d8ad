
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getCategoryById, getRelatedPosts } from '@/lib/blog-data';
import { CalendarIcon, User2Icon, TagIcon, ClockIcon, ShareIcon, BookmarkIcon, ThumbsUpIcon, MessageSquareIcon } from 'lucide-react';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Post, PostCategory } from '@/types/blog';
import { useState } from 'react';

// High-quality placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80",
];

export default function PostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 5);
  
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
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
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
          <img src="${placeholderImages[randomImgIndex]}" alt="Article illustration" class="w-full h-auto rounded-lg shadow-md" />
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Article illustration</figcaption>
        </figure>
        ${match}`;
      }
      return match;
    }
  );

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
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
      
      {/* Post Header */}
      <div className="mb-8">
        {category && (
          <div className="mb-3">
            <CategoryBadge category={categorySlug as PostCategory} />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
        
        {/* Post Meta */}
        <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <User2Icon size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon size={16} />
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
            <span className="text-xs ml-1">({formatDistanceToNow(new Date(post.published_at), { addSuffix: true })})</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon size={16} />
            <span>{readingTimeMinutes} min read</span>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 rounded-full" 
              onClick={handleLike}
            >
              <ThumbsUpIcon size={16} className="text-blue-500" />
              <span>{likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 rounded-full" 
              onClick={handleBookmark}
            >
              <BookmarkIcon size={16} className={isBookmarked ? "text-yellow-500 fill-yellow-500" : ""} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 rounded-full"
              onClick={handleShare}
            >
              <ShareIcon size={16} className="text-blue-500" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="mb-8 rounded-xl overflow-hidden">
        <img 
          src={post.image_url || placeholderImages[0]} 
          alt={post.title}
          className="w-full h-auto object-cover rounded-xl aspect-[16/9]" 
        />
      </div>
      
      {/* Post Content */}
      <div 
        className="post-content mb-12 prose prose-lg max-w-none prose-headings:text-foreground prose-a:text-blue-600" 
        dangerouslySetInnerHTML={{ __html: enhancedContent }}
      />
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-12">
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
      
      {/* Engagement Section */}
      <div className="bg-muted rounded-xl p-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">Did you enjoy this article?</h3>
            <p className="text-muted-foreground">Let us know your thoughts or questions in the comments</p>
          </div>
          <div className="flex gap-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => toast.success('Comment feature coming soon!')}
            >
              <MessageSquareIcon size={16} className="mr-2" />
              Comment
            </Button>
            <Button 
              variant="outline"
              onClick={handleShare}
            >
              <ShareIcon size={16} className="mr-2" /> 
              Share
            </Button>
          </div>
        </div>
      </div>
      
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
  );
}
