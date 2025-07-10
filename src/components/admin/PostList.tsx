
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash, Plus, Search, Eye, Calendar, Filter, MoreVertical, ExternalLink, Copy, Archive, ToggleLeft, ToggleRight } from "lucide-react";
import { Post } from "@/types/blog";
import { getCategoryColor } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { supabasePosts } from "@/lib/supabase/posts";

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => void;
  onBulkDelete?: (ids: string[]) => void;
  onRefresh?: () => void;
}

export function PostList({ posts, onDelete, onBulkDelete, onRefresh }: PostListProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [togglingStatus, setTogglingStatus] = useState<string | null>(null);
  
  // Enhanced filtering logic
  let filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                         post.category.toLowerCase().includes(search.toLowerCase()) ||
                         post.author.toLowerCase().includes(search.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
    
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "featured" && post.featured) ||
                         (statusFilter === "draft" && !post.featured) ||
                         (statusFilter === "published" && !post.featured);
                         
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Enhanced sorting
  filteredPosts = filteredPosts.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "author":
        comparison = a.author.localeCompare(b.author);
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "date":
      default:
        comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(posts.map(post => post.category)));
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(filteredPosts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleBulkDelete = () => {
    if (onBulkDelete) {
      onBulkDelete(selectedPosts);
      setSelectedPosts([]);
    }
  };

  const handleCopyLink = (post: Post) => {
    const url = `${window.location.origin}/post/${post.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Post link copied to clipboard");
  };

  const handleDeletePost = (postId: string) => {
    onDelete(postId);
    setSelectedPosts(selectedPosts.filter(id => id !== postId));
  };

  const handleToggleStatus = async (postId: string, currentStatus: boolean) => {
    try {
      setTogglingStatus(postId);
      await supabasePosts.togglePostStatus(postId, !currentStatus);
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error toggling post status:', error);
      toast.error("Failed to update post status");
    } finally {
      setTogglingStatus(null);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Enhanced Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts by title, category, tags, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [sort, order] = value.split('-');
              setSortBy(sort);
              setSortOrder(order as "asc" | "desc");
            }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="title-asc">Title A-Z</SelectItem>
                <SelectItem value="title-desc">Title Z-A</SelectItem>
                <SelectItem value="author-asc">Author A-Z</SelectItem>
                <SelectItem value="category-asc">Category A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          {selectedPosts.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedPosts.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Selected Posts</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedPosts.length} selected posts? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                    Delete Posts
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredPosts.length} of {posts.length} posts
          {search && ` matching "${search}"`}
        </span>
        {filteredPosts.length > 0 && (
          <span>
            {selectedPosts.length} selected
          </span>
        )}
      </div>
      
      {/* Enhanced Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Category</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Author</TableHead>
              <TableHead className="hidden lg:table-cell font-semibold">Status</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Date</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {search ? "No posts match your search" : "No posts yet"}
                      </p>
                      <p className="text-muted-foreground">
                        {search ? "Try adjusting your search criteria" : "Create your first post to get started!"}
                      </p>
                    </div>
                    {!search && (
                      <Button asChild>
                        <Link to="/admin/posts/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Post
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {post.coverImage && (
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-12 h-12 object-cover rounded-lg mr-3 hidden sm:block shadow-sm" 
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 line-clamp-2 mb-1">
                          {post.title}
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="md:hidden mt-2 flex items-center gap-2">
                          <Badge 
                            className={`text-xs ${getCategoryColor(post.category)}`}
                          >
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge className="text-xs bg-yellow-500 hover:bg-yellow-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      className={`${getCategoryColor(post.category)} font-medium`}
                    >
                      {post.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-2">
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{post.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col gap-1">
                      {post.featured && (
                        <Badge className="text-xs bg-yellow-500 hover:bg-yellow-600 w-fit">
                          Featured
                        </Badge>
                      )}
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs w-fit">
                          Published
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleToggleStatus(post.id, true)}
                          disabled={togglingStatus === post.id}
                        >
                          {togglingStatus === post.id ? (
                            <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full" />
                          ) : (
                            <ToggleRight className="h-3 w-3 text-green-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Quick Actions */}
                      <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50 hover:text-blue-700">
                        <Link to={`/post/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button variant="ghost" size="sm" asChild className="hover:bg-green-50 hover:text-green-700">
                        <Link to={`/admin/posts/edit/${post.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      {/* More Actions Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-50">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleCopyLink(post)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/post/${post.slug}`} target="_blank">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/posts/edit/${post.id}`}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleStatus(post.id, true)}>
                            {togglingStatus === post.id ? (
                              <div className="animate-spin h-4 w-4 border border-current border-t-transparent rounded-full mr-2" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 mr-2" />
                            )}
                            Toggle Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete Post
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeletePost(post.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete Post
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Footer with Statistics */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-4">
            <span>Total: {posts.length} posts</span>
            <span>•</span>
            <span>Showing: {filteredPosts.length} posts</span>
            {selectedPosts.length > 0 && (
              <>
                <span>•</span>
                <span className="text-blue-600 font-medium">
                  {selectedPosts.length} selected
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span>Last updated: {formatDate(new Date().toISOString())}</span>
          </div>
        </div>
      )}
    </div>
  );
}
