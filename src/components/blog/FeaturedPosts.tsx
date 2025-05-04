
import { Post } from "@/types/blog";
import { PostCard } from "./PostCard";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className={post === posts[0] ? "md:col-span-2" : ""}>
              <PostCard post={post} featured={post === posts[0]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
