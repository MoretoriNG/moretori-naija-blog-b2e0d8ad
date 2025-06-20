
import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Users, FileText } from "lucide-react";
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
      
      // Calculate stats
      setStats({
        totalPosts: transformedPosts.length,
        featuredPosts: transformedPosts.filter(post => post.featured).length,
        publishedPosts: transformedPosts.filter(post => allPosts.find(p => p.id === post.id)?.published).length,
        draftPosts: transformedPosts.filter(post => !allPosts.find(p => p.id === post.id)?.published).length
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
    <div className="container py-8">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card shadow rounded-lg p-6 border border-blue-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="font-medium text-muted-foreground mb-1">Total Posts</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalPosts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card shadow rounded-lg p-6 border border-green-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="font-medium text-muted-foreground mb-1">Featured Posts</h3>
              <p className="text-3xl font-bold text-green-600">{stats.featuredPosts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card shadow rounded-lg p-6 border border-purple-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="font-medium text-muted-foreground mb-1">Published</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.publishedPosts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card shadow rounded-lg p-6 border border-orange-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="font-medium text-muted-foreground mb-1">Drafts</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.draftPosts}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card shadow rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        <PostList posts={posts} onDelete={handleDeletePost} />
      </div>
    </div>
  );
}
