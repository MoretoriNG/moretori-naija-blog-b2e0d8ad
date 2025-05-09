
import { Post } from "@/types/blog";
import { PostCard } from "@/components/blog/PostCard";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;
  
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
