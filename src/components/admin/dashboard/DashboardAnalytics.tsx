import { Post } from "@/types/blog";
import { TopPerformingPosts } from "@/components/admin/dashboard/TopPerformingPosts";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";

interface DashboardAnalyticsProps {
  posts: Post[];
}

export function DashboardAnalytics({ posts }: DashboardAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TopPerformingPosts posts={posts} />
      <RecentActivity />
    </div>
  );
}