import { useMemo } from 'react';
import type { Post } from '@/types/blog';
import { useEngagementTracker } from '@/hooks/useEngagementTracker';
import PostCard from '@/components/blog/PostCard';

interface RecommendedPostsProps {
  posts: Post[];
  title?: string;
  limit?: number;
}

export default function RecommendedPosts({ posts, title = 'Recommended for You', limit = 6 }: RecommendedPostsProps) {
  const { getRecommendedPosts } = useEngagementTracker();

  const recommendations = useMemo(() => getRecommendedPosts(posts, limit), [posts, limit, getRecommendedPosts]);

  if (!recommendations.length) return null;

  return (
    <section className="py-8">
      <div className="container px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
