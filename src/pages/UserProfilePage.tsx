
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookmarkIcon, Heart, User, Settings, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePostInteraction } from '@/hooks/usePostInteraction';
import { getAllPosts } from '@/lib/blog';

export default function UserProfilePage() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock data for bookmarked and liked posts - in real app this would come from user's saved data
  const mockBookmarkedPosts = getAllPosts().slice(0, 6);
  const mockLikedPosts = getAllPosts().slice(3, 9);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <User className="h-12 w-12 mx-auto text-gray-400" />
              <h2 className="text-xl font-semibold">Please Sign In</h2>
              <p className="text-gray-600">You need to be logged in to view your profile.</p>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile?.username || user.email?.split('@')[0]}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Member since {new Date(user.created_at || '').toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookmarks">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Bookmarks ({mockBookmarkedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="likes">
              <Heart className="w-4 h-4 mr-2" />
              Likes ({mockLikedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <p className="text-gray-900">{profile?.username || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Account Status</label>
                  <Badge variant="outline" className="ml-2">
                    {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bookmarked Articles</CardTitle>
              </CardHeader>
              <CardContent>
                {mockBookmarkedPosts.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockBookmarkedPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex space-x-3">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">
                              <Link to={`/post/${post.slug}`} className="hover:text-orange-600">
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.published_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookmarkIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                    <p className="text-gray-600">Start bookmarking articles to see them here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Liked Articles</CardTitle>
              </CardHeader>
              <CardContent>
                {mockLikedPosts.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockLikedPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex space-x-3">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">
                              <Link to={`/post/${post.slug}`} className="hover:text-orange-600">
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.published_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No liked articles yet</h3>
                    <p className="text-gray-600">Start liking articles to see them here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
