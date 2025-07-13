import { Post } from "@/types/blog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "./DashboardOverview";
import { DashboardAnalytics } from "./DashboardAnalytics";
import { DashboardContent } from "./DashboardContent";
import { DashboardActivity } from "./DashboardActivity";

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  totalCategories: number;
  recentPosts: number;
  monthlyPosts: number;
  growthRate: number;
}

interface DashboardTabsProps {
  posts: Post[];
  dashboardStats: DashboardStats;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onRefresh: () => void;
}

export function DashboardTabs({ 
  posts, 
  dashboardStats, 
  onDelete, 
  onBulkDelete, 
  onRefresh 
}: DashboardTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
        <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
        <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
        <TabsTrigger value="content" className="text-sm">Content</TabsTrigger>
        <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <DashboardOverview dashboardStats={dashboardStats} />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <DashboardAnalytics posts={posts} />
      </TabsContent>

      <TabsContent value="content" className="space-y-6">
        <DashboardContent 
          posts={posts}
          onDelete={onDelete}
          onBulkDelete={onBulkDelete}
          onRefresh={onRefresh}
        />
      </TabsContent>

      <TabsContent value="activity" className="space-y-6">
        <DashboardActivity />
      </TabsContent>
    </Tabs>
  );
}