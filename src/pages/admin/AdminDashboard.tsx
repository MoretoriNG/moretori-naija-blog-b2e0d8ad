
import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Users, FileText, Eye } from "lucide-react";
import { toast } from "sonner";
import { Post } from "@/types/blog";
import { supabasePosts } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    if (user && (profile?.role === 'admin' || user?.user_metadata?.role === 'admin')) {
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <AdminHeader
        title="Dashboard"
        description="Manage your blog posts and content"
        actions={
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        }
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalPosts}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured Posts
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.featuredPosts}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published
            </CardTitle>
            <Eye className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.publishedPosts}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Drafts
            </CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.draftPosts}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <PostList posts={posts} onDelete={handleDeletePost} />
        </CardContent>
      </Card>
    </div>
  );
}
