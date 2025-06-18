
import { PostContent } from "@/components/blog/post/PostContent";
import { PostComments } from "@/components/blog/post/PostComments";
import { RelatedPosts } from "@/components/blog/post/RelatedPosts";
import AdBanner from "@/components/blog/advertising/AdBanner";
import { Post } from "@/types/blog";

interface PostArticleProps {
  post: any;
  relatedPosts: Post[];
  comments: Array<{id: number, author: string, text: string, date: Date}>;
  showCommentForm: boolean;
  onAddComment: (text: string) => void;
  onShowCommentForm: () => void;
  onHideCommentForm: () => void;
  handleShare: (platform?: string) => void;
}

export function PostArticle({
  post,
  relatedPosts,
  comments,
  showCommentForm,
  onAddComment,
  onShowCommentForm,
  onHideCommentForm,
  handleShare
}: PostArticleProps) {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      {/* Article layout */}
      <article className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <PostContent
          content={post.content}
          excerpt={post.excerpt}
          author={post.author}
          tags={post.tags}
          handleShare={handleShare}
          onShowCommentForm={onShowCommentForm}
        />
      </article>
      
      {/* Comments section */}
      <PostComments
        comments={comments}
        showCommentForm={showCommentForm}
        onAddComment={onAddComment}
        onShowCommentForm={onShowCommentForm}
        onHideCommentForm={onHideCommentForm}
      />
      
      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
      
      {/* Featured Ad Banner */}
      <AdBanner size="medium" className="mb-8" />
    </div>
  );
}
