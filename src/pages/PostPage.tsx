import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getCategoryById, getRelatedPosts } from '@/lib/blog-data';
import { CalendarIcon, User2Icon, TagIcon, ClockIcon, ShareIcon } from 'lucide-react';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Post, PostCategory } from '@/types/blog';

export default function PostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');
  
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
      .catch(error => {
        console.error('Error sharing:', error);
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

  // Map old data structure to match the Post type expected by PostCard
  const mappedRelatedPosts = relatedPosts.map(relatedPost => ({
    ...relatedPost,
    id: String(relatedPost.id),
    category: getCategoryById(relatedPost.category_id)?.slug as PostCategory || 'uncategorized',
    coverImage: relatedPost.image_url,
    publishedAt: relatedPost.published_at
  })) as Post[];

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-cyan-500">Home</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/category/${category.slug}`} className="hover:text-orange-500">
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span>{post.title}</span>
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
          <button 
            onClick={handleShare}
            className="ml-auto flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Share article"
          >
            <ShareIcon size={18} className="text-cyan-600" />
          </button>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="mb-8 rounded-xl overflow-hidden">
        <img 
          src={post.image_url || '/placeholder.svg'} 
          alt={post.title}
          className="w-full h-auto object-cover rounded-xl aspect-[16/9]" 
        />
      </div>
      
      {/* Post Content */}
      <div 
        className="post-content mb-12" 
        dangerouslySetInnerHTML={{ __html: post.content }}
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
                className="bg-secondary px-3 py-1 rounded-full text-xs font-medium hover:bg-cyan-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-cyan-500 to-orange-500 rounded-xl p-8 mb-12 text-white">
        <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
        <p className="mb-6">Subscribe to our newsletter to get the latest updates on {category?.name || 'various topics'} and more.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-2 rounded-md text-black flex-grow"
          />
          <Button 
            className="bg-white text-orange-600 hover:bg-gray-100"
            onClick={() => toast.success('Thank you for subscribing!')}
          >
            Subscribe
          </Button>
        </div>
      </div>
      
      {/* Related Posts */}
      {mappedRelatedPosts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mappedRelatedPosts.map(relatedPost => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
      
      {/* Comments section could be added here */}
      
      {/* Return to blog button */}
      <div className="mt-12 flex justify-center">
        <Button 
          variant="outline" 
          className="border-cyan-500 text-cyan-600 hover:bg-cyan-50"
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
