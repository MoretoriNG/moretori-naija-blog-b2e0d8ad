
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getCategoryById, getRelatedPosts } from '@/lib/blog-data';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Post, PostCategory } from '@/types/blog';
import { useState, useEffect } from 'react';
import { EnhancedPostHeader } from '@/components/blog/post/EnhancedPostHeader';
import { PostNavigation } from '@/components/blog/post/PostNavigation';
import { PostLayoutWrapper } from '@/components/blog/post/PostLayoutWrapper';
import { PostArticle } from '@/components/blog/post/PostArticle';
import { PostEngagement } from '@/components/blog/post/PostEngagement';

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
  
  const [comments, setComments] = useState<{id: number, author: string, text: string, date: Date}[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  useEffect(() => {
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
  const readingTimeMinutes = Math.ceil(post.content.split(' ').length / 200);
  
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

  const mappedRelatedPosts = relatedPosts.map(relatedPost => ({
    ...relatedPost,
    id: String(relatedPost.id),
    category: getCategoryById(relatedPost.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: relatedPost.image_url || placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    publishedAt: relatedPost.published_at
  })) as Post[];

  return (
    <PostLayoutWrapper>
      {/* Enhanced Featured Image Header */}
      <EnhancedPostHeader
        title={post.title}
        imageUrl={post.image_url || placeholderImages[0]}
        category={categorySlug as PostCategory}
        author={post.author}
        publishedAt={post.published_at}
        readingTimeMinutes={readingTimeMinutes}
        postId={String(post.id)}
        slug={post.slug}
      />
      
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <PostNavigation postTitle={post.title} categoryId={post.category_id} />
        
        <PostArticle
          post={post}
          relatedPosts={mappedRelatedPosts}
          comments={comments}
          showCommentForm={showCommentForm}
          onAddComment={handleAddComment}
          onShowCommentForm={() => setShowCommentForm(true)}
          onHideCommentForm={() => setShowCommentForm(false)}
          handleShare={handleShare}
        />
        
        {/* Enhanced Engagement Section */}
        <div className="my-8">
          <PostEngagement 
            postId={String(post.id)}
            postTitle={post.title}
            postSlug={post.slug}
          />
        </div>
        
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
    </PostLayoutWrapper>
  );
}
