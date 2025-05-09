
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getCategoryById, getRelatedPosts } from '@/lib/blog-data';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Post, PostCategory } from '@/types/blog';
import { useState, useEffect } from 'react';
import { PostHeader } from '@/components/blog/post/PostHeader';
import { PostContent } from '@/components/blog/post/PostContent';
import { PostComments } from '@/components/blog/post/PostComments';
import { RelatedPosts } from '@/components/blog/post/RelatedPosts';
import AdBanner from '@/components/blog/advertising/AdBanner';

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
  
  const handleAddComment = (text: string) => {
    const newCommentObj = {
      id: Date.now(),
      author: 'Guest User',
      text,
      date: new Date()
    };
    setComments(prev => [...prev, newCommentObj]);
    toast.success('Comment posted successfully!');
  };

  // Map old data structure to match the Post type expected by PostCard
  const mappedRelatedPosts = relatedPosts.map(relatedPost => ({
    ...relatedPost,
    id: String(relatedPost.id),
    category: getCategoryById(relatedPost.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: relatedPost.image_url || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    publishedAt: relatedPost.published_at
  })) as Post[];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Leaderboard ad banner after navbar */}
      <AdBanner size="large" className="container my-4" />
      
      {/* Featured Image Header */}
      <PostHeader
        title={post.title}
        imageUrl={post.image_url || placeholderImages[0]}
        category={categorySlug as PostCategory}
        author={post.author}
        publishedAt={post.published_at}
        readingTimeMinutes={readingTimeMinutes}
      />
      
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
          <PostContent
            content={post.content}
            excerpt={post.excerpt}
            author={post.author}
            tags={post.tags}
            handleShare={handleShare}
            onShowCommentForm={() => setShowCommentForm(true)}
          />
        </article>
        
        {/* Comments section */}
        <PostComments
          comments={comments}
          showCommentForm={showCommentForm}
          onAddComment={handleAddComment}
          onShowCommentForm={() => setShowCommentForm(true)}
          onHideCommentForm={() => setShowCommentForm(false)}
        />
        
        {/* Related Posts */}
        <RelatedPosts posts={mappedRelatedPosts} />
        
        {/* Featured Ad Banner */}
        <AdBanner size="medium" className="mb-8" />
        
        {/* Return to blog button */}
        <div className="mt-8 flex justify-center">
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
      
      {/* Footer Ad Banner */}
      <AdBanner size="large" className="container my-8" />
    </div>
  );
}
