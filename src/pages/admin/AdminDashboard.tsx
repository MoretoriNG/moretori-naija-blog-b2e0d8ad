
import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Eye,
  Globe,
  RefreshCw,
  Sparkles,
  Database
} from "lucide-react";
import { toast } from "sonner";
import { Post } from "@/types/blog";
import { supabasePosts } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { PerformanceMetrics } from "@/components/admin/dashboard/PerformanceMetrics";
import { TopPerformingPosts } from "@/components/admin/dashboard/TopPerformingPosts";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [creatingPosts, setCreatingPosts] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [dashboardStats, setDashboardStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
    totalCategories: 0,
    recentPosts: 0,
    monthlyPosts: 0,
    growthRate: 0
  });
  
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user && (profile?.role === 'admin' || user?.user_metadata?.role === 'admin')) {
      loadDashboardData();
    }
  }, [user, profile]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [allPosts, stats] = await Promise.all([
        supabasePosts.getAllPosts(),
        supabasePosts.getDashboardStats()
      ]);
      
      const transformedPosts = allPosts.map(post => ({
        id: String(post.id),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        coverImage: post.cover_image || '',
        category: post.category as any,
        author: post.author || 'Unknown',
        publishedAt: post.created_at || new Date().toISOString(),
        featured: post.featured || false,
        video: post.video_url,
        tags: post.tags || []
      }));

      setPosts(transformedPosts);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setTimeout(() => setRefreshing(false), 500);
    toast.success("Dashboard refreshed");
  };

  const handleCreateSamplePosts = async () => {
    try {
      setCreatingPosts(true);
      toast.info("Creating sample posts...");
      
      const createdPosts = await supabasePosts.createSamplePosts();
      toast.success(`Successfully created ${createdPosts.length} sample posts`);
      
      await loadDashboardData();
    } catch (error) {
      console.error('Error creating sample posts:', error);
      toast.error("Failed to create sample posts");
    } finally {
      setCreatingPosts(false);
    }
  };
  
  const handleDeletePost = async (id: string) => {
    try {
      await supabasePosts.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast.success("Post deleted successfully");
      await loadDashboardData();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Failed to delete post");
    }
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await supabasePosts.bulkDeletePosts(ids);
      setPosts(posts.filter(post => !ids.includes(post.id)));
      toast.success(`Successfully deleted ${ids.length} posts`);
      await loadDashboardData();
    } catch (error) {
      console.error('Error bulk deleting posts:', error);
      toast.error("Failed to delete posts");
    }
  };

  const performanceMetrics = [
    { 
      label: "Growth Rate", 
      value: `+${dashboardStats.growthRate.toFixed(1)}%`, 
      change: "+12.5%", 
      trend: "up" as const,
      description: "Weekly post growth"
    },
    { 
      label: "Engagement", 
      value: "8.4%", 
      change: "+2.1%", 
      trend: "up" as const,
      description: "Average engagement rate"
    },
    { 
      label: "Categories", 
      value: dashboardStats.totalCategories.toString(), 
      change: "+3", 
      trend: "up" as const,
      description: "Active categories"
    },
    { 
      label: "This Month", 
      value: dashboardStats.monthlyPosts.toString(), 
      change: `+${dashboardStats.recentPosts}`, 
      trend: "up" as const,
      description: "Posts this month"
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dashboard Overview"
        description="Monitor your blog's performance and manage content efficiently"
        actions={
          <divClassName="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={creatingPosts}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
                >
                  <Sparkles className={`h-4 w-4 mr-2 ${creatingPosts ? 'animate-spin' : ''}`} />
                  Create Sample Posts
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Sample Posts</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will create 6 sample blog posts with different categories (Technology, Lifestyle, News, Business, Sports, Health). These posts will help you test the blog functionality.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCreateSamplePosts}>
                    Create Posts
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/">
                <Globe className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
            
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
              <Link to="/admin/posts/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
          <TabsTrigger value="content" className="text-sm">Content</TabsTrigger>
          <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Posts"
              value={dashboardStats.totalPosts}
              icon={FileText}
              change={`+${dashboardStats.recentPosts}`}
              description="this week"
              progress={(dashboardStats.totalPosts / 100) * 100}
              borderColor="border-l-4 border-l-blue-500"
              iconColor="text-blue-500"
              valueColor="text-blue-600"
            />
            
            <StatsCard
              title="Published"
              value={dashboardStats.publishedPosts}
              icon={Eye}
              progress={dashboardStats.totalPosts > 0 ? (dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100 : 0}
              description={`${dashboardStats.totalPosts > 0 ? Math.round((dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100) : 0}% of total posts`}
              borderColor="border-l-4 border-l-green-500"
              iconColor="text-green-500"
              valueColor="text-green-600"
            />
            
            <StatsCard
              title="Featured"
              value={dashboardStats.featuredPosts}
              icon={FileText}
              change="High engagement"
              progress={dashboardStats.totalPosts > 0 ? (dashboardStats.featuredPosts / dashboardStats.totalPosts) * 100 : 0}
              borderColor="border-l-4 border-l-yellow-500"
              iconColor="text-yellow-500"
              valueColor="text-yellow-600"
            />
            
            <StatsCard
              title="Drafts"
              value={dashboardStats.draftPosts}
              icon={FileText}
              change="Pending review"
              progress={dashboardStats.totalPosts > 0 ? (dashboardStats.draftPosts / dashboardStats.totalPosts) * 100 : 0}
              borderColor="border-l-4 border-l-orange-500"
              iconColor="text-orange-500"
              valueColor="text-orange-600"
            />
          </div>

          <PerformanceMetrics metrics={performanceMetrics} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopPerformingPosts posts={posts} />
            <RecentActivity />
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <PostList 
                posts={posts} 
                onDelete={handleDeletePost}
                onBulkDelete={handleBulkDelete}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <QuickActions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
