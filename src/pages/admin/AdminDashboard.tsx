import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  FileText, 
  Eye,
  MessageSquare,
  Calendar,
  Activity,
  BarChart3,
  Clock,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Database,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Post } from "@/types/blog";
import { supabasePosts } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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
      
      // Reload dashboard data
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
      trend: "up",
      description: "Weekly post growth"
    },
    { 
      label: "Engagement", 
      value: "8.4%", 
      change: "+2.1%", 
      trend: "up",
      description: "Average engagement rate"
    },
    { 
      label: "Categories", 
      value: dashboardStats.totalCategories.toString(), 
      change: "+3", 
      trend: "up",
      description: "Active categories"
    },
    { 
      label: "This Month", 
      value: dashboardStats.monthlyPosts.toString(), 
      change: `+${dashboardStats.recentPosts}`, 
      trend: "up",
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
          <div className="flex items-center gap-3">
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
          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Total Posts
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-blue-600">{dashboardStats.totalPosts}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+{dashboardStats.recentPosts}</span>
                  <span className="ml-1">this week</span>
                </div>
                <Progress value={(dashboardStats.totalPosts / 100) * 100} className="mt-2 h-1" />
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Published
                </CardTitle>
                <Eye className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-green-600">{dashboardStats.publishedPosts}</div>
                <Progress value={dashboardStats.totalPosts > 0 ? (dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100 : 0} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {dashboardStats.totalPosts > 0 ? Math.round((dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100) : 0}% of total posts
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Featured
                </CardTitle>
                <Target className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-yellow-600">{dashboardStats.featuredPosts}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">High engagement</span>
                </div>
                <Progress value={dashboardStats.totalPosts > 0 ? (dashboardStats.featuredPosts / dashboardStats.totalPosts) * 100 : 0} className="mt-2 h-1" />
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  Drafts
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-orange-600">{dashboardStats.draftPosts}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-orange-600 font-medium">Pending review</span>
                </div>
                <Progress value={dashboardStats.totalPosts > 0 ? (dashboardStats.draftPosts / dashboardStats.totalPosts) * 100 : 0} className="mt-2 h-1" />
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <p className="text-lg font-bold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                    </div>
                    <div className={`flex items-center text-xs font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      }
                      {metric.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Posts */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Top Performing Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts.slice(0, 5).map((post, index) => (
                    <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{post.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge className="text-xs px-2 py-0.5 bg-yellow-500 hover:bg-yellow-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">1.2K views</p>
                        <p className="text-xs text-muted-foreground">+12%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  [
                    { action: "New post published", item: "Understanding AI in 2024", time: "2 hours ago", type: "publish", trend: "up" },
                    { action: "Comment received", item: "Tech Trends Post", time: "4 hours ago", type: "comment", trend: "up" },
                    { action: "Post updated", item: "Best Practices Guide", time: "1 day ago", type: "update", trend: "neutral" },
                    { action: "New subscriber", item: "john@example.com", time: "2 days ago", type: "user", trend: "up" },
                    { action: "Post viewed 50+ times", item: "JavaScript Guide", time: "3 days ago", type: "view", trend: "up" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'publish' ? 'bg-green-500' :
                        activity.type === 'comment' ? 'bg-blue-500' :
                        activity.type === 'update' ? 'bg-orange-500' :
                        activity.type === 'view' ? 'bg-purple-500' :
                        'bg-indigo-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                      {activity.trend === 'up' && (
                        <ArrowUpRight className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Database className="h-5 w-5" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PostList 
                posts={posts} 
                onDelete={handleDeletePost}
                onBulkDelete={handleBulkDelete}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/admin/posts/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/admin/media">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Media
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link to="/admin/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Audience Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Subscribers</span>
                  <span className="font-semibold">1247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Comments</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Session</span>
                  <span className="font-semibold">4m 32s</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Publishing Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">3</p>
                  <p className="text-sm text-muted-foreground">Posts this week</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{dashboardStats.draftPosts}</p>
                  <p className="text-sm text-muted-foreground">Drafts ready</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
