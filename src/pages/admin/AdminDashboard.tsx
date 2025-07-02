import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { QuickActions } from "@/components/admin/QuickActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus, Activity, Clock, Zap } from "lucide-react";
import { toast } from "sonner";
import { Post } from "@/types/blog";
import { supabasePosts } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    featuredPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  });
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user && profile?.role === 'admin') {
      loadPosts();
    }
  }, [user, profile]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await supabasePosts.getAllPosts();
      
      // Transform Supabase data to match our Post type
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
      
      // Calculate stats using the original Supabase data for published status
      setStats({
        totalPosts: transformedPosts.length,
        featuredPosts: transformedPosts.filter(post => post.featured).length,
        publishedPosts: allPosts.filter(post => post.published).length,
        draftPosts: allPosts.filter(post => !post.published).length
      });
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeletePost = async (id: string) => {
    try {
      await supabasePosts.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast.success("Post deleted successfully");
      
      // Refresh stats
      await loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 space-y-8">
      <AdminHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your blog today."
        actions={
          <div className="flex gap-3">
            <Button asChild variant="outline" className="hover:bg-muted">
              <Link to="/admin/analytics">
                <Activity className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/admin/posts/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        }
      />
      
      {/* Enhanced Stats Section */}
      <DashboardStats stats={stats} />
      
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-foreground" />
                </div>
                Recent Posts
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {posts.length} total posts
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PostList posts={posts} onDelete={handleDeletePost} />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-3 h-3 text-white" />
                </div>
                Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-sm">
                  <p className="font-medium">New post published</p>
                  <p className="text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Draft saved</p>
                  <p className="text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Media uploaded</p>
                  <p className="text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-bold text-green-600">+12% views</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Engagement</span>
                <span className="font-bold text-blue-600">+8% likes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Subscribers</span>
                <span className="font-bold text-purple-600">+24 today</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
