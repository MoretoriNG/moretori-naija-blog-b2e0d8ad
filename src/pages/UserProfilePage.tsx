import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { BookmarkIcon, Heart, User, Settings, Calendar, Edit, Save, Eye, Download, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePostInteraction } from '@/hooks/usePostInteraction';
import { getAllPosts } from '@/lib/blog';
import { toast } from 'sonner';

export default function UserProfilePage() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: profile?.username || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
  });
  
  // Mock data for user interactions
  const mockBookmarkedPosts = getAllPosts().slice(0, 6);
  const mockLikedPosts = getAllPosts().slice(3, 9);
  const mockDownloadedVideos = [
    { id: 1, title: "Tech Tutorial: React Basics", date: "2024-01-15", size: "45MB" },
    { id: 2, title: "Auto Review: Latest BMW", date: "2024-01-10", size: "120MB" },
  ];
  
  // User statistics
  const userStats = {
    postsRead: 127,
    articlesBookmarked: mockBookmarkedPosts.length,
    videosDownloaded: mockDownloadedVideos.length,
    commentsPosted: 34,
    likesGiven: mockLikedPosts.length,
    joinDate: user?.created_at || new Date().toISOString(),
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the profile in the database
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

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
                <Link to="/auth/user">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enhanced Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white">
                  {profile?.role === 'admin' ? 'Admin' : 'User'}
                </Badge>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{profile?.username || user.email?.split('@')[0]}</h1>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-700 mb-3">{editedProfile.bio || "No bio yet"}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {new Date(userStats.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {userStats.postsRead} articles read
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {userStats.commentsPosted} comments
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{userStats.articlesBookmarked}</div>
                  <div className="text-xs text-gray-500">Bookmarked</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-red-600">{userStats.likesGiven}</div>
                  <div className="text-xs text-gray-500">Liked</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{userStats.videosDownloaded}</div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">{userStats.commentsPosted}</div>
                  <div className="text-xs text-gray-500">Comments</div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookmarks">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Bookmarks ({mockBookmarkedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="likes">
              <Heart className="w-4 h-4 mr-2" />
              Likes ({mockLikedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="downloads">
              <Download className="w-4 h-4 mr-2" />
              Downloads ({mockDownloadedVideos.length})
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Star className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile Information
                  {isEditing && (
                    <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <Input value={user.email || ''} disabled className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Username</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.username}
                        onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                        className="mt-1"
                      />
                    ) : (
                      <Input value={editedProfile.username || 'Not set'} disabled className="mt-1" />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">Bio</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                        placeholder="Tell us about yourself..."
                        className="mt-1"
                      />
                    ) : (
                      <Input value={editedProfile.bio || 'No bio yet'} disabled className="mt-1" />
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Location</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                        placeholder="Your location"
                        className="mt-1"
                      />
                    ) : (
                      <Input value={editedProfile.location || 'Not specified'} disabled className="mt-1" />
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Account Status</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                        {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                      </Badge>
                      <Badge variant="outline">
                        {profile?.role === 'admin' ? 'Administrator' : 'User'}
                      </Badge>
                    </div>
                  </div>
                </div>
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

          <TabsContent value="downloads" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Downloaded Videos</CardTitle>
              </CardHeader>
              <CardContent>
                {mockDownloadedVideos.length > 0 ? (
                  <div className="space-y-4">
                    {mockDownloadedVideos.map((video) => (
                      <div key={video.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{video.title}</h3>
                            <p className="text-sm text-gray-600">Downloaded on {new Date(video.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{video.size}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              <Download className="w-4 h-4 mr-2" />
                              Re-download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Download className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
                    <p className="text-gray-600">Start downloading videos to see them here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">Bookmarked an article</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-medium">Liked a tech article</p>
                    <p className="text-sm text-gray-600">5 hours ago</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium">Downloaded a video</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-medium">Posted a comment</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
